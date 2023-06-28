import React, { useState, useRef } from "react";
import "../css/SetScale.css";
import { Stage, Layer, Image, Line, Circle, Text, Rect } from "react-konva";
import { Button, Table, TextField } from "@navikt/ds-react";

const RoofOutline = ({ img, imageHeight, imageWidth, scale }) => {
  const [line, setLine] = useState([]);
  const [lines, setLines] = useState([]);
  const [addPoints, setAddPoints] = useState(false);
  const [showDims, setShowDims] = useState(false); // Show dimensions of each section
  const lineRef = useRef(); // Ref to access the line component

  const handleStageClick = () => {
    if (addPoints) {
      const liner = lineRef.current;
      const stage = liner.getStage();
      const point = stage.getPointerPosition();
      setLine((prevLine) => [...prevLine, point.x, point.y]);
      console.log("Added sum points", line);
    }
  };

  const handleCircleDragMove = (e, lineIndex) => {
    const newLines = [...line];
    newLines[lineIndex] = e.target.x();
    newLines[lineIndex + 1] = e.target.y();
    setLine(newLines);
  };

  const resetLine = () => {
    setLine([]);
    setLines([]);
  };

  const undo = () => {
    setLine((prevLine) => prevLine.slice(0, -2));
  };

  const toggleAddingPoints = () => {
    if (addPoints) {
      setLines((prevLines) => [...prevLines, line]);
      setLine([]);
      setAddPoints(false);
    }
    if (!addPoints) {
      setAddPoints(true);
    }
  };

  const getSideLengths = (points) => {
    const p = [...points, points[0], points[1]];
    const sideLens = [];
    for (let i = 0; i < p.length - 2; i += 2) {
      const x1 = p[i];
      const y1 = p[i + 1];
      const x2 = p[i + 2];
      const y2 = p[i + 3];
      sideLens.push(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * (scale / 100));
    }
    console.log("Scale: ", scale);
    return sideLens;
  };

  return (
    <div className="lenScale">
      <div className="drawStage">
        <Stage width={1000} height={750} onClick={handleStageClick}>
          <Layer>
            {img && (
              <Image height={imageHeight} width={imageWidth} image={img} />
            )}
            {line.map((_, i) => (
              <Circle
                key={i}
                x={line[i * 2]}
                y={line[i * 2 + 1]}
                radius={8}
                zIndex={10}
                stroke="blue"
                draggable
                onDragMove={(e) => handleCircleDragMove(e, i * 2)}
              />
            ))}
            <Line
              ref={lineRef}
              points={line}
              zIndex={9}
              stroke="red"
              fill="#00D2FF"
              opacity={0.4}
              strokeWidth={3}
              closed={true}
            />
            {showDims &&
              line.length > 0 &&
              getSideLengths(line).map((len, j) => {
                const l = [...line, line[0], line[1]];
                const x = (l[j * 2] + l[j * 2 + 2]) / 2;
                const y = (l[j * 2 + 1] + l[j * 2 + 3]) / 2;
                return (
                  <React.Fragment key={j}>
                    <Rect x={x} y={y} width={75} height={20} fill="white" />
                    <Text
                      key={j}
                      text={`${len.toFixed(2)} m`}
                      x={x}
                      y={y}
                      fontSize={20}
                      fill="black"
                    />
                  </React.Fragment>
                );
              })}
            {lines.map((p, i) => (
              <React.Fragment key={i}>
                <Line
                  ref={lineRef}
                  key={i}
                  points={p}
                  zIndex={9}
                  stroke="red"
                  fill="#00D2FF"
                  opacity={0.4}
                  strokeWidth={3}
                  closed={true}
                />
                {showDims &&
                  getSideLengths(p).map((len, j) => {
                    const l = [...p, p[0], p[1]];
                    const x = (l[j * 2] + l[j * 2 + 2]) / 2;
                    const y = (l[j * 2 + 1] + l[j * 2 + 3]) / 2;
                    return (
                      <React.Fragment key={j}>
                        <Rect x={x} y={y} width={75} height={20} fill="white" />
                        <Text
                          key={j}
                          text={`${len.toFixed(2)} m`}
                          x={x}
                          y={y}
                          fontSize={20}
                          fill="black"
                        />
                      </React.Fragment>
                    );
                  })}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="Line">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>
            Outline roof/PV module section <br /> Click to add points, drag to
            adjust.
          </h4>
          <div>
            <Button
              variant="primary"
              onClick={toggleAddingPoints}
              style={{
                marginRight: "1rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              {addPoints ? "Save section" : "New Section"}
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowDims((prev) => !prev)}
              style={{
                marginRight: "1rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              {showDims ? "Hide dimensions" : "Show dimensions"}
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={undo}
              style={{ marginRight: "1rem" }}
            >
              Undo
            </Button>
            <Button variant="secondary" onClick={resetLine}>
              Reset
            </Button>
          </div>
          {lines.length > 0 && (
            <div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Sides</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {lines.map((l, i) => (
                    <Table.Row key={i}>
                      <Table.DataCell>
                        <TextField
                          label="Section name"
                          hideLabel
                          defaultValue={`Section ${i + 1}`}
                          size="small"
                          htmlSize={10}
                        />
                      </Table.DataCell>
                      <Table.DataCell>{l.length / 2}</Table.DataCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoofOutline;

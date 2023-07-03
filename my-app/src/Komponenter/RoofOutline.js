import React, { useState, useRef, useEffect } from "react";
import "../css/SetScale.css";
import UnitPlacer from "./UnitPlacer";
import { Stage, Layer, Image, Line, Circle, Text, Rect } from "react-konva";
import { Button, Table, TextField } from "@navikt/ds-react";
import { WrenchIcon } from "@navikt/aksel-icons";

const RoofOutline = ({ img, imageHeight, imageWidth, scale }) => {
  const [line, setLine] = useState([]);
  const [lines, setLines] = useState([]);
  const [addPoints, setAddPoints] = useState(false);
  const [showUnitPlacer, setShowUnitPlacer] = useState(false);
  const [showDims, setShowDims] = useState(true);
  const lineRef = useRef();
  const [angles, setAngles] = useState([]);

  const updateAngles = (points) => {
    const p = [...points, points[0], points[1], points[2], points[3]];
    const angles = [];
    for (let i = 0; i < p.length - 4; i += 2) {
      const v1 = getVectorBetweenPoints(
        { x: p[i + 2], y: p[i + 3] }, // end point
        { x: p[i], y: p[i + 1] } // start point
      );
      const v2 = getVectorBetweenPoints(
        { x: p[i + 2], y: p[i + 3] }, // start point
        { x: p[i + 4], y: p[i + 5] } // end point
      );
      const angle = getAngleBetweenVectors(v1, v2);
      angles.push(angle);
    }
    setAngles(angles);
  };

  useEffect(() => {
    lineRef.current.getLayer().batchDraw();
  }, [line]);

  const handleStageClick = () => {
    if (addPoints) {
      const liner = lineRef.current;
      const stage = liner.getStage();
      const point = stage.getPointerPosition();
      setLine((prevLine) => [...prevLine, point.x, point.y]);
      console.log("Added sum points", line);
      updateAngles([...line, point.x, point.y]);
    }
  };

  const handleCircleDragMove = (e, lineIndex) => {
    const newLines = [...line];
    newLines[lineIndex] = e.target.x();
    newLines[lineIndex + 1] = e.target.y();
    updateAngles(newLines);
    setLine(newLines);
  };

  const getVectorBetweenPoints = (p1, p2) => {
    return { x: p2.x - p1.x, y: p2.y - p1.y };
  };

  const getAngleBetweenVectors = (v1, v2) => {
    const angle1 = Math.atan2(v1.y, v1.x);
    const angle2 = Math.atan2(v2.y, v2.x);
    let degrees = (angle2 - angle1) * (180 / Math.PI);
    if (degrees < 0) degrees += 360;
    if (degrees > 180) degrees = 360 - degrees;
    return degrees;
  };

  const deleteLine = () => {
    setLine([]);
    setAddPoints(false);
  };

  const undo = () => {
    setLine((prevLine) => prevLine.slice(0, -2));
  };

  const toggleAddingPoints = () => {
    if (addPoints) {
      if (line.length > 0) {
        setLines((prevLines) => [...prevLines, line]);
      }
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
    return sideLens;
  };

  const editSection = (i) => {
    if (!addPoints) {
      const sec = lines[i];
      setLine(sec);
      setLines((prevLines) => prevLines.filter((_, j) => j !== i));
      if (!addPoints) {
        setAddPoints(true);
      }
    }
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
                radius={10}
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
              opacity={0.55}
              strokeWidth={4}
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
                    <Rect x={x} y={y} width={75} height={20} fill="salmon" />
                    <Text
                      key={j}
                      text={`${len.toFixed(2)} m`}
                      x={x}
                      y={y}
                      fontSize={20}
                      fill="black"
                    />

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
            {angles.map((angle, i) => {
              const l = [...line, line[0], line[1]];
              const x = l[i * 2];
              const y = l[i * 2 + 1];
              return (
                <React.Fragment key={i}>
                  <Rect
                    x={x - 30} // juster disse verdiene for å passe boksen rundt teksten
                    y={y - 30}
                    width={75} // juster disse verdiene for å passe boksen rundt teksten
                    height={20}
                    fill="white"
                  />
                  <Text
                    text={`${angle.toFixed(2)}°`}
                    x={x - 30}
                    y={y - 30}
                    fontSize={16}
                    fill="black"
                  />
                </React.Fragment>
              );
            })}
          </Layer>
        </Stage>
      </div>
      {!showUnitPlacer ? (
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
              <Button variant="secondary" onClick={deleteLine}>
                Delete
              </Button>
            </div>
            {lines.length > 0 && (
              <div>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Sides</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Edit</Table.HeaderCell>
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
                        <Table.DataCell>
                          <Button
                            variant="tertiary"
                            icon={<WrenchIcon aria-hidden />}
                            onClick={() => editSection(i)}
                            size="small"
                          ></Button>
                        </Table.DataCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
          <div style={{ height: "50%" }}></div>
          <div style={{ marginTop: "auto" }}>
            <Button
              variant="primary"
              onClick={() => setShowUnitPlacer(!showUnitPlacer)}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <>
          <UnitPlacer sections={lines} />
        </>
      )}
    </div>
  );
};

export default RoofOutline;

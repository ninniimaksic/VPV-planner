import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SetScale.css";
import UnitPlacer from "./UnitPlacer";
import { Stage, Layer, Image, Line, Circle, Text, Rect } from "react-konva";
import { Button, Table, TextField } from "@navikt/ds-react";
import { WrenchIcon, ArrowRightIcon } from "@navikt/aksel-icons";

const RoofOutline = ({ img, imageHeight, imageWidth, scale, opacity }) => {
  const [line, setLine] = useState([]);
  const [lines, setLines] = useState([]);
  const [addPoints, setAddPoints] = useState(false);
  const [showUnitPlacer, setShowUnitPlacer] = useState(false); // Show unit placer
  const [showDims, setShowDims] = useState(true); // Show dimensions of each section
  const lineRef = useRef(); // Ref to access the line component

  useEffect(() => {
    setTransparency(opacity);
  }, [opacity]);
  const [isNewSectionClicked, setIsNewSectionClicked] = useState(false);
  const [transparency, setTransparency] = useState(opacity);
  const stageRef = React.useRef();

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
      setIsNewSectionClicked(false);
    }
    if (!addPoints) {
      setAddPoints(true);
      setIsNewSectionClicked(true);
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

  const navigate = useNavigate();

  const handleSaveCont = () => {
    setTransparency(0);
    setShowUnitPlacer(true);

    setTimeout(() => {
      const dataUrlTransparent = stageRef.current.toDataURL();
      sessionStorage.setItem("screenshotTransparent", dataUrlTransparent);
      setTransparency(1);
      setTimeout(() => {
        const dataUrlOpaque = stageRef.current.toDataURL();
        sessionStorage.setItem("screenshotOpaque", dataUrlOpaque);
        sessionStorage.setItem("sections", JSON.stringify(lines));
        navigate("/results");
      }, 100);
    }, 100);
  };

  return (
    <div className={`lenScale ${isNewSectionClicked ? "drawn-cursor" : ""}`}>
      <div className="drawStage">
        <Stage
          width={900}
          height={650}
          onClick={handleStageClick}
          ref={stageRef}
        >
          <Layer>
            {img && (
              <Image
                height={imageHeight}
                width={imageWidth}
                image={img}
                opacity={transparency}
              />
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

      {!showUnitPlacer ? (
        <div classname="Fargeboks">
          <div className="Line">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <br></br>
              <br></br>
              <h4>
                Outline roof/PV module section <br /> Click to add points, drag
                to adjust.
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
                <label>
                  <input
                    type="checkbox"
                    checked={showDims}
                    onChange={() => setShowDims((prev) => !prev)}
                  />
                  Show dimensions
                </label>
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
                  <br></br>
                  <br></br>
                  <Table style={{ margin: "5px" }}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Height</Table.HeaderCell>
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
                              size="xsmall"
                              htmlSize={10}
                            />
                          </Table.DataCell>
                          <Table.DataCell>
                            <TextField
                              label="Height"
                              hideLabel
                              defaultValue={` m`}
                              size="xsmall"
                              htmlSize={10}
                            />
                          </Table.DataCell>
                          <Table.DataCell>
                            <Button
                              variant="tertiary"
                              icon={<WrenchIcon aria-hidden />}
                              onClick={() => editSection(i)}
                              size="xsmall"
                            ></Button>
                          </Table.DataCell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}
            </div>
            <div style={{ height: "40%" }}></div>
          </div>
        </div>
      ) : (
        <UnitPlacer sections={lines} scale={scale} />
      )}
      <div style={{ marginTop: "auto" }}>
        <Button
          variant="primary"
          onClick={() => setShowUnitPlacer(!showUnitPlacer)}
          style={{ marginRight: "1rem" }}
        >
          {showUnitPlacer ? "Change sections" : "Place units"}
        </Button>
        {showUnitPlacer && (
          <Button variant="primary" onClick={handleSaveCont}>
            <span className="next-button-content">
              Save and continue
              <ArrowRightIcon />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoofOutline;

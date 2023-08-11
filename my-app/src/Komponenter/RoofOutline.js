import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SetScale.css";
import UnitPlacer from "./UnitPlacer";
import PVgrids from "./PVgrids";
import html2canvas from "html2canvas";
import RoofOutlineOptions from "./RoofOutlineOptions";
import { Switch } from "@navikt/ds-react";
import { Stage, Layer, Image, Line, Circle, Text, Rect } from "react-konva";
import { Button, Table, TextField } from "@navikt/ds-react";
import { WrenchIcon, ArrowRightIcon } from "@navikt/aksel-icons";

const RoofOutline = ({
  img,
  imageHeight,
  imageWidth,
  height,
  width,
  scale,
  opacity,
}) => {
  const [line, setLine] = useState([]);
  const [lines, setLines] = useState(
    JSON.parse(sessionStorage.getItem("sections")) || []
  );
  const [grids, setGrids] = useState(
    JSON.parse(sessionStorage.getItem("grids")) || []
  );
  const [selectedGrid, setSelectedGrid] = useState(null);
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

  const selectGrid = (index) => {
    setSelectedGrid(index);
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

  const handleSaveCont = async () => {
    setTransparency(0);
    setShowUnitPlacer(true);

    try {
      setTimeout(async () => {
        document.querySelector(".drawStage").style.backgroundColor =
          "transparent";

        const drawStageCanvasTransparent = await html2canvas(
          document.querySelector(".drawStage")
        );
        const dataUrlTransparent = drawStageCanvasTransparent.toDataURL();
        sessionStorage.setItem("screenshotTransparent", dataUrlTransparent);

        setTransparency(1);
        setTimeout(async () => {
          const drawStageCanvasOpaque = await html2canvas(
            document.querySelector(".drawStage")
          );
          const dataUrlOpaque = drawStageCanvasOpaque.toDataURL();
          sessionStorage.setItem("screenshotOpaque", dataUrlOpaque);
          sessionStorage.setItem("sections", JSON.stringify(lines));
          navigate("/results");
        }, 100);
      }, 100);
    } catch (error) {
      console.log("Error capturing screenshot: ", error);
    }
  };

  return (
    <div className={`lenScale ${isNewSectionClicked ? "drawn-cursor" : ""}`}>
      <div className="drawStage">
        <Stage
          width={width}
          height={height}
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
              opacity={0.4}
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
                  opacity={0.25}
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
        <PVgrids
          grids={grids}
          scale={scale}
          selectGrid={selectGrid}
          selectedGrid={selectedGrid}
        />
      </div>
      {!showUnitPlacer ? (
        <RoofOutlineOptions
          lines={lines}
          toggleAddingPoints={toggleAddingPoints}
          addPoints={addPoints}
          setShowDims={setShowDims}
          showDims={showDims}
          undo={undo}
          deleteLine={deleteLine}
          editSection={editSection}
        />
      ) : (
        <UnitPlacer
          grids={grids}
          setGrids={setGrids}
          selectedGrid={selectedGrid}
          setSelectedGrid={setSelectedGrid}
        />
      )}
      <div
        style={{
          position: "absolute",
          marginTop: "auto",
          top: "80vh",
          right: "20vh",
        }}
      >
        <Button
          variant="primary"
          onClick={() => setShowUnitPlacer(!showUnitPlacer)}
          style={{ marginRight: "3rem" }}
        >
          {showUnitPlacer ? "Roof Segmentation" : "PV Unit Arrangement"}
        </Button>
      </div>

      <div style={{ position: "absolute", bottom: "70px", right: "70px" }}>
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

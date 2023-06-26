import React, { useState, useRef } from "react";
import "../css/SetScale.css";
import { Stage, Layer, Image, Line, Circle } from "react-konva";
import { Button } from "@navikt/ds-react";

const RoofOutline = ({ img, imageHeight, imageWidth, scale }) => {
  const [line, setLine] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const lineRef = useRef(); // Ref to access the line component

  const handleStageClick = () => {
    const liner = lineRef.current;
    const stage = liner.getStage();
    const point = stage.getPointerPosition();
    setLine([...line, point.x, point.y]);
    console.log("Added sum points", line);
  };

  const handleCircleDragMove = (e, lineIndex) => {
    const newLines = [...line];
    newLines[lineIndex] = e.target.x();
    newLines[lineIndex + 1] = e.target.y();
    setLine(newLines);
  };

  const resetLine = () => {
    setLine([]);
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
          </Layer>
        </Stage>
      </div>
      <div className="Line">
        <div>
          <h4>
            Outline roof/PV module area <br /> Click to add points, drag to
            adjust.
          </h4>
          {line.length >= 2 && (
            <Button variant="primary" onClick={resetLine}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoofOutline;

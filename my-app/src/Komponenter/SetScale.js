import React, { useState, useRef, useEffect } from "react";
import "../css/SetScale.css";
import useImage from "use-image";
import { Stage, Layer, Image, Line, Circle } from "react-konva";
import { TextField } from "@navikt/ds-react";

const SetScale = ({ selectedPhoto }) => {
  const [lines, setLines] = useState([]); // Array to store lines
  const [line, setLine] = useState([]); // Array to store current line [x1, y1, x2, y2]
  const [imgScale, setImgScale] = useState(0.2); // Scale of the image
  const lineRef = useRef(); // Ref to access the line component
  const [wimage] = useImage(selectedPhoto);
  const getImgLen = (line) => {
    const [x1, y1, x2, y2] = line;
    const x = x2 - x1;
    const y = y2 - y1;
    return Math.sqrt(x * x + y * y);
  };
  useEffect(() => {
    if (line.length === 4) {
      setLines([...lines, [line, (getImgLen(line) * imgScale).toFixed(2)]]);
      setLine([]);
    }
  }, [line, lines, imgScale, getImgLen]);

  const handleInputChange = (e) => {
    setLines([[lines[0][0], e.target.value], ...lines.slice(1)]);
    setImgScale(e.target.value / getImgLen(lines[0][0]));
  };

  if (!wimage) return null;

  const img = new window.Image();
  img.src = wimage.src;
  const targetW = window.innerWidth / 1.5 - 2;
  const targetH = window.innerHeight / 1.5 - 2;

  const widthFit = targetW / img.width;
  const heightFit = targetH / img.height;

  const scale = widthFit > heightFit ? heightFit : widthFit;

  const imageWidth = parseInt(img.width * scale, 10);
  const imageHeight = parseInt(img.height * scale, 10);

  const handleStageClick = () => {
    const liner = lineRef.current;
    const stage = liner.getStage();
    const point = stage.getPointerPosition();
    setLine([...line, point.x, point.y]);
    console.log("Added sum points", line);
  };

  const resetLines = () => {
    setLines([]);
    setLine([]);
  };

  const handleCircleDragMove = (e, lineIndex, endPointIndex) => {
    const newLines = [...lines];
    newLines[lineIndex][0][endPointIndex * 2] = e.target.x();
    newLines[lineIndex][0][endPointIndex * 2 + 1] = e.target.y();
    setLines(newLines);
  };

  return (
    <div className="lenScale">
      <div className="drawStage">
        <Stage
          width={window.innerWidth / 1.5}
          height={window.innerHeight / 1.5}
          onClick={handleStageClick}
        >
          <Layer>
            {img && (
              <Image
                x={0}
                y={0}
                height={imageHeight}
                width={imageWidth}
                image={img}
              />
            )}
            {lines.map((line, index) => (
              <React.Fragment key={index}>
                <Line
                  key={index}
                  points={line[0]}
                  stroke="red"
                  strokeWidth={3}
                />
                <Circle
                  x={line[0][0]}
                  y={line[0][1]}
                  radius={5}
                  fill="blue"
                  draggable
                  onDragMove={(e) => handleCircleDragMove(e, index, 0)}
                />
                <Circle
                  x={line[0][2]}
                  y={line[0][3]}
                  radius={5}
                  fill="blue"
                  draggable
                  onDragMove={(e) => handleCircleDragMove(e, index, 1)}
                />
              </React.Fragment>
            ))}
            <Line ref={lineRef} points={[]} stroke="red" strokeWidth={3} />
          </Layer>
        </Stage>
      </div>
      {lines.map((line, index) => (
        <div key={index}>
          <p>
            Line {index + 1} length: {line[1]}m
          </p>
        </div>
      ))}
      <div className="Line">
        {lines.length >= 1 && (
          <div>
            <label htmlFor="lineLengthInput">Length line 1 (meters):</label>
            <TextField
              id="lineLengthInput"
              type="number"
              label="Set length"
              description="Drag or adjust"
              onChange={handleInputChange}
            />
            <button onClick={() => resetLines()}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetScale;

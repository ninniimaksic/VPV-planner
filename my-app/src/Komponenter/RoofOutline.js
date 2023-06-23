import React, { useState, useRef, useEffect } from "react";
import "../css/App.css";
import useImage from "use-image";
import { Stage, Layer, Image, Line } from "react-konva";

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

  const handleStageClick = (e) => {
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

  return (
    <div className="hassetScale">
      <h3>Valgt tegning</h3>
      <div className="roofimg"></div>
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
            <Line key={index} points={line[0]} stroke="red" strokeWidth={3} />
          ))}
          <Line ref={lineRef} points={[]} stroke="red" strokeWidth={3} />
        </Layer>
      </Stage>
      {lines.map((line, index) => (
        <div key={index}>
          <p>
            Line {index + 1} length: {line[1]}m
          </p>
        </div>
      ))}
      {lines.length >= 1 && (
        <div>
          <label htmlFor="lineLengthInput">Length line 1 (meters):</label>
          <input
            id="lineLengthInput"
            type="number"
            onChange={handleInputChange}
          />
          <button onClick={() => resetLines()}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default SetScale;

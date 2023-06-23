import React, { useState, useRef, useEffect } from "react";
import "../css/App.css";
import useImage from "use-image";
import { Stage, Layer, Image, Line } from "react-konva";

const Drawing = ({ selectedPhoto, setSelectedPhoto }) => {
  const [lines, setLines] = useState([]); // Array to store lines
  const [line, setLine] = useState([]); // Array to store current line [x1, y1, x2, y2]
  const [lineLength, setLineLength] = useState(0);
  const lineRef = useRef(); // Ref to access the line component
  const [wimage] = useImage(selectedPhoto);
  useEffect(() => {
    if (line.length === 4) {
      setLines([...lines, [line, 0]]);
      setLine([]);
    }
  }, [line, lines, lineLength]);

  const handleInputChange = (e) => {
    setLines([[lines[0][0], e.target.value], ...lines.slice(1)]);
  };

  if (!wimage) return null;

  const img = new window.Image();
  img.src = wimage.src;

  const handleStageClick = (e) => {
    const liner = lineRef.current;
    const stage = liner.getStage();
    const point = stage.getPointerPosition();
    setLine([...line, point.x, point.y]);
    console.log("Added sum points", line);
  };

  return (
    <div className="hasDrawing">
      <h3>Valgt tegning</h3>
      <div className="roofimg"></div>
      <Stage
        width={window.innerWidth / 1.5}
        height={window.innerHeight / 1.6}
        onClick={handleStageClick}
      >
        <Layer>
          <Image
            x={0}
            y={0}
            height={window.innerHeight / 1.5}
            width={window.innerWidth / 1.5}
            image={img}
          />
          {lines.map((line, index) => (
            <Line key={index} points={line[0]} stroke="red" strokeWidth={3} />
          ))}
          <Line ref={lineRef} points={[]} stroke="red" strokeWidth={3} />
        </Layer>
      </Stage>
      {lines.map((line, index) => (
        <div key={index}>
          <p>
            Line {index + 1} length: {line[1]}cm
          </p>
        </div>
      ))}
      {lines.length >= 1 && (
        <div>
          <label htmlFor="lineLengthInput">Length line 1:</label>
          <input
            id="lineLengthInput"
            type="number"
            onChange={handleInputChange}
          />
          <button onClick={() => handleInputChange(0)}>Reset</button>
        </div>
      )}
      ;
    </div>
  );
};

export default Drawing;

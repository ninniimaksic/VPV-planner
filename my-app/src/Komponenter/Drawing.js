import React from "react";
import "../css/App.css";
import useImage from "use-image";
import { Stage, Layer, Image } from "react-konva";

const Drawing = ({ selectedPhoto, setSelectedPhoto }) => {
  const [image] = useImage(selectedPhoto);
  const img = <Image image={image} />;
  return (
    <div className="hasDrawing">
      <h3>Valgt tegning</h3>
      <div className="roofimg"></div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            image={img}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Drawing;

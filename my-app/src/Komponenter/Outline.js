import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const Outline = ({ selectedPhoto }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });

    fabric.Image.fromURL(selectedPhoto, function (img) {
      img.scale(1);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    let roofPoints = [];
    let isDrawing = false;

    canvas.on("mouse:down", function (options) {
      isDrawing = true;
      let pointer = canvas.getPointer(options.e);
      roofPoints.push({ x: pointer.x, y: pointer.y });
    });

    canvas.on("mouse:move", function (options) {
      if (!isDrawing) return;
      let pointer = canvas.getPointer(options.e);
      roofPoints.push({ x: pointer.x, y: pointer.y });
      canvas.renderAll();
    });

    canvas.on("mouse:up", function () {
      isDrawing = false;

      let roofOutline = new fabric.Polygon(roofPoints, {
        stroke: "red",
        fill: "rgba(0,0,0,0)",
        strokeWidth: 2,
      });
      canvas.add(roofOutline);
      canvas.renderAll();

      roofPoints = [];
    });

    return () => {
      canvas.dispose();
    };
  }, [selectedPhoto]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        width={800}
        height={600}
      />
    </div>
  );
};

export default Outline;

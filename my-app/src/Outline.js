// import the fabric library
import { fabric } from "fabric";

const Outline = (props) => {
  var photo = props.selectedPhoto;
  // initialize canvas
  let canvas = new fabric.Canvas("canvas");

  // load image
  fabric.Image.fromURL(photo, function (img) {
    // scale image if necessary
    img.scale(1);
    canvas.add(img);
    canvas.renderAll();
  });

  // initialize array to store points
  let roofPoints = [];
  let isDrawing = false;

  // add event listeners for mouse events
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

    // create and add polygon to canvas when mouse is released
    let roofOutline = new fabric.Polygon(roofPoints, {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
      strokeWidth: 2,
    });
    canvas.add(roofOutline);
    canvas.renderAll();

    // clear points
    roofPoints = [];
  });

  // calculate area function
  function calculateArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      let j = (i + 1) % points.length;

      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    area /= 2;
    return Math.abs(area); // returns in pixels
  }

  // use the calculateArea function
  let area = calculateArea(roofPoints);
  console.log(area);

  return <canvas id="canvas" width="500" height="500" />;
};

export default Outline;

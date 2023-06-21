import React from "react";
import "./App.css";
import Imgscale from "./imgscale";
import * as markerjs2 from "markerjs2";

const Drawing = ({ selectedPhoto, setSelectedPhoto }) => {
  const showMarkerArea = () => {
    if (selectedPhoto) {
      const markerArea = new markerjs2.MarkerArea(
        document.querySelector(".selected-photo")
      );
      markerArea.addEventListener("render", (event) => {
        if (selectedPhoto) {
          setSelectedPhoto(event.dataUrl);
        }
      });

      markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
      markerArea.show();
    }
  };
  return (
    <div className="hasDrawing">
      <h3>Valgt tegning</h3>
      <div className="roofimg">
        <Imgscale />
        <img
          class="selected-photo"
          className="selected-photo"
          src={selectedPhoto}
          alt="Selected"
          onClick={showMarkerArea}
        />
      </div>
    </div>
  );
};

export default Drawing;

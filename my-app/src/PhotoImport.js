import React, { useState } from "react";
import "./App.css";
import Imgscale from "./imgscale";
import * as markerjs2 from "markerjs2";

const PhotoImport = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    // Utfør nødvendig validering av filen her
    setSelectedPhoto(URL.createObjectURL(file));
  };
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
      // markerArea.addEventListener("addLine", (event) => {
      //   console.log("Line added", event);
      // });
      markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
      markerArea.show();
    }
  };

  return (
    <div>
      <h2>Importer tegning</h2>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {selectedPhoto && (
        <div class="hasDrawing">
          <h3>Valgt tegning</h3>
          <div class="roofimg">
            <Imgscale />
            <img
              class="selected-photo"
              src={selectedPhoto}
              alt="Selected"
              className="selected-photo"
              onClick={showMarkerArea}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoImport;

import React, { useState, useRef } from "react";
import "./App.css";
import Imgscale from "./imgscale";
import * as markerjs2 from "markerjs2";
import { Button } from "@navikt/ds-react";
import "@navikt/ds-css";

const PhotoImport = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInput = useRef();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    // Utfør nødvendig validering av filen her
    setSelectedPhoto(URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInput.current.click();
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

      markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
      markerArea.show();
    }
  };

  return (
    <div>
      <h2>Importer tegning</h2>
      <Button variant="primary" onClick={handleClick}>
        Velg fil
      </Button>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handlePhotoUpload}
      />
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

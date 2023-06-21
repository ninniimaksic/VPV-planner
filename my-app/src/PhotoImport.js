import React, { useState } from "react";
import Logo from "./Logo.png";
import "./App.css";
import Imgscale from "./Geocode";
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
        if (this.imgRef.current) {
          this.imgRef.current.src = event.dataUrl;
        }
      });
      markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
      markerArea.show();
    }
  };

  return (
    <div>
      <h2>Importer tegning</h2>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {selectedPhoto && (
        <div>
          <h3>Valgt tegning</h3>
          {/* Next line is html row */}
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

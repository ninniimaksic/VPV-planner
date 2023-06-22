import React, { useState, useRef } from "react";
import Drawing from "./Drawing";
import "../css/App.css";
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
        <Drawing
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      )}
    </div>
  );
};

export default PhotoImport;

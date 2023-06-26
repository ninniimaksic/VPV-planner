import React, { useState, useRef } from "react";
import SetScale from "./SetScale";
import "../css/photoimport.css";
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
    <>
      <div class="plassering1">
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
      </div>
      {selectedPhoto && <SetScale selectedPhoto={selectedPhoto} />}
    </>
  );
};

export default PhotoImport;

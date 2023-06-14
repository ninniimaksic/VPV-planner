import React, { useState } from "react";
import Logo from "./Logo.png";
import Outline from "./Outline";

const PhotoImport = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    // Utfør nødvendig validering av filen her
    setSelectedPhoto(URL.createObjectURL(file));
  };

  return (
    <div>
      <img id="logo-image" src={Logo} alt="Logo" />
      <h2>Importer tegning</h2>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {selectedPhoto && (
        <div>
          <h3>Valgt tegning</h3>
          <img src={selectedPhoto} alt="Selected" className="selected-photo" />
          <Outline selectedPhoto={selectedPhoto} />
        </div>
      )}
    </div>
  );
};

export default PhotoImport;

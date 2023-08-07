import React, { useState, useRef } from "react";
import SetScale from "./SetScale";
import Navbar from "./navbar";
import "../css/photoimport.css";
import { Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router-dom";

const PhotoImport = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [opacity, setOpacity] = useState(1); // New state for controlling opacity
  const fileInput = useRef();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));
    sessionStorage.setItem("imgurl", URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleOpacityChange = (value) => {
    setOpacity(value);
  };

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/projectinfo");
  };

  return (
    <>
      <Navbar />

      <div className="plassering1">
        <div classname="uploadknapp">
          {!selectedPhoto && <h2>Upload image </h2>}
        </div>
        {!selectedPhoto && (
          <Button variant="primary" onClick={handleClick}>
            Choose image
          </Button>
        )}

        <input
          label="test"
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        {selectedPhoto && (
          <SetScale selectedPhoto={selectedPhoto} opacity={opacity} />
        )}

        {selectedPhoto && (
          <div>
            <p>Image Transparency</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            />
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        className="back-button"
        onClick={handleBackPage}
      >
        <span className="back-button-content">
          <ArrowLeftIcon />
          Back
        </span>
      </Button>
    </>
  );
};

export default PhotoImport;

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
  const fileInput = useRef();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));
    sessionStorage.setItem("imgurl", URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/photoimport");
  };

  return (
    <>
      <Navbar />

      <div className="plassering1">
        {!selectedPhoto && <h2>Upload image </h2>}
        {!selectedPhoto && (
          <Button variant="primary" onClick={handleClick}>
            Choose image
          </Button>
        )}
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        {selectedPhoto && <SetScale selectedPhoto={selectedPhoto} />}
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

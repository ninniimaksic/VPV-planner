import React, { useState, useRef, useEffect } from "react";
import SetScale from "./SetScale";
import Navbar from "./navbar";
import "../css/photoimport.css";
import { Button } from "@navikt/ds-react";
import { supabase } from "../supabaseClient";
import "@navikt/ds-css";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "./storageUtils";
import StepperInd from "./Stepper";
import Slider from "rc-slider";
import "../css/slider.css";

const PhotoImport = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [opacity, setOpacity] = useState(1); // New state for controlling opacity
  const fileInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const imgData = sessionStorage.getItem("imgurl");
    if (imgData) {
      setSelectedPhoto(imgData);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    uploadImage(e.target.files[0]);
    const file = URL.createObjectURL(e.target.files[0]);
    const imgurl = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      sessionStorage.setItem("imgurl", reader.result);
    };
    if (imgurl) {
      reader.readAsDataURL(imgurl);
    }
    setSelectedPhoto(file);
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleOpacityChange = (value) => {
    setOpacity(value);
  };

  const handleBackPage = () => {
    navigate("/projectinfo");
  };

  return (
    <>
      <Navbar />

      <div className="plassering1">
        <div className="uploadknapp">
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={handleOpacityChange}
                style={{
                  width: "200px",
                }}
              />
            </div>
          </div>
        )}
      </div>
      <StepperInd currentStep={2} />
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

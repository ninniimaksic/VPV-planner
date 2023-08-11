import React, { useState, useEffect } from "react";
import "../css/Compass.css";
import { TextField } from "@navikt/ds-react";
import CompassImg from "../img/Compass.png";

const Compass = () => {
  const [angle, setAngle] = useState(sessionStorage.getItem("azimuth")) || "";

  const handleAngleChange = (event) => {
    const newAngle = parseInt(event.target.value);
    setAngle(newAngle);
  };

  useEffect(() => {
    sessionStorage.setItem("azimuth", angle);
  }, [angle]);

  const compassStyle = {
    transform: `rotate(${angle}deg)`,
    transition: "transform 0.5s ease-in-out",
    transformOrigin: "center",
    width: "70px", // modify to make image smaller
    height: "70px", // modify to make image smaller
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {" "}
      <TextField
        label="Set angle of north in the image"
        id="angle-input"
        type="number"
        value={angle}
        min="0"
        max="360"
        onChange={handleAngleChange}
        style={{ width: "200px" }}
      />
      <br></br>
      <div id="compass-container">
        <img id="compass" src={CompassImg} alt="Compass" style={compassStyle} />
      </div>
    </div>
  );
};

export default Compass;

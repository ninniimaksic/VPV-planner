import React, { useState, useEffect } from "react";
import "../css/Compass.css";
import { TextField } from "@navikt/ds-react";
import CompassImg from "../img/Compass.png";

const Compass = () => {
  const [angle, setAngle] = useState(0);

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
  };

  return (
    <div>
      <TextField
        label="Set angle of north in the image"
        id="angle-input"
        type="number"
        min="0"
        max="360"
        onChange={handleAngleChange}
      />

      <div id="compass-container">
        <img id="compass" src={CompassImg} alt="Compass" style={compassStyle} />
      </div>
    </div>
  );
};

export default Compass;

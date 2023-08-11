import React, { useState, useEffect } from "react";
import "../css/SetScale.css";
import { Button, TextField } from "@navikt/ds-react";
import Units from "./Units.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const UnitPlacer = ({ grids, setGrids, selectedGrid, setSelectedGrid }) => {
  const [ncol, setNcol] = useState(0);
  const [nrow, setNrow] = useState(0);
  const [sliderValue, setSliderValue] = useState(0); //

  const addGrid = (ncol, nrow, angle) => {
    if (ncol <= 0 || nrow <= 0) {
      return;
    }
    setGrids([...grids, { ncol, nrow, rotation: angle + 90 }]);
    console.log("Added grid:", { ncol, nrow });
  };

  const handleNcolChange = (event) => {
    setNcol(parseInt(event.target.value));
  };

  const handleNrowChange = (event) => {
    setNrow(parseInt(event.target.value));
  };

  const handleSliderChange = (value) => {
    if (selectedGrid !== null) {
      const newGrids = [...grids];
      newGrids[selectedGrid].rotation = value;
      setGrids(newGrids);
      setSliderValue(value); // Oppdater sliderValue når slider-verdien endres
    }
  };

  const deleteGrid = (indexToDelete) => {
    if (indexToDelete !== null) {
      const newGrids = grids.filter((_, index) => index !== indexToDelete);
      setGrids(newGrids);
      setSelectedGrid(null);
    }
  };

  // Hver gang 'grids' staten oppdateres, lagrer vi den nye staten i sessionStorage.
  useEffect(() => {
    sessionStorage.setItem("grids", JSON.stringify(grids));
  }, [grids]);

  return (
    <div className="farge">
      {" "}
      <div className="Line">
        <div style={{ marginBottom: "10vh", padding: "2vh" }}>
          <div>
            <Units />
          </div>
          <TextField
            type="number"
            label="Number of columns"
            value={ncol}
            onChange={handleNcolChange}
          />
          <TextField
            type="number"
            label="Number of rows"
            value={nrow}
            onChange={handleNrowChange}
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            Main side orientation: {sliderValue} deg
          </div>

          <Slider
            label="Rotate"
            value={selectedGrid !== null ? grids[selectedGrid].rotation : 90}
            onChange={handleSliderChange}
            min={-180}
            max={180}
            step={1}
          />
          <Button
            onClick={() => addGrid(ncol, nrow, 0)}
            style={{
              marginRight: "1rem",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Add grid
          </Button>
          <Button
            onClick={() => deleteGrid(selectedGrid)}
            disabled={selectedGrid === null}
            style={{
              marginRight: "1rem",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Delete grid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnitPlacer;

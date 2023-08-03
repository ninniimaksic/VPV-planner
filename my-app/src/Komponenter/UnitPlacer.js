import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "../css/SetScale.css";
import PVgrid from "./PVgrid";
import { DragHorizontalIcon } from "@navikt/aksel-icons";
import { Button, TextField } from "@navikt/ds-react";
import Units from "./Units.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const UnitPlacer = ({ sections, scale }) => {
  const [grids, setGrids] = useState([]);
  const [ncol, setNcol] = useState(0);
  const [nrow, setNrow] = useState(0);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const unitLength = 160 / scale;
  const unitWidth = 150 / scale;
  const [sliderValue, setSliderValue] = useState(0); //

  const addGrid = (ncol, nrow, angle) => {
    if (ncol <= 0 || nrow <= 0) {
      return;
    }
    setGrids([...grids, { ncol, nrow, rotation: angle }]);
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

  const deleteGrid = () => {
    if (selectedGrid !== null) {
      const newGrids = grids.filter((_, index) => index !== selectedGrid);
      setGrids(newGrids);
      setSelectedGrid(null);
    }
  };

  const selectGrid = (index) => {
    setSelectedGrid(index);
  };

  // Hver gang 'grids' staten oppdateres, lagrer vi den nye staten i sessionStorage.
  useEffect(() => {
    sessionStorage.setItem("grids", JSON.stringify(grids));
  }, [grids]);

  return (
    <div>
      {" "}
      <div>
        <Units />
      </div>
      {grids.map((grid, i) => (
        <div
          key={`new-grid-${i}`}
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Draggable
            handle=".draggable"
            defaultPosition={{ x: 0, y: 0 }}
            grid={[1, 1]}
            scale={1}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  position: "absolute",
                  transform: `rotate(${grid.rotation}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    borderTop: i === selectedGrid ? "4px solid red" : "none",
                    borderRight:
                      i === selectedGrid ? "2px solid black" : "none",
                    borderBottom:
                      i === selectedGrid ? "4px solid blue" : "none",
                    borderLeft: i === selectedGrid ? "2px solid black" : "none",
                    backgroundImage:
                      i === selectedGrid
                        ? "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0px, rgba(0, 0, 0, 0.5) 10px, transparent 10px, transparent 20px)"
                        : "none",
                  }}
                >
                  <PVgrid
                    points={sections[0]}
                    l={unitLength}
                    w={unitWidth}
                    ncol={grid.ncol}
                    nrow={grid.nrow}
                    layoutid={i}
                  />
                  {i === selectedGrid && (
                    <div
                      className="arrow-up"
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "0",
                        height: "0",
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderBottom: "10px solid red",
                      }}
                    />
                  )}
                  <DragHorizontalIcon
                    className="draggable"
                    fontSize={48}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "100%",
                      transform: "translateX(-50%)",
                      marginTop: "10px",
                      cursor: "grab",
                      transition: "transform 0.3s ease-in-out",
                      backgroundColor: "yellow",
                    }}
                    onMouseDown={() => selectGrid(i)}
                  />
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      ))}
      <div style={{ marginTop: "10%", paddingLeft: "5%" }}>
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
          Rotation: {sliderValue} degrees
        </div>

        <Slider
          label="Rotate"
          value={selectedGrid !== null ? grids[selectedGrid].rotation : 0}
          onChange={handleSliderChange}
          min={0}
          max={360}
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
  );
};

export default UnitPlacer;

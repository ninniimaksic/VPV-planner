import React, { useState } from "react";
import Draggable from "react-draggable";
import "../css/SetScale.css";
import PVgrid from "./PVgrid";
import { DragHorizontalIcon } from "@navikt/aksel-icons";
import { Button, TextField } from "@navikt/ds-react";

const UnitPlacer = ({ sections, scale }) => {
  const [grids, setGrids] = useState([]);
  const [ncol, setNcol] = useState(0);
  const [nrow, setNrow] = useState(0);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const unitLength = 160 / scale;
  const unitWidth = 150 / scale;

  const addGrid = (ncol, nrow, angle) => {
    if (ncol <= 0 || nrow <= 0) {
      return;
    }
    setGrids([...grids, [ncol, nrow, angle]]);
    sessionStorage.setItem(
      "grids",
      JSON.stringify([...grids, [ncol, nrow, angle]])
    );
  };

  const handleNcolChange = (event) => {
    setNcol(parseInt(event.target.value));
  };

  const handleNrowChange = (event) => {
    setNrow(parseInt(event.target.value));
  };

  const handleRotationChange = (event) => {
    setRotationDegrees(parseInt(event.target.value));

    const handleAngleChange = (event, index) => {
      const updatedGrids = [...grids];
      updatedGrids[index][2] = parseInt(event.target.value);
      setGrids(updatedGrids);
      sessionStorage.setItem("grids", updatedGrids);
    };
  };

  const deleteGrid = () => {
    if (selectedGrid !== null) {
      const updatedGrids = grids.filter((_, index) => index !== selectedGrid);
      setGrids(updatedGrids);

      sessionStorage.setItem("grids", JSON.stringify(updatedGrids));

      sessionStorage.setItem("grids", updatedGrids);

      setSelectedGrid(null);
    }
  };

  const selectGrid = (index) => {
    setSelectedGrid(index);
  };

  return (
    <div>
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

                  transform: `rotate(${rotationDegrees}deg)`,
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
                    ncol={grid[0]}
                    nrow={grid[1]}
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
        <TextField
          type="number"
          label="Rotation degrees"
          value={rotationDegrees}
          onChange={handleRotationChange}
        />
        <Button
          onClick={() => addGrid(ncol, nrow, rotationDegrees)}
          style={{
            marginRight: "1rem",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          Add grid
        </Button>
        <Button
          onClick={deleteGrid}
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

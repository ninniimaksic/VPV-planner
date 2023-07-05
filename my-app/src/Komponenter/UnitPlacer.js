import React, { useState } from "react";
import Draggable from "react-draggable";
import "../css/SetScale.css";
import PVgrid from "./PVgrid";
import { DragHorizontalIcon } from "@navikt/aksel-icons";
import { Button, TextField } from "@navikt/ds-react";

const UnitPlacer = ({ sections, scale }) => {
  const [grids, setGrids] = useState([]); // Array of grid items
  const [ncol, setNcol] = useState(0);
  const [nrow, setNrow] = useState(0);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const unitLength = 160 / scale;
  const unitWidth = 150 / scale;

  const addGrid = (ncol, nrow, angle) => {
    setGrids([...grids, { ncol, nrow, angle, position: { x: 0, y: 0 } }]);
  };

  const handleNcolChange = (event) => {
    setNcol(parseInt(event.target.value));
  };

  const handleNrowChange = (event) => {
    setNrow(parseInt(event.target.value));
  };

  const handleAngleChange = (event, index) => {
    const updatedGrids = [...grids];
    updatedGrids[index].angle = parseInt(event.target.value);
    setGrids(updatedGrids);
  };

  const handleGridDrag = (data, index) => {
    const updatedGrids = [...grids];
    updatedGrids[index].position = { x: data.lastX, y: data.lastY };
    setGrids(updatedGrids);
  };
  const deleteGrid = () => {
    if (selectedGrid !== null) {
      const updatedGrids = [...grids];
      updatedGrids.splice(selectedGrid, 1);
      setGrids(updatedGrids);
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
          key={`grid-${i}`}
          style={{
            position: "absolute",
            transform: `rotate(${grid.angle}deg)`,
            left: `${grid.position.x}px`,
            top: `${grid.position.y}px`,
          }}
        >
          <Draggable onStop={(e, data) => handleGridDrag(data, i)}>
            <div
              className={`rotatable ${i === selectedGrid ? "selected" : ""}`}
              onMouseDown={() => selectGrid(i)}
            >
              <PVgrid
                points={sections[0]}
                l={unitLength}
                w={unitWidth}
                ncol={grid.ncol}
                nrow={grid.nrow}
              />
              <DragHorizontalIcon
                className="draggable"
                fontSize={48}
                style={{ cursor: "grab" }}
              />
            </div>
          </Draggable>
        </div>
      ))}
      <div style={{ marginTop: "10%" }}>
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
        {grids.map((grid, i) => (
          <div key={`angle-${i + 1}`}>
            <label htmlFor={`angle-${i + 1}`}>{`Angle of grid ${i + 1}`}</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#fff",
                  border: "1px solid #000",
                  marginRight: "10px",
                }}
              ></div>
              <input
                type="range"
                id={`angle-${i + 1}`}
                min="0"
                max="360"
                value={grid.angle}
                onChange={(event) => handleAngleChange(event, i)}
              />
              <span>{grid.angle}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitPlacer;

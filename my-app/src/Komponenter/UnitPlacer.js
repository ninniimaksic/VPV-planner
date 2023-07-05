import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "../css/SetScale.css";
import PVgrid from "./PVgrid";
import { DragHorizontalIcon } from "@navikt/aksel-icons";
import { Button, TextField } from "@navikt/ds-react";

const UnitPlacer = ({ sections, scale }) => {
  /*Real cm unit dimensions scaled to pixel dimensions, scale is cm/px */
  const [grids, setGrids] = useState([]); // Array of grid items
  const [ncol, setNcol] = useState(0);
  const [nrow, setNrow] = useState(0);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [layouts, setLayouts] = useState([]); // Array of grid items
  const unitLength = 160 / scale;
  const unitWidth = 150 / scale;
  console.log(unitLength, unitWidth, "px");
  console.log(unitLength * scale, unitWidth * scale, "cm");

  const addGrid = (ncol, nrow, angle) => {
    if (ncol <= 0 || nrow <= 0) {
      return;
    }
    setGrids([...grids, [ncol, nrow, angle]]);
  };

  const handleNcolChange = (event) => {
    setNcol(parseInt(event.target.value));
  };

  const handleNrowChange = (event) => {
    setNrow(parseInt(event.target.value));
  };

  const handleAngleChange = (event, index) => {
    const updatedGrids = [...grids];
    updatedGrids[index][2] = parseInt(event.target.value);
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
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              transform: `rotate(${grid[2]}deg)`,
            }}
          >
            <Draggable handle=".draggable" key={`new-grid-${i}`}>
              <div
                style={{
                  position: "absolute",
                  transform: `rotate(${grid[2]}deg)`,
                }}
                className="rotatable"
              >
                <div
                  style={{
                    border: i === selectedGrid ? "2px solid red" : "none",
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
                </div>
                <DragHorizontalIcon
                  className="draggable"
                  fontSize={48}
                  style={{ cursor: "grab" }}
                  onMouseDown={() => selectGrid(i)}
                />
              </div>
            </Draggable>
          </div>
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
          <div key={`grid-${i}`}>
            <TextField
              type="number"
              label={`Angle of grid ${i + 1}`}
              value={grid[2]}
              onChange={(event) => handleAngleChange(event, i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitPlacer;

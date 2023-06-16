import React, { useState } from "react";
import "./Table.css"; // Import CSS file for styling

const Table = () => {
  const [markedCells, setMarkedCells] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = { row: rowIndex, col: colIndex };
    const isCellMarked = markedCells.some(
      (c) => c.row === cell.row && c.col === cell.col
    );

    if (isCellMarked) {
      // If the cell is already marked, remove it
      const newMarkedCells = markedCells.filter(
        (c) => !(c.row === cell.row && c.col === cell.col)
      );
      setMarkedCells(newMarkedCells);
    } else {
      // If the cell is not marked, add it
      const newMarkedCells = [...markedCells, cell];
      setMarkedCells(newMarkedCells);
    }
  };

  const handleReset = () => {
    setMarkedCells([]);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isMouseDown) {
      handleCellClick(rowIndex, colIndex);
    }
  };

  const isCellMarked = (rowIndex, colIndex) => {
    // Check if a cell is marked based on row and column index
    return markedCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex
    );
  };

  const countCorners = () => {
    const boxCount = {}; // Object to count the number of boxes

    markedCells.forEach((cell) => {
      const key = `${cell.row}-${cell.col}`;

      if (boxCount[key]) {
        boxCount[key] += 1;
      } else {
        boxCount[key] = 1;
      }
    });

    let cornerCount = 0;

    for (const key in boxCount) {
      const boxSize = boxCount[key];
      if (boxSize === 1) {
        cornerCount += 4; // Each individual box has 4 corners
      } else if (boxSize === 2) {
        cornerCount += 8; // Two connected boxes have 8 corners
      } else if (boxSize > 2) {
        cornerCount += 4 * boxSize; // Each additional box contributes 4 corners
      }
    }

    return cornerCount;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: 10 }, (_, colIndex) => (
              <th key={colIndex}>{colIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <th>{rowIndex + 1}</th>
              {Array.from({ length: 10 }, (_, colIndex) => (
                <td
                  key={colIndex}
                  className={isCellMarked(rowIndex, colIndex) ? "marked" : ""}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Number of corners: {countCorners()}</p>
      <p>Number of marked cells: {markedCells.length}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Table;

import React, { useState } from "react";
import "../css/Table.css";

const Table = () => {
  const [markedCells, setMarkedCells] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [previousMarkedCells, setPreviousMarkedCells] = useState([]);
  const [rowCount, setRowCount] = useState(10); // State for number of rows
  const [colCount, setColCount] = useState(10); // State for number of columns

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

    setPreviousMarkedCells((prev) => [...prev, markedCells]); // Save the previous state of marked cells
  };

  const handleReset = () => {
    setMarkedCells([]);
    setPreviousMarkedCells([]);
  };

  const handleUndo = () => {
    if (previousMarkedCells.length > 0) {
      const prevCells = previousMarkedCells.slice(0, -1); // Remove the last state
      setMarkedCells(prevCells[prevCells.length - 1] || []); // Set the previous state as the current state
      setPreviousMarkedCells(prevCells); // Update the previous states
    }
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

  const handleAddRow = () => {
    setRowCount(rowCount + 1);
  };

  const handleAddColumn = () => {
    setColCount(colCount + 1);
  };

  const handleRemoveRow = () => {
    if (rowCount > 0) {
      setRowCount(rowCount - 1);
      setMarkedCells(markedCells.filter((cell) => cell.row < rowCount - 1));
    }
  };

  const handleRemoveColumn = () => {
    if (colCount > 0) {
      setColCount(colCount - 1);
      setMarkedCells(markedCells.filter((cell) => cell.col < colCount - 1));
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: colCount }, (_, colIndex) => (
              <th key={colIndex}>{colIndex + 1}</th>
            ))}
            <th>
              <button onClick={handleAddColumn}>+</button>
              <button onClick={handleRemoveColumn}>-</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <th>{rowIndex + 1}</th>
              {Array.from({ length: colCount }, (_, colIndex) => (
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
          <tr>
            <th>
              <button onClick={handleAddRow}>+</button>
              <button onClick={handleRemoveRow}>-</button>
            </th>
            {Array.from({ length: colCount }, (_, colIndex) => (
              <th key={colIndex + rowCount + 1} />
            ))}
          </tr>
        </tbody>
      </table>
      <p>Number of corners: {countCorners()}</p>
      <p>Number of marked cells: {markedCells.length}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleUndo} disabled={previousMarkedCells.length === 0}>
        Undo
      </button>
    </div>
  );
};

export default Table;

import React, { useState, useRef, useEffect } from "react";
import "../css/SetScale.css";

const UnitPlacer = ({ sections }) => {
  const genGrid = (section) => {
    const grid = [section];
    return grid;
  };
  return (
    <div>
      {sections.map((section) => (
        <div>{genGrid(section)}</div>
      ))}
    </div>
  );
};

export default UnitPlacer;

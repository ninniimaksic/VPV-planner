import React, { useState, useRef, useEffect } from "react";
import "../css/SetScale.css";
import Table from "./Table";

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
      <Table />
    </div>
  );
};

export default UnitPlacer;

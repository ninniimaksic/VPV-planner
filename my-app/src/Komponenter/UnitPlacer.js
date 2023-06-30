import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "../css/SetScale.css";
import PVgrid from "./PVgrid";

const UnitPlacer = ({ sections, scale }) => {
  /*Real cm unit dimensions scaled to pixel dimensions, scale is cm/px */
  const unitLength = 160 / scale;
  const unitWidth = 150 / scale;
  console.log(unitLength, unitWidth, "px");
  console.log(unitLength * scale, unitWidth * scale, "cm");

  return (
    <div>
      {sections.map((section) => (
        <Draggable>
          <div>
            <PVgrid
              points={section}
              l={unitLength}
              w={unitWidth}
              ncol={7}
              nrow={3}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default UnitPlacer;

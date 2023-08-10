import React, { useState } from "react";
import PVgrid from "./PVgrid";
import { DragHorizontalIcon } from "@navikt/aksel-icons";
import { useEffect } from "react";
import Draggable from "react-draggable";

const PVgrids = ({ grids, scale, selectGrid, selectedGrid }) => {
  const unitLength = 150 / scale;
  const unitWidth = 160 / scale;
  const azimuth = parseInt(sessionStorage.getItem("azimuth")) || 0;
  const [arrays, setArrays] = useState([]);
  useEffect(() => {
    for (let i = 0; i < grids.length; i++) {
      setArrays([...arrays, JSON.parse(sessionStorage.getItem(`array${i}`))]);
    }
    console.log("grids:", grids);
    console.log("arrays:", arrays);
  }, []);

  return (
    <>
      {grids.map((grid, i, angle) => (
        <div
          key={`grid-${i}`}
          style={{ position: "absolute", left: "20%", top: "20%" }}
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
                  transform: `rotate(${grid.rotation + azimuth}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    borderRight: i === selectedGrid ? "4px solid red" : "none",
                    borderBottom:
                      i === selectedGrid ? "2px solid black" : "none",
                    borderLeft: i === selectedGrid ? "4px solid blue" : "none",
                    borderTop: i === selectedGrid ? "2px solid black" : "none",
                    backgroundImage:
                      i === selectedGrid
                        ? "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0px, rgba(0, 0, 0, 0.5) 10px, transparent 10px, transparent 20px)"
                        : "none",
                  }}
                >
                  <PVgrid
                    l={unitLength}
                    w={unitWidth}
                    ncol={grid.ncol}
                    nrow={grid.nrow}
                    layoutid={i}
                    array={arrays[i] || null}
                  />
                  {i === selectedGrid && (
                    <div
                      className="arrow-up"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "-20px",
                        transform: "translateX(20%)",
                        width: "0",
                        height: "0",
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft: "10px solid red",
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
    </>
  );
};

export default PVgrids;

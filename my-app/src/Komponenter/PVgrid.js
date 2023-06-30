import React, { useState, useEffect, useCallback } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "../css/PVgrid.css";
import { Button } from "@navikt/ds-react";

const GridLayout = WidthProvider(ReactGridLayout);

const PVgrid = ({ points, l, w, ncol, nrow }) => {
  const numColumns = ncol; // Number of columns in the grid
  const numRows = nrow; // Number of rows in the grid

  const itemLength = l; // Length of the grid item
  const itemWidth = w; // Width of the grid item

  // Generate grid items to fill the grid
  const generateGridItems = useCallback(() => {
    const gridItems = [];
    let itemId = 1;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        gridItems.push({
          i: itemId.toString(),
          x: col,
          y: row,
          w: 1,
          h: 1,
          static: true,
          selected: true,
        });
        itemId++;
      }
    }
    return gridItems;
  }, [numColumns, numRows]);

  const [layout, setLayout] = useState(generateGridItems());

  useEffect(() => {
    setLayout(generateGridItems());
  }, [numColumns, numRows, generateGridItems]);

  const handleGridItemClick = (itemId) => {
    const updatedLayout = layout.map((item) => {
      if (item.i === itemId) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    setLayout(updatedLayout);
  };

  return (
    <div style={{ width: itemWidth * numColumns }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={numColumns}
        rowHeight={itemLength}
        width={itemWidth * numColumns}
        isResizable={false} // Disable resizing
        isDraggable={false} // Disable dragging
        margin={[0, 0]} // Remove margin between items
      >
        {layout.map((item) => (
          <div
            key={item.i}
            style={{
              background: item.selected ? "pink" : "white",
              border: "1px solid gray",
              boxSizing: "border-box",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.7,
              width: itemWidth,
              height: itemLength,
            }} // Add custom styles for the rectangle
            onClick={() => handleGridItemClick(item.i)} // Handle click events
          >
            <div></div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default PVgrid;

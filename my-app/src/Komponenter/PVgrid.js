import React, { useState, useRef, useEffect } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "../css/PVgrid.css";

const GridLayout = WidthProvider(ReactGridLayout);

const PVgrid = ({ points, l, w }) => {
  const numColumns = 7; // Number of columns in the grid
  const numRows = 3; // Number of rows in the grid

  const itemLength = l; // Length of the grid item
  const itemWidth = w; // Width of the grid item

  // Generate grid items to fill the grid
  const generateGridItems = () => {
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
          stati: true,
        });
        itemId++;
      }
    }
    return gridItems;
  };

  // Define the grid layout configuration
  const layout = generateGridItems();

  // Calculate the grid container width based on the item width and number of columns
  const gridContainerWidth = itemWidth * numColumns;

  // Calculate the grid container height based on the item height and number of rows
  const gridContainerHeight = itemLength * numRows;

  // Set the grid container size dynamically based on the items
  const [gridSize, setGridSize] = useState({
    width: gridContainerWidth,
    height: gridContainerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      // Calculate the new grid container width based on the item width and number of columns
      const newGridContainerWidth = itemWidth * numColumns;

      // Calculate the new grid container height based on the item height and number of rows
      const newGridContainerHeight = itemLength * numRows;

      // Update the grid container size
      setGridSize({
        width: newGridContainerWidth,
        height: newGridContainerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: gridSize.width, height: gridSize.height }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={numColumns}
        rowHeight={itemLength}
        width={gridSize.width}
        isResizable={false} // Disable resizing
        isDraggable={false} // Disable dragging
        margin={[0, 0]} // Remove margin between items
      >
        {layout.map((item) => (
          <div
            key={item.i}
            style={{
              background: "lightblue",
              border: "1px solid gray",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }} // Add custom styles for the rectangle
          >
            {/* Render the content of each grid item */}
            <div>{item.i}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default PVgrid;

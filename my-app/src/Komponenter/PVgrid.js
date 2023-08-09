import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "../css/PVgrid.css";

const GridLayout = WidthProvider(ReactGridLayout);

const PVgrid = ({ l, w, ncol, nrow, layoutid, array }) => {
  const numColumns = ncol; // Number of columns in the grid
  const numRows = nrow; // Number of rows in the grid

  const itemLength = l; // Length of the grid item
  const itemWidth = w; // Width of the grid item

  const gridRef = useRef(null); // Reference to the grid container div
  const isMouseDown = useRef(false); // Flag to track mouse down state
  const selectedCells = useRef([]); // Array to store selected cell IDs

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

  const [layout, setLayout] = useState(array || generateGridItems());

  const saveLayout = (l) => {
    const grid = Array.from({ length: nrow }, () => Array(ncol).fill(0));
    l.forEach((i) => {
      const { x, y, selected } = i;
      grid[y][x] = selected ? 1 : 0;
    });
    sessionStorage.setItem(`layout${layoutid}`, JSON.stringify(grid));
    sessionStorage.setItem(`array${layoutid}`, JSON.stringify(l));
    console.log("Saved layout:", grid);
  };
  saveLayout(layout);

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
    saveLayout(updatedLayout);
  };

  const handleMouseDown = () => {
    isMouseDown.current = true;
    selectedCells.current = [];
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseEnter = (itemId) => {
    if (isMouseDown.current) {
      const updatedLayout = layout.map((item) => {
        if (item.i === itemId) {
          const updatedItem = {
            ...item,
            selected: !item.selected,
          };
          if (updatedItem.selected) {
            selectedCells.current.push(updatedItem.i);
          } else {
            const index = selectedCells.current.indexOf(updatedItem.i);
            if (index > -1) {
              selectedCells.current.splice(index, 1);
            }
          }
          return updatedItem;
        }
        return item;
      });

      setLayout(updatedLayout);
      saveLayout(updatedLayout);
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown.current) {
      const updatedLayout = layout.map((item) => {
        if (selectedCells.current.includes(item.i)) {
          return {
            ...item,
            selected: false,
          };
        }
        return item;
      });

      setLayout(updatedLayout);
      saveLayout(updatedLayout);
      console.log("layout:", layout);
      selectedCells.current = [];
    }
  };
  useEffect(() => {
    const gridContainer = gridRef.current;
    gridContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      gridContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <div
      style={{ width: itemWidth * numColumns }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div ref={gridRef}>
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
                background: item.selected ? "yellow" : "transparent",
                border: "1px solid gray",
                boxSizing: "border-box",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.7,
                width: itemWidth,
                height: itemLength,
              }} // Add custom styles for the rectangle
              onMouseEnter={() => handleMouseEnter(item.i)}
              onClick={() => handleGridItemClick(item.i)}
              onMouseDown={() => handleGridItemClick(item.i)}
            >
              <div></div>
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default PVgrid;

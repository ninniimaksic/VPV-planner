import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Button, Table } from "@navikt/ds-react";
import "../css/results.css";
import StepperInd from "./Stepper";

export default function Results() {
  const projectName = sessionStorage.getItem("projectName");
  const projectNumber = sessionStorage.getItem("projectNumber");
  const installer = sessionStorage.getItem("installer");
  const PNinstaller = sessionStorage.getItem("PNinstaller");
  const EndCostumer = sessionStorage.getItem("EndCostumer");
  const projectNumberEC = sessionStorage.getItem("projectNumberEC");
  const sections = sessionStorage.getItem("sections");
  const grids = JSON.parse(sessionStorage.getItem("grids"));
  var layouts = [];
  for (let i = 0; i < grids.length; i++) {
    layouts.push(JSON.parse(sessionStorage.getItem(`layout${i}`)) || []);
  }
  // Count num of units in layout [1, 0] array
  let nUnits = layouts.reduce((total, layout) => {
    return (
      total +
      layout.reduce((rowTotal, row) => {
        return (
          rowTotal +
          row.reduce((unitTotal, unit) => {
            return unitTotal + unit;
          }, 0)
        );
      }, 0)
    );
  }, 0);
  const address = sessionStorage.getItem("address");
  const info = sessionStorage.getItem("info");
  const lat = sessionStorage.getItem("lat");
  const lon = sessionStorage.getItem("lon");
  const azimuth = sessionStorage.getItem("azimuth") || 0;
  const kWp = 1;
  const loss = 14;
  const imgurl = sessionStorage.getItem("imgurl");
  const [apiData, setApiData] = useState(null);

  const {
    projectName,
    projectNumber,
    installer,
    PNinstaller,
    EndCostumer,
    projectNumberEC,
    sections,
    grids,
    layouts,
    address,
    info,
    lat,
    lon,
    azimuth,
    kWp,
    loss,
    imgurl,
    screenshotTransparent,
    screenshotOpaque,
  } = getSessionStorageAll();

  const nUnits = getUnitCount(layouts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://vpv-planner.vercel.app/api/pvcalc.js?lat=${lat}&lon=${lon}&peakpower=${kWp}&loss=${loss}&azimuth=${azimuth}`
        );
        if (response.ok) {
          const body = await response.text();
          const data = JSON.parse(body);
          setApiData(parseFloat(data.outputs.totals.fixed.E_y));
        } else {
          console.log("API request failed or returned non-JSON response");
        }
      } catch (error) {
        console.log("API request failed:", error);
      }
    };

    fetchData();
  }, [azimuth, lat, lon]);

  function get(grid, i, j) {
    // Return value of (i, j) if it exists, else 0
    try {
      return grid[i][j] || 0;
    } catch (error) {
      return 0;
    }
  }

  function countFeet(grid, i, j) {
    // Count the number of feet needed for cell (i, j)
    const currentCell = grid[i][j];
    if (!currentCell) {
      // No unit => no feet
      return 0;
    }

    const tl =
      !get(grid, i - 1, j) && !get(grid, i, j - 1) && !get(grid, i - 1, j - 1);
    const tr = !get(grid, i - 1, j);
    const bl = !get(grid, i, j - 1);

    return tl + tr + bl + 1;
  }

  function totCount(grid) {
    // Return the total number of feet needed for the grid
    let totalFeet = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        totalFeet += countFeet(grid, i, j);
      }
    }
    return totalFeet;
  }

  function handleDownload() {
    const link1 = document.createElement("a");
    link1.href = screenshotTransparent;
    link1.download = `${(projectName || "Project").replace(
      " ",
      "_"
    )}_layout1.png`;
    link1.click();

    const link2 = document.createElement("a");
    link2.href = screenshotOpaque;
    link2.download = `${(projectName || "Project").replace(
      " ",
      "_"
    )}_layout2.png`;
    link2.click();
  }

  const transposeTable = (data) => {
    const rows = [];
    for (const key in data) {
      rows.push(
        <Table.Row key={key}>
          <Table.DataCell>{key}</Table.DataCell>
          <Table.DataCell>{data[key]}</Table.DataCell>
        </Table.Row>
      );
    }
    return rows;
  };

  useEffect(() => {
    // Do something with the retrieved data
    console.log("Project Name:", projectName);
    console.log("Project Number:", projectNumber);
    console.log("Installer:", installer);
    console.log("PN Installer:", PNinstaller);
    console.log("End Customer:", EndCostumer);
    console.log("Project Number EC:", projectNumberEC);
    console.log("Sections:", sections);
    console.log("Grids:", grids, "Length:", grids.length);
    console.log("Layout0:", layouts[0]);
    console.log("Address:", address);
    console.log("Info:", info);
    console.log("Lat:", lat);
    console.log("Lon:", lon);
    console.log("nUnits:", nUnits);
    console.log("Azimuth:", azimuth);
    console.log("Imgurl:", imgurl);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Results</h1>
            <div>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Property</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {transposeTable({
                    "Project Name": projectName,
                    "Project Number": projectNumber,
                    Installer: installer,
                    "PN Installer": PNinstaller,
                    "End Customer": EndCostumer,
                    "Project Number EC": projectNumberEC,
                  })}
                </Table.Body>
              </Table>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Property</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {transposeTable({
                    Address: address,
                    Info: info,
                    Lat: lat,
                    Lon: lon,
                    Azimuth: azimuth,
                    Arrays: layouts.map(
                      (layout, i) => ` Array ${i}: ${getUnitCount([layout])},`
                    ),
                    "Total number of units": nUnits,
                  })}
                </Table.Body>
              </Table>
            </div>
            <br />
            <h3>Bill Of Materials</h3>
            <div>
              <h4> Total amount of feet (support): </h4>
              {layouts.map((layout, i) => (
                <p key={i}>
                  Layout {i}: {totCount(layout)}
                </p>
              ))}
            </div>
            <h4>Cable cradles:</h4>
            {layouts.map((layout, i) => (
              <p key={i}>
                Layout {i}: {layout.length * 2}
              </p>
            ))}
            <br />
            <h3>Energy yield estimation</h3>
            <h4>
              Using {kWp} kWp, {loss}% loss and {(azimuth + 180) % 360}° main
              side direction:
            </h4>
            {apiData ? (
              <>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">Per unit</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.DataCell>{apiData} kWh</Table.DataCell>
                      <Table.DataCell>{apiData * nUnits} kWh</Table.DataCell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, marginRight: "1rem" }}>
              {screenshotTransparent && (
                <img
                  src={screenshotTransparent}
                  alt="Transparent Screenshot"
                  style={{ width: "100%", maxWidth: "500px" }}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              {screenshotOpaque && (
                <img
                  src={screenshotOpaque}
                  alt="Opaque Screenshot"
                  style={{ width: "100%", maxWidth: "500px" }}
                />
              )}
            </div>

            {screenshotTransparent && screenshotOpaque && (
              <Button
                variant="primary"
                style={{ marginTop: "1rem" }}
                onClick={handleDownload}
              >
                Download imgs
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

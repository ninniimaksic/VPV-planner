import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Button, Table } from "@navikt/ds-react";
import "../css/results.css";
import StepperInd from "./Stepper";
import {
  getSessionStorageAll,
  getUnitCount,
  fetchEnergyYield,
  getUserEmail,
} from "./storageUtils";

export default function Results() {
  const [apiData, setApiData] = useState(0);

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
    fullAdr,
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
  const [emailPrefix, setEmailPrefix] = useState("");
  const layoutCounts = layouts.map((layout) => getUnitCount([layout]));
  const gridRot = grids[0].rotation || 0;
  const calcMainOrient = () => {
    const tmp = (gridRot + azimuth) % 360;
    if (tmp > 270) {
      return tmp - 180;
    }
    if (tmp < 90) {
      return tmp + 180;
    }
  };

  //Layoyt by
  async function getEmailPrefix() {
    const fullEmail = await getUserEmail();
    const emailPrefixValue =
      typeof fullEmail === "string" ? fullEmail.split("@")[0] : "";
    setEmailPrefix(emailPrefixValue);
  }
  useEffect(() => {
    getEmailPrefix();
  }, []);

  const arrayOrient = calcMainOrient();

  useEffect(() => {
    const fetchData = async () => {
      const apiDataMain = await fetchEnergyYield(
        lat,
        lon,
        arrayOrient,
        kWp,
        loss
      );
      const apiDataBack = await fetchEnergyYield(
        lat,
        lon,
        arrayOrient - 180,
        kWp,
        loss
      );
      setApiData(parseFloat(apiDataMain + apiDataBack * 0.95));
    };
    fetchData();
  }, [arrayOrient, azimuth, kWp, lat, lon, loss]);

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
    const tr = !get(grid, i - 1, j) && !get(grid, i - 1, j + 1);
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

  function cableCount(grid) {
    // Return the total number of cables needed for the grid
    let totalCables = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j]) {
          totalCables += 2;
          break;
        }
      }
    }
    return totalCables;
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
      if (data[key]) {
        rows.push(
          <Table.Row key={key}>
            <Table.DataCell>
              <b>{key}</b>
            </Table.DataCell>
            <Table.DataCell>{data[key]}</Table.DataCell>
          </Table.Row>
        );
      }
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
    console.log("FullAdr:", fullAdr);
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
            <div className="tables-container">
              <div className="table-container">
                <Table size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Project Information</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
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
                      "Layout by": emailPrefix,
                      Date: new Date().toLocaleDateString(),
                    })}
                  </Table.Body>
                  <Table.Body></Table.Body>
                </Table>
              </div>
              <div className="table-container">
                <Table size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Location</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {transposeTable({
                      Address: `${fullAdr?.road || ""} ${
                        fullAdr?.house_number || ""
                      }`,
                      "ZIP code": `${fullAdr?.postcode || ""}`,
                      City: ` ${fullAdr?.city || ""}`,
                      Country: `${fullAdr?.country || ""}`,
                      Latitude: lat,
                      Longitude: lon,
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
            <div className="subheader">
              <h2>Energy Yield Estimation</h2>
            </div>
            {true ? (
              <Table size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Array</Table.HeaderCell>
                    <Table.HeaderCell># Units</Table.HeaderCell>
                    <Table.HeaderCell>
                      Installed Capacity [kWp]
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Specific Yield [kWh/kWp]
                    </Table.HeaderCell>
                    <Table.HeaderCell>Yearly Yield [kWh]</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {layouts.map((layout, i) => (
                    <Table.Row key={i}>
                      <Table.DataCell>{i + 1}</Table.DataCell>
                      <Table.DataCell>{layoutCounts[i]}</Table.DataCell>
                      <Table.DataCell>
                        {(0.2 * layoutCounts[i]).toFixed(1)}
                      </Table.DataCell>
                      <Table.DataCell>{apiData.toFixed(1)}</Table.DataCell>
                      <Table.DataCell>
                        {(apiData * 0.2 * layoutCounts[i]).toFixed(1)}
                      </Table.DataCell>
                    </Table.Row>
                  ))}
                  <Table.Row>
                    <Table.DataCell>Total</Table.DataCell>
                    <Table.DataCell>{nUnits}</Table.DataCell>
                    <Table.DataCell>
                      {(apiData * nUnits).toFixed(2)}
                    </Table.DataCell>
                    <Table.DataCell>
                      {(apiData * 0.2).toFixed(2)}
                    </Table.DataCell>
                    <Table.DataCell>
                      {(apiData * 0.2 * nUnits).toFixed(2)}
                    </Table.DataCell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ) : (
              <p>Loading...</p>
            )}
            <div className="subheader">
              <h2>Bill Of Materials</h2>
            </div>
            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Array</Table.HeaderCell>
                  <Table.HeaderCell>Main Orientation</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Units</Table.HeaderCell>
                  <Table.HeaderCell>Feet</Table.HeaderCell>
                  <Table.HeaderCell>Cable Trays</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {layouts.map((layout, i) => (
                  <Table.Row key={i}>
                    <Table.DataCell>{i + 1}</Table.DataCell>
                    <Table.DataCell>{arrayOrient}</Table.DataCell>{" "}
                    {/* Assuming azimuth is the main orientation */}
                    <Table.DataCell>VPV Unit model</Table.DataCell>{" "}
                    {/* Replace with the actual type */}
                    <Table.DataCell>{layoutCounts[i]}</Table.DataCell>
                    <Table.DataCell>{totCount(layout)}</Table.DataCell>
                    <Table.DataCell>{cableCount(layout)}</Table.DataCell>
                  </Table.Row>
                ))}
                <Table.Row>
                  <Table.DataCell>Total</Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                  <Table.DataCell></Table.DataCell>
                  <Table.DataCell>{nUnits}</Table.DataCell>
                  <Table.DataCell>
                    {layouts.reduce((acc, layout) => {
                      return acc + totCount(layout);
                    }, 0)}
                  </Table.DataCell>
                  <Table.DataCell>
                    {layouts.reduce((acc, layout) => {
                      return acc + cableCount(layout);
                    }, 0)}
                  </Table.DataCell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className="subheader">
              <h2>Layouts</h2>
            </div>
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
          </div>
          {screenshotTransparent && screenshotOpaque && (
            <div className="dlButtonContainer">
              <Button variant="primary" onClick={handleDownload}>
                Download imgs
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import "../css/results.css";

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
    layouts.push(JSON.parse(sessionStorage.getItem(`layout${i}`)));
  }
  const address = sessionStorage.getItem("address");
  const info = sessionStorage.getItem("info");
  const lat = sessionStorage.getItem("lat");
  const lon = sessionStorage.getItem("lon");
  const azimuth = sessionStorage.getItem("azimuth") || 0;
  const imgurl = sessionStorage.getItem("imgurl");
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://vpv-planner.vercel.app/api/pvcalc.js?lat=${lat}&lon=${lon}&peakpower=${1}&loss=${14}&azimuth=${azimuth}`
        );
        console.log("Raw response:", response.json());
        if (
          response.ok &&
          response.headers.get("content-type").includes("json")
        ) {
          const data = await response.json();
          setApiData(data);
        } else {
          console.log("API request failed or returned non-JSON response");
        }
      } catch (error) {
        console.log("API request failed:", error);
      }
    };

    fetchData();
  }, [lat, lon, azimuth, apiData]);

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
            <ul>
              <li>Project Name: {projectName}</li>
              <li>Project Number: {projectNumber}</li>
              <li>Installer: {installer}</li>
              <li>PN Installer: {PNinstaller}</li>
              <li>End Customer: {EndCostumer}</li>
              <li>Project Number EC: {projectNumberEC}</li>
              <li>Sections: {sections}</li>
              <li>Grids: {grids}</li>
              {layouts.map((layout, i) => (
                <li key={i}>
                  Layout{i}: {JSON.stringify(layout)}
                </li>
              ))}
              <li>Address: {address}</li>
              {info !== "" && <li>Info: {info}</li>}
              <li>Lat: {lat}</li>
              <li>Lon: {lon}</li>
              <li>Azimuth: {azimuth}</li>
            </ul>
            <p>
              Api query to PVGIS with peakpower=1, loss=14, aspect=14 and values
              above:
            </p>
            {apiData ? (
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {imgurl && <img src={imgurl} alt="Uploaded" />}
        </div>
      </div>
    </>
  );
}

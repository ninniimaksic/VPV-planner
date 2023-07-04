import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
// import ProjectInfo from "./Komponenter/ProjectInfo";
// import UnitPlacer from "./Komponenter/UnitPlacer";

export default function Results() {
  const projectName = sessionStorage.getItem("projectName");
  const projectNumber = sessionStorage.getItem("projectNumber");
  const installer = sessionStorage.getItem("installer");
  const PNinstaller = sessionStorage.getItem("PNinstaller");
  const EndCostumer = sessionStorage.getItem("EndCostumer");
  const projectNumberEC = sessionStorage.getItem("projectNumberEC");
  const sections = sessionStorage.getItem("sections");
  const address = sessionStorage.getItem("address");
  const info = sessionStorage.getItem("info");
  const lat = sessionStorage.getItem("lat");
  const lon = sessionStorage.getItem("lon");
  const azimuth = sessionStorage.getItem("azimuth");
  const imgurl = sessionStorage.getItem("imgurl");
  useEffect(() => {
    // Do something with the retrieved data
    console.log("Project Name:", projectName);
    console.log("Project Number:", projectNumber);
    console.log("Installer:", installer);
    console.log("PN Installer:", PNinstaller);
    console.log("End Customer:", EndCostumer);
    console.log("Project Number EC:", projectNumberEC);
    console.log("Sections:", sections);
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
            <p>Project Name: {projectName}</p>
            <p>Project Number: {projectNumber}</p>
            <p>Installer: {installer}</p>
            <p>PN Installer: {PNinstaller}</p>
            <p>End Customer: {EndCostumer}</p>
            <p>Project Number EC: {projectNumberEC}</p>
            <p>Sections: {sections}</p>
            <p>Address: {address}</p>
            <p>Info: {info}</p>
            <p>Lat: {lat}</p>
            <p>Lon: {lon}</p>
            <p>Azimuth: {azimuth}</p>
            <p>Imgurl: {imgurl}</p>
            <img ref={imgurl} alt="Uploaded" />
          </div>
        </div>
      </div>
    </>
  );
}

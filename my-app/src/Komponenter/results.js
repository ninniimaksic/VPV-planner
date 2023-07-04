import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
// import ProjectInfo from "./Komponenter/ProjectInfo";
// import UnitPlacer from "./Komponenter/UnitPlacer";

export default function Results() {
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve data from sessionStorage
    const projectName = sessionStorage.getItem("projectName");
    const projectNumber = sessionStorage.getItem("projectNumber");
    const installer = sessionStorage.getItem("installer");
    const PNinstaller = sessionStorage.getItem("PNinstaller");
    const EndCostumer = sessionStorage.getItem("EndCostumer");
    const projectNumberEC = sessionStorage.getItem("projectNumberEC");
    const sections = sessionStorage.getItem("sections");

    // Do something with the retrieved data
    console.log("Project Name:", projectName);
    console.log("Project Number:", projectNumber);
    console.log("Installer:", installer);
    console.log("PN Installer:", PNinstaller);
    console.log("End Customer:", EndCostumer);
    console.log("Project Number EC:", projectNumberEC);
    console.log("Sections:", sections);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Results</h1>
          </div>
        </div>
      </div>
    </>
  );
}

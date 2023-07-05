import React, { useState, useEffect } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import "../css/ProjectInfo.css";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Pagination } from "@navikt/ds-react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const ProjectInfo = () => {
  const [projectName, setProjectName] = useState(
    sessionStorage.getItem("projectName") || ""
  );
  const [projectNumber, setProjectNumber] = useState(
    sessionStorage.getItem("projectNumber") || ""
  );
  const [partner, setPartner] = useState(
    sessionStorage.getItem("installer") || ""
  );
  const [PNinstaller, setPNinstaller] = useState(
    sessionStorage.getItem("PNinstaller") || ""
  );
  const [EndCostumer, setEndCostumer] = useState(
    sessionStorage.getItem("EndCostumer") || ""
  );
  const [projectNumberEC, setProjectnumberEC] = useState(
    sessionStorage.getItem("projectNumberEC") || ""
  );
  const [pageState, setPageState] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("projectName", projectName);
    sessionStorage.setItem("projectNumber", projectNumber);
    sessionStorage.setItem("partner", partner);
    sessionStorage.setItem("PNinstaller", PNinstaller);
    sessionStorage.setItem("EndCostumer", EndCostumer);
    sessionStorage.setItem("projectNumberEC", projectNumberEC);

    const unloadListener = () => {
      sessionStorage.removeItem("projectName");
      sessionStorage.removeItem("projectNumber");
      sessionStorage.removeItem("partner");
      sessionStorage.removeItem("PNinstaller");
      sessionStorage.removeItem("projectNumberEC");
      sessionStorage.removeItem("EndCostumer");
    };

    const handleUnload = () => {
      sessionStorage.removeItem("projectName");
      sessionStorage.removeItem("projectNumber");
      sessionStorage.removeItem("partner");
      sessionStorage.removeItem("PNinstaller");
      sessionStorage.removeItem("projectNumberEC");
      sessionStorage.removeItem("EndCostumer");
    };

    window.addEventListener("beforeunload", unloadListener);
    window.addEventListener("visibilitychange", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", unloadListener);
      window.removeEventListener("visibilitychange", handleUnload);
    };
  }, [
    projectName,
    projectNumber,
    partner,
    PNinstaller,
    EndCostumer,
    projectNumberEC,
  ]);

  const handleSave = () => {
    // Validering for tallfeltene
    const isValidNumber = (value) => {
      return value !== "" && !isNaN(value);
    };

    if (
      projectName === "" ||
      (isValidNumber(projectNumber) &&
        isValidNumber(PNinstaller) &&
        isValidNumber(projectNumberEC))
    ) {
      if (projectName === "") {
        setProjectName("Project");
      }
      if (projectNumber === "") {
        setProjectNumber("1");
      }
      if (partner === "") {
        setPartner("");
      }
      if (PNinstaller === "") {
        setPNinstaller("1");
      }
      if (EndCostumer === "") {
        setEndCostumer("1");
      }
      if (projectNumberEC === "") {
        setProjectnumberEC("1");
      }

      console.log(
        "Saving project name and number:",
        projectName,
        projectNumber
      );
      navigate("/geocode");
    } else {
      // Vis en feilmelding eller utfør en annen handling
      console.log("Vennligst fyll inn gyldige tallverdier.");
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <>
        <h1 className="centeredTitle"> I N F O R M A T I O N</h1>
        <div className="side-by-side">
          <div style={{ marginRight: "20px" }}>
            <h2>Project name</h2>
            <TextField
              description="Name on the cover of the report"
              id="projectname"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <h2>Project number(Over Easy)</h2>
            <TextField
              description="Her kommer det noe viktig info"
              id="Projectnumber"
              value={projectNumber}
              onChange={(e) => setProjectNumber(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
        </div>
        <div className="side-by-side2">
          <div style={{ marginRight: "20px" }}>
            <h2>Installer</h2>
            <TextField
              description="Name on the cover of the report"
              id="Partner"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <h2>Project number(installer)</h2>
            <TextField
              description="Her kommer det noe viktig info"
              id="PNinstaller"
              value={PNinstaller}
              onChange={(e) => setPNinstaller(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
        </div>
        <div className="side-by-side3">
          <div style={{ marginRight: "20px" }}>
            <h2>End customer</h2>
            <TextField
              description="Name on the cover of the report"
              id="EndCostumer"
              value={EndCostumer}
              onChange={(e) => setEndCostumer(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <h2>Project number(end customer)</h2>
            <TextField
              description="Her kommer det noe viktig info"
              id="ProjectnumberEC"
              value={projectNumberEC}
              onChange={(e) => setProjectnumberEC(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
        </div>
        <div className="container">
          <Button classname="NesteKnapp" variant="primary" onClick={handleSave}>
            <span className="next-button-content">
              Next page
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
        <Pagination
          className="pagination-container"
          page={pageState}
          onPageChange={(x) => setPageState(x)}
          count={5}
          boundaryCount={1}
          siblingCount={1}
          size="medium"
        />
      </>
      <br /> <br />
      <br></br>
    </>
  );
};

export default ProjectInfo;

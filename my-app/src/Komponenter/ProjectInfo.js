import React, { useState, useEffect } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import "../css/ProjectInfo.css";
import { ArrowRightIcon } from "@navikt/aksel-icons";

import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import StepperInd from "./Stepper";

const ProjectInfo = () => {
  const [projectName, setProjectName] = useState(
    sessionStorage.getItem("projectName") || ""
  );
  const [projectNumber, setProjectNumber] = useState(
    sessionStorage.getItem("projectNumber") || ""
  );
  const [installer, setInstaller] = useState(
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
    sessionStorage.setItem("projectName", projectName || "New Project");
    sessionStorage.setItem("projectNumber", projectNumber || 1);
    sessionStorage.setItem("installer", installer);
    sessionStorage.setItem("PNinstaller", PNinstaller);
    sessionStorage.setItem("EndCostumer", EndCostumer);
    sessionStorage.setItem("projectNumberEC", projectNumberEC);

    const unloadListener = () => {
      sessionStorage.removeItem("projectName");
      sessionStorage.removeItem("projectNumber");
      sessionStorage.removeItem("installer");
      sessionStorage.removeItem("PNinstaller");
      sessionStorage.removeItem("projectNumberEC");
      sessionStorage.removeItem("EndCostumer");
    };

    const handleUnload = () => {
      sessionStorage.removeItem("projectName");
      sessionStorage.removeItem("projectNumber");
      sessionStorage.removeItem("installer");
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
    installer,
    PNinstaller,
    EndCostumer,
    projectNumberEC,
  ]);

  const handleSave = () => {
    if (projectName === "") {
      setProjectName("Project");
    }
    if (projectNumber === "") {
      setProjectNumber("");
    }
    if (installer === "") {
      setInstaller("");
    }
    if (PNinstaller === "") {
      setPNinstaller("");
    }
    if (EndCostumer === "") {
      setEndCostumer("");
    }
    if (projectNumberEC === "") {
      setProjectnumberEC("");
    }

    console.log("Saving project name and number:", projectName, projectNumber);
    setPageState((prev) => prev + 1);
    navigate("/photoimport");
  };

  return (
    <>
      <Navbar />
      <StepperInd currentStep={1} />
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
              type="text"
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
              id="installer"
              value={installer}
              onChange={(e) => setInstaller(e.target.value)}
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
      </>
      <br /> <br />
      <br></br>
    </>
  );
};

export default ProjectInfo;

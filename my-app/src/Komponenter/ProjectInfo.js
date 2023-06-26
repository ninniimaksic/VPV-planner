import React, { useState } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import "../css/ProjectInfo.css";
import Geocode from "./Geocode";
import { ArrowRightIcon } from "@navikt/aksel-icons";

const ProjectInfo = () => {
  const [projectName, setProjectName] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [installer, setInstaller] = useState("");
  const [PNinstaller, setPNinstaller] = useState("");
  const [EndCostumer, setEndCostumer] = useState("");
  const [projectNumberEC, setProjectnumberEC] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleSave = () => {
    if (projectName === "") {
      setProjectName("Project");
    }
    if (projectNumber === "") {
      setProjectNumber("1");
    }
    if (installer === "") {
      setInstaller("");
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

    console.log("Saving project name and number:", projectName, projectNumber);
    setShowInput(false);
  };

  return (
    <>
      <br />
      {showInput ? (
        <>
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
                id="installer"
                value={installer}
                onChange={(e) => setProjectName(e.target.value)}
                style={{ flex: "1" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h2>Project number(installer)</h2>
              <TextField
                description="Her kommer det noe viktig info"
                id="PNinstaller"
                value={PNinstaller}
                onChange={(e) => setProjectNumber(e.target.value)}
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
                onChange={(e) => setProjectName(e.target.value)}
                style={{ flex: "1" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <h2>Project number(end customer)</h2>
              <TextField
                description="Her kommer det noe viktig info"
                id="ProjectnumberEC"
                value={projectNumberEC}
                onChange={(e) => setProjectNumber(e.target.value)}
                style={{ flex: "1" }}
              />
            </div>
          </div>
          <div className="container">
            <Button
              classname="NesteKnapp"
              variant="primary"
              onClick={handleSave}
            >
              <span className="next-button-content">
                Neste side
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="info">
            <h2>
              Project information: {projectName} {projectNumber}{" "}
            </h2>
          </div>
          <Geocode />
        </>
      )}
      <br /> <br />
      <br></br>
    </>
  );
};

export default ProjectInfo;

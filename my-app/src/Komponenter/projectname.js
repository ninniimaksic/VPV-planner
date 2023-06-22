import React, { useState } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import Imgscale from "./Geocode";

const ProjectName = () => {
  const [projectName, setProjectName] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleSave = () => {
    console.log("Lagrer prosjektnavnet:", projectName);
    setShowInput(false);
  };

  return (
    <>
      <br />
      {showInput ? (
        <>
          <h2>Project name</h2>
          <div
            class="projectnamesbox"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <TextField
              id="projectname"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ flex: "1" }}
            />
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <h2>Project name: {projectName}</h2>
      )}
      <br /> <br />
      <Imgscale />
      <br></br>
    </>
  );
};

export default ProjectName;

import React, { useState } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";
import Imgscale from "./Geocode";

const ProjectName = () => {
  const [projectName, setProjectName] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleSave = () => {
    // Lagre verdien i console log også, kun for test
    console.log("Lagrer prosjektnavnet:", projectName);
    // Skjuler inputfeltet og knappen etter lagring
    //hvis true så hvises den
    setShowInput(false);
  };

  return (
    <>
      <br />
      {showInput ? (
        <>
          <h2>Project name</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TextField
              id="c"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ flex: "1" }}
            />
            <Button variant="secondary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <h2>
          Project name: {projectName} <br /> <br /> <Imgscale />;
        </h2>
      )}
    </>
  );
};

export default ProjectName;

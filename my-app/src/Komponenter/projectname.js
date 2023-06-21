import React, { useState } from "react";
import { TextField, Button } from "@navikt/ds-react";
import "@navikt/ds-css";

const ProjectName = () => {
  const [projectName, setProjectName] = useState("");

  const handleSave = () => {
    // Lagre verdien i et eller annet
    console.log("Lagrer prosjektnavnet:", projectName);
  };

  return (
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
  );
};

export default ProjectName;

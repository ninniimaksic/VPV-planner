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
    <div>
      <TextField
        id="c"
        label="Project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Button variant="secondary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default ProjectName;

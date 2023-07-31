import React from "react";
import { Button } from "@navikt/ds-react";
import "../css/Landingsside.css";
import ProjectInfo from "./ProjectInfo";
import { useNavigate } from "react-router-dom";

function Landingsside() {
  const navigate = useNavigate();
  const handleNewProjectClick = () => {
    navigate("/Projectinfo");
  };
  return (
    <div className="center">
      <div className="Nyttprosjekt">
        <Button className="btn-new" onClick={handleNewProjectClick}>
          New project
        </Button>
      </div>
      <div className="Prosjekter">
        <Button variant="primary" className="btn-new1">
          Projects
        </Button>
      </div>
    </div>
  );
}

export default Landingsside;

import React, { useState, useEffect } from "react";
import { Button } from "@navikt/ds-react";
import "../css/Landingsside.css";
import ProjectInfo from "./ProjectInfo";
import { useNavigate } from "react-router-dom";

import {
  getSessionStorageAll,
  getUnitCount,
  fetchEnergyYield,
  fetchProjectsFromDB,
  fetchImage,
} from "./storageUtils";

function Home() {
  const [projects, setProjects] = useState([]);
  const [projectImgs, setProjectImgs] = useState([]);
  const navigate = useNavigate();
  const handleNewProjectClick = () => {
    sessionStorage.clear();
    navigate("/Projectinfo");
  };
  const handleContinue = () => {
    navigate("/projectinfo");
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectsFromDB();
      setProjects(data);
      const images = {};
      for (const project of data) {
        const img = await fetchImage(project.img_path);
        images[project.id] = img;
      }
      setProjectImgs(images);
    };
    fetchData();
  }, []);
  const isproject = sessionStorage.getItem("imgurl");
  return (
    <div className="Home">
      <div className="center">
        {isproject && (
          <div className="Prosjekter">
            <Button
              variant="primary"
              className="btn-new1"
              onClick={handleContinue}
            >
              Continue project
            </Button>
          </div>
        )}
        <div className="Nyttprosjekt">
          <Button className="btn-new" onClick={handleNewProjectClick}>
            New project
          </Button>
        </div>
      </div>
      <div className="ProjectList">
        <h1>Projects</h1>
        {projects.map((project) => (
          <div className="Prosjekter">
            <h3>Project nr{project.id}</h3>
            <img
              src={projectImgs[project.id]}
              alt={`Project ${project.id}`}
              style={{ height: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

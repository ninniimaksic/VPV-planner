import "../css/App.css";
import React from "react";
import PhotoImport from "./PhotoImport";
import Navbar from "./navbar.js";
import Table from "./Table";
import ProjectName from "./projectname";

const App = () => {
  return (
    <>
      <Navbar />
      <ProjectName />
    </>
  );
};

export default App;

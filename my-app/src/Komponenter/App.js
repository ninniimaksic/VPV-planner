import { Routes, Route } from "react-router-dom";
import "../css/App.css";
import React from "react";
import Forside from "./Forside";
import Compass from "./Compass";
import Geocode from "./Geocode";
import Navbar from "./navbar";
import PhotoImport from "./PhotoImport";
import ProjectInfo from "./ProjectInfo";
import RoofOutline from "./RoofOutline";
import SetScale from "./SetScale";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="compass" element={<Compass />} />
        <Route path="geocode" element={<Geocode />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="photoimport" element={<PhotoImport />} />
        <Route path="projectinfo" element={<ProjectInfo />} />
        <Route path="roofoutline" element={<RoofOutline />} />
        <Route path="SetScale" element={<SetScale />} />
      </Routes>
    </div>
  );
}

export default App;

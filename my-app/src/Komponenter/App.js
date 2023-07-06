import { Routes, Route } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import "../css/App.css";
import React from "react";
import Forside from "./Forside";
import Compass from "./Compass";
import Geocode from "./Geocode";
import PhotoImport from "./PhotoImport";
import ProjectInfo from "./ProjectInfo";
import RoofOutline from "./RoofOutline";
import SetScale from "./SetScale";
import Results from "./results";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="compass" element={<Compass />} />
        <Route path="geocode" element={<Geocode />} />
        <Route path="photoimport" element={<PhotoImport />} />
        <Route path="projectinfo" element={<ProjectInfo />} />
        <Route path="roofoutline" element={<RoofOutline />} />
        <Route path="SetScale" element={<SetScale />} />
        <Route path="results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;

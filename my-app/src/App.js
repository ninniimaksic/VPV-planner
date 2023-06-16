import "./App.css";
import React from "react";
import PhotoImport from "./PhotoImport";
import Navbar from "./navbar.js";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="App">
        <PhotoImport />
      </div>
    </>
  );
};

export default App;

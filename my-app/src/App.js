import "./App.css";
import React from "react";
import PhotoImport from "./PhotoImport";
import Navbar from "./navbar.js";
import Table from "./Table";

const App = () => {
  let component = <PhotoImport />;
  if (window.location.pathname === "/module3") {
    component = <Table />;
  }
  return (
    <>
      <Navbar />

      <div className="App">{component}</div>
    </>
  );
};

export default App;

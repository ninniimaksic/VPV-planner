import React from "react";
import ReactDOM from "react-dom";

import Geocode from "./Geocode";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <h2> Viktig informasjon som du må fylle ut</h2>
    <Geocode />
  </React.StrictMode>,
  rootElement
);

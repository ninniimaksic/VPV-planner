import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../img/logo1.png";
import { LeaveIcon } from "@navikt/aksel-icons";
import { HouseHeartIcon } from "@navikt/aksel-icons";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();

  const handleLeaveIconClick = (e) => {
    // Check if the clicked element has the "leave-icon-hover" class
    if (e.target.classList.contains("leave-icon-hover")) {
      if (!window.confirm("Are you sure you want to cancel?")) {
        e.preventDefault();
      } else {
        // Perform any necessary actions before leaving here (if needed)
      }
    }
  };

  const handleMobileIconClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <div>
          <img src={logo1} alt="Logo" height="40px" width="150px" />
        </div>
        <h2>
          {sessionStorage.getItem("projectName")}
          {" - "}
          {sessionStorage.getItem("projectNumber")}
        </h2>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/home" className="icon-hover">
            <HouseHeartIcon
              title="a11y-title"
              fontSize="1.8rem"
              color="white"
            />
          </Link>

          <Link to="/" onClick={handleLeaveIconClick} className="no-hover-line">
            <LeaveIcon
              title="a11y-title"
              fontSize="1.8rem"
              color="white"
              className="leave-icon-hover"
            />
          </Link>
        </div>

        <div id="mobile" onClick={handleMobileIconClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

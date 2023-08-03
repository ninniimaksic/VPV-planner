import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../img/logo1.png";
import { LeaveIcon } from "@navikt/aksel-icons";

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
          <img src={logo1} alt="Logo" />
          <span>VPV Planner</span>
        </div>
        <h2>
          {sessionStorage.getItem("projectName")}
          {" - "}
          {sessionStorage.getItem("projectNumber")}
        </h2>
        <div>
          <ul id="navbar" className={clicked ? "navbar active" : "navbar"}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span> Projects</span>

              <Link to="/" onClick={handleLeaveIconClick}>
                <LeaveIcon
                  title="a11y-title"
                  fontSize="1.8rem"
                  color="white"
                  className="leave-icon-hover"
                />
              </Link>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleMobileIconClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

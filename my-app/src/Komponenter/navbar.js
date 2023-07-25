import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../img/logo1.png";
import { LeaveIcon } from "@navikt/aksel-icons";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();

  const handleLeaveIconClick = (e) => {
    if (!window.confirm("Are you sure you want to cancel?")) {
      e.preventDefault();
    } else {
    }
  };

  const handleMobileIconClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <Link to="/" className="navbar-logo">
          <img src={logo1} alt="Logo" />
        </Link>

        <div>
          <ul id="navbar" className={clicked ? "navbar active" : "navbar"}>
            <li>
              <Link
                className={location.pathname === "/" ? "active" : ""}
                to="/"
              >
                Old projects
              </Link>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleMobileIconClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <Link to="/" onClick={handleLeaveIconClick}>
          <LeaveIcon
            title="a11y-title"
            fontSize="1.5rem"
            color="white"
            className="leave-icon-hover"
          />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;

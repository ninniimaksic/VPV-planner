import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import logo1 from "../img/logo1.png";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();

  const handleClick = () => {
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

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

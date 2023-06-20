import { Component } from "react";
import Logo from "./Logo.png";
import "./navbar.css";
import Modul3 from "./Modul3.js";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <>
        <nav>
          <a href="index.html"></a>
          <img id="logo-image" src={Logo} alt="Logo" />

          <div>
            <ul
              id="navbar"
              className={this.state.clicked ? "#navbar active" : "#navbar"}
            >
              <li>
                <a classname="active" href="index.html">
                  Home{"                    "}
                </a>
              </li>
              <li>
                {" "}
                <a href="index.html">Modul 1 </a>
              </li>
              <li>
                {" "}
                <a href="index.html">Modul 2 </a>
              </li>
              <li>
                <a href="/module3">Modul 3 </a>
              </li>
            </ul>
          </div>
          <div id="mobile" on Click={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;

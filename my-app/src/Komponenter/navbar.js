import { Component } from "react";
import "../css/navbar.css";
import logo1 from "../img/logo1.png";

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <>
        <nav>
          <img src={logo1} alt="Logo" className="navbar-logo" />
          <a href="index.html"></a>

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

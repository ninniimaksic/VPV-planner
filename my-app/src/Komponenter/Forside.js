import React, { useState } from "react";
import ProjectInfo from "./ProjectInfo";
import { Button } from "@navikt/ds-react";
import { TextField } from "@navikt/ds-react";
import "../css/Forside.css";
import "../css/ProjectInfo.css";
import ForsideImg from "../img/Forsidebilde.png";

const Forside = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (password === "123456") {
      setLoggedIn(true);
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  if (loggedIn) {
    return <ProjectInfo />;
  }

  return (
    <>
      <h2 id="overskrift">Welcome</h2>
      <div className="login-container">
        <TextField
          type="password"
          label="Please enter your password below to access the system."
          value={password}
          onChange={handlePasswordChange}
          className="input-margin"
        />
        <Button
          id="login"
          variant="primary"
          onClick={handleLogin}
          className="button-margin"
        >
          Login
        </Button>
        <img
          src={ForsideImg}
          alt="description_of_the_image"
          className="image-bottom-left"
        />
      </div>
    </>
  );
};

export default Forside;

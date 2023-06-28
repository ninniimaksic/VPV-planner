import React, { useState } from "react";
import ProjectInfo from "./ProjectInfo";
import { Button, Alert } from "@navikt/ds-react";
import { TextField } from "@navikt/ds-react";
import "../css/Forside.css";
import "../css/ProjectInfo.css";
import ForsideImg from "../img/Forsidebilde.png";
import { useNavigate } from "react-router-dom";

const Forside = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "123456") {
      setLoggedIn(true);
      navigate("/projectinfo");
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <h2 id="overskrift">Welcome</h2>
      <div
        className="login-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          type="password"
          label="Please enter your password below to access the system."
          value={password}
          onChange={handlePasswordChange}
          className="input-margin"
        />
        {showError && (
          <Alert id="error" variant="error">
            Noe gikk galt! ikke riktig passord
          </Alert>
        )}
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

import React from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "../css/Forside.css";
import "../css/ProjectInfo.css";
import ForsideImg from "../img/Forsidebilde.png";
import { useNavigate } from "react-router-dom";

const Forside = () => {
  const navigate = useNavigate();

  const { event, session } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/Landingsside");
      }
    }
  );

  return (
    <>
      <h2 id="overskrift">Welcome</h2>
      <div
        className="login-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          redirectTo="http://localhost:3000/projectinfo"
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          localization={{
            variables: {
              forgotten_password: {
                link_text: "",
              },
              sign_up: {
                link_text: "",
              },
            },
          }}
        />
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

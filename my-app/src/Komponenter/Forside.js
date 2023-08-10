import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "../css/Forside.css";
import "../css/ProjectInfo.css";
import ForsideImg from "../img/Forsidebilde.png";
import { useNavigate } from "react-router-dom";

const Forside = () => {
  const navigate = useNavigate();
  let session = null;

  supabase.auth.getSession().then(async ({ data }) => {
    if (data) {
      session = data.session;
    }
  });

  supabase.auth.onAuthStateChange((event, _session) => {
    if (event === "SIGNED_IN" && !session && _session) {
      navigate("/Home");
    }
    session = _session;
  });

  useEffect(() => {
    if (session) {
      navigate("/Home");
    }
  }, [session, navigate]);

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
          redirectTo="/Home"
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

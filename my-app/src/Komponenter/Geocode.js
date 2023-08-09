import React, { useState, useEffect } from "react";
import "@navikt/ds-css";
import { Button, TextField } from "@navikt/ds-react";
import { useNavigate } from "react-router-dom";

const Geocode = () => {
  const [address, setAddress] = useState(
    sessionStorage.getItem("address") || ""
  );
  const [response, setResponse] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [info, setInfo] = useState(sessionStorage.getItem("info") || "");
  const [latLon, setLatLon] = useState({
    lat: sessionStorage.getItem("lat") || "",
    lon: sessionStorage.getItem("lon") || "",
  });

  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        const input = address.trim();
        if (input.includes(",")) {
          const [lat, lon] = input.split(",").map((s) => s.trim());
          if (!isNaN(lat) && !isNaN(lon)) {
            geocodeLatLon(lat, lon);
            return;
          }
        }
        geocodeAddress(input);
      }, 750)
    );

    return () => clearTimeout(typingTimeout);
  }, [address, info]);

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${address}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      setResponse(data[0]);
      setIsConfirmed(true);
      sessionStorage.setItem("lat", data[0].lat);
      sessionStorage.setItem("lon", data[0].lon);
      sessionStorage.setItem("FullAdr", JSON.stringify(data[0].address));
      console.log("Adr", data[0].address);
    } else {
      setResponse(null);
      setIsConfirmed(false);
      console.error("No data returned from geocoding API");
    }
  };

  const geocodeLatLon = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    if (data) {
      setResponse(data);
      setIsConfirmed(true);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      console.log("Adr", data);
    } else {
      setResponse(null);
      setIsConfirmed(false);
      console.error("No data returned from geocoding API");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("info", info);

    const unloadListener = () => {
      sessionStorage.removeItem("address");
      sessionStorage.removeItem("info");
    };

    const handleUnload = () => {
      sessionStorage.removeItem("address");
      sessionStorage.removeItem("info");
    };

    window.addEventListener("beforeunload", unloadListener);
    window.addEventListener("visibilitychange", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", unloadListener);
      window.removeEventListener("visibilitychange", handleUnload);
    };
  }, [address, info]);

  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    console.log(
      "Bekreft og lagre: Latitude:",
      response.lat,
      "Longitude:",
      response.lon
    );

    setIsSaved(true);
    setIsConfirmed(false);
    navigate("/photoimport"); // Navigate to the next page after saving
  };

  // const handleBackPage = () => {
  //   navigate("/projectinfo");
  // };

  return (
    <>
      <div className={"geocodeStyle"}>
        <div id="plassering">
          <form className="form-container">
            {/* <TextField
              label="Add additional information to the project"
              description="optional"
              id="info"
              name="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="input-field"
            /> */}
            <TextField
              label="Type in your address or lat,lon"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
              required
            />
            {response && response.address && isConfirmed && (
              <div>
                <br />
                <h4>Is this correct?</h4>
                <p>
                  Address: {response.address.road || "N/A"}{" "}
                  {response.address.house_number || "N/A"} {""}
                  {response.address.city || response.address.town || "N/A"}{" "}
                  {response.address.postcode || "N/A"}{" "}
                  {response.address.country || "N/A"}
                </p>
                <br />
                <p>
                  If it's not correct, please enter the city in the field above
                  or correct the lat/lon.
                </p>
                <br />
              </div>
            )}
            <br />
          </form>
        </div>
      </div>

      {/* <Button
        variant="secondary"
        className="back-button"
        onClick={handleBackPage}
      >
        <span className="back-button-content">
          <ArrowLeftIcon />
          Back page
        </span>
      </Button> */}
    </>
  );
};

export default Geocode;

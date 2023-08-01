import React, { useState, useEffect } from "react";
import "../css/Geocode.css";
import "@navikt/ds-css";
import { Button, TextField } from "@navikt/ds-react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@navikt/aksel-icons";
import { Pagination } from "@navikt/ds-react";

const Geocode = () => {
  const [address, setAddress] = useState(
    sessionStorage.getItem("address") || ""
  );
  const [response, setResponse] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [info, setInfo] = useState(sessionStorage.getItem("info") || "");

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${address}`
    );
    const data = await response.json();
    setResponse(data[0]);
    setIsConfirmed(true);
    sessionStorage.setItem("lat", data[0].lat);
    sessionStorage.setItem("lon", data[0].lon);
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

  const [pageState, setPageState] = useState(2);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() !== "") {
      geocodeAddress(address);
    }
  };

  const handleSave = () => {
    console.log(
      "Bekreft og lagre: Latitude:",
      response.lat,
      "Longitude:",
      response.lon
    );

    setIsSaved(true);
  };

  const handleNextPage = () => {
    navigate("/photoimport");
  };

  const handleBackPage = () => {
    navigate("/projectinfo");
  };

  const resetForm = () => {
    setAddress("");
    setResponse(null);
    setIsConfirmed(false);
    setIsSaved(false);
    setInfo("");
  };

  return (
    <>
      <Navbar />
      <React.Fragment>
        <Pagination
          className="pagination-container"
          page={pageState}
          onPageChange={(x) => setPageState(x)}
          count={5}
          boundaryCount={1}
          siblingCount={1}
          size="medium"
        />
        <h1>I N F O R M A T I O N - 2</h1> <br />
        <div className={"geocodeStyle"}>
          <div id="plassering">
            <form onSubmit={handleSubmit} className="form-container">
              <TextField
                required
                label="Type in your address and city"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-field"
              />
              <Button variant="primary" type="submit" className="submit-button">
                Check if it's the correct address
              </Button>
              {response && isConfirmed && (
                <div>
                  <br />
                  <h4>Is this correct</h4>
                  <p>
                    Adresse: {response.address.road}{" "}
                    {response.address.house_number || "N/A"} {""}
                    {response.address.city || response.address.town}{" "}
                    {response.address.postcode} {response.address.country}
                  </p>
                  <br />
                  <p>
                    If it's not correct, please enter the city in the field
                    above
                  </p>
                  <br />
                  {isSaved ? (
                    <div className="pop-up-container">
                      <TextField
                        label="Add additional information to the project"
                        description="optional"
                        id="info"
                        name="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        className="input-field"
                      />
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        style={{ display: isSaved ? "block" : "none" }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      style={{ display: isConfirmed ? "block" : "none" }}
                    >
                      Save & Confirm
                    </Button>
                  )}
                </div>
              )}
              <br />
            </form>
          </div>
        </div>
        {isSaved && (
          <Button
            variant="secondary"
            className="next-button"
            onClick={handleNextPage}
          >
            <span className="next-button-content">
              Next page
              <ArrowRightIcon />
            </span>
          </Button>
        )}
      </React.Fragment>

      <Button
        variant="secondary"
        className="back-button"
        onClick={handleBackPage}
      >
        <span className="back-button-content">
          <ArrowLeftIcon />
          Back
        </span>
      </Button>
    </>
  );
};

export default Geocode;

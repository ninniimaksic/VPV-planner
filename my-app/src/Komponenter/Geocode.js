import React, { useState } from "react";
import "../css/Geocode.css";
import "@navikt/ds-css";
import { Button, TextField } from "@navikt/ds-react";
import PhotoImport from "./PhotoImport";

const Geocode = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showPhotoImport, setShowPhotoImport] = useState(false); // Add state for displaying PhotoImport

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${address}`
    );
    const data = await response.json();
    setResponse(data[0]);
    setShowButton(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() !== "") {
      geocodeAddress(address);
    }
  };

  const handleConfirm = () => {
    console.log(
      "Bekreft og lagre: Latitude:",
      response.lat,
      "Longitude:",
      response.lon
    );
    setShowPhotoImport(true); // Display PhotoImport component after confirming
  };

  return (
    <div id="plassering">
      <form onSubmit={handleSubmit} className="form-container">
        <h3> Viktig info som må fylles ut</h3> <br />
        <TextField
          required
          label="Skriv inn adresse og by her:"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />
        <Button variant="primary" type="submit" className="submit-button">
          Sjekk
        </Button>
      </form>
      {response && (
        <div>
          <br />
          <h4>Er dette riktig?</h4>
          <p>
            Adresse: {response.address.road}{" "}
            {response.address.house_number || "N/A"} {""}
            {response.address.city || response.address.town}{" "}
            {response.address.postcode} {response.address.country}
          </p>
          <br></br>
          <p>Hvis det ikke er riktig, legg inn by i feltet over</p>
          <br></br>
          <Button
            variant="primary"
            onClick={handleConfirm}
            style={{ display: showButton ? "block" : "none" }}
          >
            Bekreft og lagre
          </Button>
        </div>
      )}
      <br />
    </div>
  );
};

export default Geocode;

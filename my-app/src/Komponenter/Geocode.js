import React, { useState } from "react";
import "../css/Geocode.css";
import "@navikt/ds-css";
import { Button, TextField } from "@navikt/ds-react";

const Geocode = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState(null);

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    const data = await response.json();
    setResponse(data[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() !== "") {
      geocodeAddress(address);
    }
  };

  return (
    <div id="plassering">
      <form onSubmit={handleSubmit} className="form-container">
        <h5> Viktig info som må fylles ut</h5> <br />
        <TextField
          required
          label="Skriv inn adressen din her:"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          description="Skriv inn adressen din, også byen etter."
          className="input-field"
        />
        <Button variant="primary" type="submit" className="submit-button">
          Lagre
        </Button>
      </form>
      {response && (
        <p>
          Lat: {response.lat}, Lon: {response.lon}
        </p>
      )}
      <br />
      {/* Resten av inputsfeltene plasseres her */}
    </div>
  );
};

export default Geocode;

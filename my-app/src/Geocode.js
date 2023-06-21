import React, { useState } from "react";
import "./App.css";

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

  return (
    <div id="plassering" style={{ width: "500px", height: "300px" }}>
      <h2> Viktig informasjon som du må fylle ut</h2>
      <label for="address">Adresse: </label>
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={() => geocodeAddress(address)}>Lagre</button>
      {response && (
        <p>
          Lat: {response.lat}, Lon: {response.lon}
        </p>
      )}
      <br />
      {/* resten av inputsfelene skal under her , men man skal ender layout ved å bruke komponenter*/}
    </div>
  );
};

export default Geocode;

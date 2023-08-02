// api/pvcalc.js
import axios from "axios";

export default async function handler(req, res) {
  const { lat, lon, azimuth, peakpower, loss } = req.query;

  try {
    const response = await axios.get(
      `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc`,
      {
        params: {
          outputformat: "json",
          lat,
          lon,
          peakpower,
          loss,
          angle: 90,
          aspect: (azimuth + 180) % 360,
        },
      }
    );

    // Return the API response data to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("API request failed:", error);
    res.status(500).json({ error: "API request failed" });
  }
}

export default async function handler(req, res) {
  const { lat, lon, azimuth, peakpower, loss } = req.query;

  const aspectCalc = (azimuth) => {
    let aspect = (parseInt(azimuth) + 180) % 360;
    if (aspect > 180) {
      aspect = aspect - 360;
    }
    return aspect;
  };

  try {
    const response = await fetch(
      `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?outputformat=json&lat=${lat}&lon=${lon}&peakpower=${peakpower}&loss=${loss}&angle=90&aspect=${aspectCalc(
        azimuth
      )}`
    );

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      console.log("API request failed");
      res.status(500).json({ error: "API request failed" });
    }
  } catch (error) {
    console.error("API request failed:", error);
    res.status(500).json({ error: "API request failed" });
  }
}

import React from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const getSessionStorageAll = () => {
  const projectName = sessionStorage.getItem("projectName");
  const projectNumber = sessionStorage.getItem("projectNumber");
  const installer = sessionStorage.getItem("installer");
  const PNinstaller = sessionStorage.getItem("PNinstaller");
  const EndCostumer = sessionStorage.getItem("EndCostumer");
  const projectNumberEC = sessionStorage.getItem("projectNumberEC");
  const sections = sessionStorage.getItem("sections");
  const grids = JSON.parse(sessionStorage.getItem("grids") || "[]");
  var layouts = [];
  for (let i = 0; i < grids.length; i++) {
    const layout = sessionStorage.getItem(`layout${i}`) || "[]";
    layouts.push(JSON.parse(layout));
  }
  const address = sessionStorage.getItem("address");
  const fullAdr = JSON.parse(sessionStorage.getItem("FullAdr"));
  const info = sessionStorage.getItem("info");
  const lat = sessionStorage.getItem("lat");
  const lon = sessionStorage.getItem("lon");
  const azimuth = (sessionStorage.getItem("azimuth") || 0) % 360;
  const kWp = 1;
  const loss = 14;
  const imgurl = sessionStorage.getItem("imgurl");
  const screenshotTransparent = sessionStorage.getItem("screenshotTransparent");
  const screenshotOpaque = sessionStorage.getItem("screenshotOpaque");

  return {
    projectName,
    projectNumber,
    installer,
    PNinstaller,
    EndCostumer,
    projectNumberEC,
    sections,
    grids,
    layouts,
    address,
    fullAdr,
    info,
    lat,
    lon,
    azimuth,
    kWp,
    loss,
    imgurl,
    screenshotTransparent,
    screenshotOpaque,
  };
};

export const getUnitCount = (layouts) => {
  // Count num of units in layout [1, 0] array
  return layouts.reduce((total, layout) => {
    return (
      total +
      layout.reduce((rowTotal, row) => {
        return (
          rowTotal +
          row.reduce((unitTotal, unit) => {
            return unitTotal + unit;
          }, 0)
        );
      }, 0)
    );
  }, 0);
};

export const fetchEnergyYield = async (lat, lon, azimuth, kWp, loss) => {
  // Fetch both sides, azimuth and azimuth - 180
  try {
    const response = await fetch(
      `https://vpv-planner.vercel.app/api/pvcalc.js?lat=${lat}&lon=${lon}&peakpower=${kWp}&loss=${loss}&azimuth=${azimuth}`
    );
    if (response.ok) {
      const body = await response.text();
      const data = JSON.parse(body);
      return data.outputs.totals.fixed.E_y;
    } else {
      console.log("API request failed or returned non-JSON response");
    }
  } catch (error) {
    console.log("API request failed:", error);
  }
};

export const getUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      return user.id;
    } else {
      return "";
    }
  } catch (e) {}
};

export const getUserEmail = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      return user.email;
    } else {
      return "";
    }
  } catch (e) {}
};

export const insertProjectToDB = async (data) => {
  const { data: response, error } = await supabase
    .from("projects")
    .insert(data);
  if (error) {
    console.log("Error inserting into Supabase", error);
    return null;
  }
  return response;
};

export const fetchProjectsFromDB = async () => {
  const email = await getUserEmail();
  console.log("email", email);
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("email", email);
  if (error) {
    console.log("Error fetching from Supabase", error);
    return null;
  }
  console.log("Fetch project success:", data);
  return data;
};

export async function uploadImage(file) {
  const uuid = uuidv4();
  const userId = await getUser();
  if (!userId) {
    console.log("Not logged in");
    return;
  }
  const { data, error } = await supabase.storage
    .from("roofs")
    .upload(`${userId}/${uuid}`, file);

  if (data) {
    console.log("Success!", data);
    sessionStorage.setItem("uuidImg", uuid);
  } else {
    console.log(error);
  }
}

export const fetchImage = async (uuid) => {
  const userId = await getUser();
  if (!userId) {
    console.log("Not logged in");
    return;
  }
  console.log("fetching image", userId, uuid);
  const { data, error } = await supabase.storage
    .from("roofs")
    .download(`${userId}/${uuid}`);
  if (data) {
    console.log("Success!", data);
    const blob = new Blob([data], { type: "image/png" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  } else {
    console.log(error);
  }
};

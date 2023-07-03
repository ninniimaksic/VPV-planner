import React, { createContext, useState } from "react";

export const CompassContext = createContext();

export const CompassProvider = ({ children }) => {
  const [compassValue, setCompassValue] = useState(0);

  return (
    <CompassContext.Provider value={{ compassValue, setCompassValue }}>
      {children}
    </CompassContext.Provider>
  );
};

// مسیر: src/contexts/RegistrationContext.js
import React, { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");

  return (
    <RegistrationContext.Provider
      value={{ phoneNumber, setPhoneNumber, nationalId, setNationalId }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

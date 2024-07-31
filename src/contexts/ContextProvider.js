// مسیر: src/contexts/ContextProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { RegistrationProvider } from "./RegistrationContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RegistrationProvider>{children}</RegistrationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default ContextProvider;

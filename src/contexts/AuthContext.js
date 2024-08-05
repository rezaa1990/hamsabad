// import React, { createContext, useContext, useState } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   let [role, setRole] = useState(); 
//   const login = (phoneNumber, password) => {
//     // در اینجا می‌توانید بررسی‌های واقعی احراز هویت را اضافه کنید
//     if (phoneNumber && password) {
//       setIsAuthenticated(true);
//     }
//     if (phoneNumber == 1) {
//       setRole("portfolioManager");
//     } else setRole("investor");
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

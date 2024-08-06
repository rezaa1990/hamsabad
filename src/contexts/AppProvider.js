import React, { useState } from "react";
import AppContext from "./AppContext";

function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [baskets, setBaskets] = useState([
    {
      id: 1,
      contractNumber: "CN-2023-001",
      InvestAmount: 1000000,
      status: "در انتظار بررسی",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
      approveDocSituation:"",
    },
    {
      id: 2,
      contractNumber: "CN-2023-002",
      InvestAmount: 2000000,
      status: "درخواست سند واریز",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
    },
    {
      id: 3,
      contractNumber: "CN-2023-003",
      InvestAmount: 3000000,
      status: "بررسی سند واریز",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "غیر مستقیم",
    },
    {
      id: 4,
      contractNumber: "CN-2023-004",
      InvestAmount: 4000000,
      status: "تایید",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
    },
    {
      id: 5,
      contractNumber: "CN-2023-005",
      InvestAmount: 5000000,
      status: "رد",
      investor: "سرمایه‌گذار 1",
      investorPhone: "09121234567",
      portfolioManager: "سبدگردان 1",
      portfolioManagerPhone: "09124681012",
      depositDate: "2024-08-04",
      paymentMethod: "مستقیم",
    },
  ]);

  const login = (phoneNumber, password) => {
    if (phoneNumber && password) {
      setIsAuthenticated(true);
      setRole(phoneNumber === "1" ? "portfolioManager" : "investor");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  const handleUpdateBasket = (id, updatedFields) => {
  setBaskets((prevBaskets) =>
    prevBaskets.map((basket) =>
      basket.id === id
        ? { ...basket, ...updatedFields }
        : basket
    )
  );
};



  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        login,
        logout,
        baskets,
        setBaskets,
        handleUpdateBasket,
        phoneNumber,
        setPhoneNumber,
        nationalId,
        setNationalId,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

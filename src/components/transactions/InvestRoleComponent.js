// src/components/transactions/InvestRoleComponent.js
import React,{useContext} from "react";
import InvestorIncreaseCapital from "./InvestorIncreaseCapital";
import PortfolioManagerIncreaseCapital from "./PortfolioManagerIncreaseCapital";
// import { useAuth } from "../../contexts/AuthContext";
// import { useBaskets } from "../../contexts/InvestmentContext";
import AppContext from "../../contexts/AppContext";

const InvestRoleComponent = () => {
   const {
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
   } = useContext(AppContext);
  
  // const { role } = useAuth();
  // console.log("InvestRoleComponent_role", role);
  // const { Baskets, handleUpdateBasket } = useBaskets();

  const renderComponentBasedOnRole = () => {
    switch (role) {
      case "investor":
        return (
          <InvestorIncreaseCapital
            // Baskets={Baskets}
            // onUpdateBasket={handleUpdateBasket}
          />
        );
      case "portfolioManager":
        return (
          <PortfolioManagerIncreaseCapital
            // Baskets={Baskets}
            // onUpdateBasket={handleUpdateBasket}
          />
        );
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default InvestRoleComponent;

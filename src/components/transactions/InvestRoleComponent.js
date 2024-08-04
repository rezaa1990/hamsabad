import React from "react";
import InvestorIncreaseCapital from "./InvestorIncreaseCapital";
import PortfolioManagerIncreaseCapital from "./PortfolioManagerIncreaseCapital";

const InvestRoleComponent = () => {
  const userRole = "portfolioManager";
  // const userRole = "investor";
  const renderComponentBasedOnRole = () => {
    switch (userRole) {
      case "investor":
        return <InvestorIncreaseCapital />;
      case "portfolioManager":
        return <PortfolioManagerIncreaseCapital />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default InvestRoleComponent;

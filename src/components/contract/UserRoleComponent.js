import Investor from "./Investor";
import  PortfolioManager  from "./PortfolioManager";

const UserRoleComponent = () => {
  // const userRole = "portfolioManager";
  const userRole = "investor";
  const renderComponentBasedOnRole = () => {
    switch (userRole) {
      case "investor":
        return <Investor />;
      case "portfolioManager":
        return <PortfolioManager />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return (
    <div className="">
      {renderComponentBasedOnRole()}
    </div>
  );
};

export default UserRoleComponent;

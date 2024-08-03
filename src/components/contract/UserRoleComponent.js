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
    <div className="user-role-container">
      <h2>پنل کاربری</h2>
      {renderComponentBasedOnRole()}
    </div>
  );
};

export default UserRoleComponent;

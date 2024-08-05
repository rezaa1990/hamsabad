import React from "react";
import InvestorIncreaseCapital from "./InvestorIncreaseCapital";
import PortfolioManagerIncreaseCapital from "./PortfolioManagerIncreaseCapital";

const InvestRoleComponent = () => {
  const userRole = "portfolioManager";
  // const userRole = "investor";

  const investments = [
    {
      id: 1,
      contractNumber: "CN-2023-001",
      amount: 1000000,
      status: "در انتظار تایید",
      investor: "سرمایه‌گذار 1",
      portfolioManager: "سبدگردان 1",
      depositDate: "2024-08-04",
      hasDocument: true,
      paymentMethod: "مستقیم",
      documentRequest: false,
    },
    {
      id: 2,
      contractNumber: "CN-2023-002",
      amount: 2500000,
      status: "تایید شده",
      investor: "سرمایه‌گذار 2",
      portfolioManager: "سبدگردان 1",
      depositDate: "2024-07-15",
      hasDocument: false,
      paymentMethod: "واریز به حساب",
      documentRequest: true,
    },
    {
      id: 3,
      contractNumber: "CN-2023-003",
      amount: 500000,
      status: "رد",
      investor: "سرمایه‌گذار 3",
      portfolioManager: "سبدگردان 1",
      depositDate: "2024-06-20",
      hasDocument: true,
      paymentMethod: "مستقیم",
      documentRequest: false,
    },
    {
      id: 3,
      contractNumber: "CN-2023-003",
      amount: 500000,
      status: "در انتظار تایید",
      investor: "سرمایه‌گذار ۴",
      portfolioManager: "سبدگردان 1",
      depositDate: "2024-06-20",
      hasDocument: true,
      paymentMethod: "مستقیم",
      documentRequest: false,
    },
  ];

  const renderComponentBasedOnRole = () => {
    switch (userRole) {
      case "investor":
        return <InvestorIncreaseCapital investments={investments} />;
      case "portfolioManager":
        return <PortfolioManagerIncreaseCapital investments={investments} />;
      default:
        return <p>نقش کاربر نامعتبر است</p>;
    }
  };

  return <div className="">{renderComponentBasedOnRole()}</div>;
};

export default InvestRoleComponent;

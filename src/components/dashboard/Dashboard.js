import React, { useState } from "react";
import * as icons from "../../assets/icons";
import { useTheme } from "../../contexts/ThemeContext";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  
  const menuItems = [
    { icon: icons.notes, label: "یادداشت" },
    { icon: icons.graf1, label: "بررسی شاخص" },
    { icon: icons.shoppingBasket, label: "سبدهای من" },
    { icon: icons.merchantPrograms, label: "بستن قرارداد" },
    { icon: icons.bell, label: "اعلان‌ها" },
    { icon: icons.messages, label: "پیام‌های من" },
    { icon: icons.pay1, label: "افزایش سرمایه" },
    { icon: icons.cash, label: "درخواست وجه" },
    { icon: icons.favorites, label: "علاقه‌مندی" },
    { icon: icons.kodal, label: "اخبار" },
    { icon: icons.txhistory, label: "تاریخچه معاملات" },
    { icon: icons.graf2, label: "بررسی سهم" },
  ];

  return (
    <div
      className={`font-sans ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen pb-20`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center space-x-4">
          <button className="text-2xl">🔍</button>
          <h1 className="text-xl font-bold">هم سبد</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-2xl">🛒</button>
          <button className="text-2xl">
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow-md`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className="object-contain w-12 h-12 mb-2"
            />
            <span className="text-sm text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

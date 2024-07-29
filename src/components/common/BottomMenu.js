import React, { useState } from "react";
import Icon from "./Icon";

const BottomMenu = ({ isDarkMode }) => {
  const [selectedItem, setSelectedItem] = useState("services"); // Default selected item

  const menuItems = [
    { icon: "services", label: "خدمات" },
    { icon: "mymessages", label: "پیام‌های من" },
    { icon: "mybaskets", label: "سبدهای من" },
    { icon: "share2", label: "معرفی به دوستان" },
    { icon: "favorites1", label: "علاقه مندی ها" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      } shadow-lg`}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center cursor-pointer"
          onClick={() => setSelectedItem(item.icon)}
        >
          <Icon name={item.icon} size={24} className="mb-1" />
          <span className="text-xs">{item.label}</span>
          <div
            className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out ${
              selectedItem === item.icon
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default BottomMenu;

import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import * as icons from "../../assets/icons";
import Sidebar from "../common/Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <header
        className={`flex justify-between items-center p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center space-x-4">
          <button className="ml-4 text-2xl" onClick={toggleSidebar}>
            <img
              src={icons.menubutton}
              alt={"menubutton"}
              className="object-contain w-12 h-12 mb-2"
            />
          </button>
          <img
            src={icons.hamsabad}
            alt={"hamsabad"}
            className="object-contain w-12 h-12 mb-2"
          />
        </div>
        <h1 className="text-xl font-extrabold">هم سبد</h1>
        <div className="flex items-center space-x-4">
          <button className="ml-4 text-2xl">
            <img
              src={icons.search}
              alt={"search"}
              className="object-contain w-12 h-12 mb-2"
            />
          </button>
        </div>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? " روشن" : " تاریک"}
        </button>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default Header;

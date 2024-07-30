import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <header className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="text-3xl font-bold">همسبد</div>
      <nav className="flex space-x-4">
        <a href="/" className="hover:text-gray-400">
          خانه
        </a>
        <a href="/dashboard" className="hover:text-gray-400">
          داشبورد
        </a>
        <a href="/profile" className="hover:text-gray-400">
          پروفایل
        </a>
        <a href="/logout" className="hover:text-gray-400">
          خروج
        </a>
      </nav>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "حالت روشن" : "حالت تاریک"}
      </button>
    </header>
  );
};

export default Header;

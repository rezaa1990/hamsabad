import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
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
    </header>
  );
};

export default Header;

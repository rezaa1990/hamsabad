import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen p-4 text-white bg-gray-700">
      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-gray-400">
          داشبورد
        </Link>
        <Link to="/contracts" className="block hover:text-gray-400">
          قراردادها
        </Link>
        <Link to="/transactions" className="block hover:text-gray-400">
          تراکنش‌ها
        </Link>
        <Link to="/profile" className="block hover:text-gray-400">
          پروفایل
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

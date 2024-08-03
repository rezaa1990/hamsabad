import React from "react";
import { Link } from "react-router-dom";
import * as icons from "../../assets/icons";
import { useTheme } from "../../contexts/ThemeContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 md:w-80 lg:w-96 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
        shadow-lg transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        z-50 overflow-y-auto`}
    >
      <div
        className={`flex items-center justify-between p-4 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } border-b`}
      >
        <div className="w-6 h-6"></div>
        <img src={icons.hamsabad} alt="هم‌سبد" className="w-12 h-12" />
        <button onClick={onClose} className="text-2xl">
          <img src={icons.arrowright} alt="بستن" className="w-4 h-6" />
        </button>
      </div>

      <div className="flex justify-center my-6">
        <img
          src={icons.profile}
          alt="تصویر پروفایل"
          className="w-20 h-20 rounded-full"
        />
      </div>

      <nav
        className="flex-grow p-4 space-y-4 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            nav::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <Link
          to="/profile"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.profile} alt="سامان کشوری" className="w-6 h-6" />
          <span>سامان کشوری</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/profile"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.profile} alt="پروفایل کاربری" className="w-6 h-6" />
          <span>پروفایل کاربری</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/services"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.services1} alt="خدمات" className="w-6 h-6" />
          <span>خدمات</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/my-baskets"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.shoppingBasket} alt="سبدهای من" className="w-6 h-6" />
          <span>سبدهای من</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/messages"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.messages} alt="پیام‌ها" className="w-6 h-6" />
          <span>پیام‌ها</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/contact"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img src={icons.contact} alt="ارتباط با ما" className="w-6 h-6" />
          <span>ارتباط با ما</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <Link
          to="/share"
          className="flex items-center space-x-2 space-x-reverse"
        >
          <img
            src={icons.share1}
            alt="اشتراک‌گذاری با دوستان"
            className="w-6 h-6"
          />
          <span>اشتراک‌گذاری با دوستان</span>
        </Link>
        <div
          className={`my-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-b`}
        ></div>
        <button className="flex items-center space-x-2 space-x-reverse text-red-600">
          <img
            src={icons.exit1}
            alt="خروج از حساب کاربری"
            className="w-6 h-6"
          />
          <span>خروج</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

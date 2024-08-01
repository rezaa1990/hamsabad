import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import * as icons from "../../assets/icons";

const UserProfile = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center space-x-4">
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
      </header>

      {/* Profile Form */}
      <main className="p-4 space-y-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">تنظیم پروفایل کاربری</h2>
        </div>

        <div className="flex justify-center">
          <div
            className={`w-24 h-24 rounded-lg ${
              isDarkMode ? "bg-gray-600" : "bg-gray-200"
            } flex items-center justify-center`}
          >
            <img src={icons.camera} alt="افزودن تصویر" className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">نام:</label>
            <p
              className={`w-full p-2 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              سامان
            </p>
          </div>
          <div>
            <label className="block mb-1">نام خانوادگی:</label>
            <p
              className={`w-full p-2 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              کشوری
            </p>
          </div>
          {/* اضافه کردن فیلدهای دیگر در صورت نیاز */}
        </div>

        {/* نقش من */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">نقش من</h3>
          <p
            className={`w-full p-2 rounded ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            سهامدار
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

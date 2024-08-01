import React, { useState } from "react";
import * as icons from "../../assets/icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const ContractForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } min-h-screen pb-20 pt-8 relative`}
    >
      <div
        className={`flex w-full m-4 text-lg font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <img
          onClick={handleBack}
          src={icons.arrowright}
          alt="Contract Icon"
          className="w-4 h-6 ml-3"
        />
        <span>بستن قرارداد</span>
        <div className="text-xl"></div>
      </div>

      {!showForm ? (
        <div
          className={`flex flex-col items-center w-full p-6 text-center border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-800"
          } cursor-pointer`}
          onClick={toggleForm}
        >
          <div className="mb-4">
            <img
              src={icons.contract}
              alt="Contract Icon"
              className="w-12 h-12"
            />
          </div>
          <span className="text-md">بستن قرارداد جدید</span>
        </div>
      ) : (
        <div
          className={`p-8 mx-auto border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-800"
          } rounded-lg max-w-xl`}
        >
          <div
            className={`flex items-center justify-between mb-8 text-sm border-b pb-4 ${
              isDarkMode
                ? "text-white border-gray-600"
                : "text-gray-800 border-gray-300"
            }`}
          >
            <span>شماره قرارداد:</span>
            <span>عدد تولید شده نرم‌افزار:</span>
          </div>

          {/* اطلاعات سرمایه گذار */}
          <div className="relative p-4 mb-8 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800"
              }`}
            >
              اطلاعات سرمایه گذار
            </div>
          </div>

          {/* اطلاعات قرارداد */}
          <div className="relative p-4 mb-8 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800"
              }`}
            >
              اطلاعات قرارداد
            </div>
          </div>

          {/* تبصره‌های اختیاری قرارداد */}
          <div className="relative p-4 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800"
              }`}
            >
              تبصره‌های اختیاری قرارداد
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractForm;

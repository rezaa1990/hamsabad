import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";

const Captcha = ({ onClose, onSubmit }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
    login,
    logout,
    baskets,
    setBaskets,
    handleUpdateBasket,
    phoneNumber,
    setPhoneNumber,
    nationalId,
    setNationalId,
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
  } = useContext(AppContext);

  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!captchaInput) {
      setError("لطفا عبارت امنیتی را وارد کنید");
    } else {
      onSubmit(captchaInput);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className={`w-full max-w-md p-4 rounded-lg shadow-lg border ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        <div className="flex justify-end mb-4">
          <Icon
            name="exit"
            size={24}
            className={`cursor-pointer ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            onClick={onClose}
          />
        </div>

        <div
          className={`mb-4 border rounded-lg ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <div className="py-2 font-bold text-center">کپچا</div>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="لطفا عبارت امنیتی را وارد نمایید"
            className={`w-full py-2 px-4 pl-10 border rounded-lg text-right placeholder-gray-400 ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setError("");
            }}
          />
          <Icon
            name="eye"
            size={20}
            className={`absolute transform -translate-y-1/2 left-3 top-1/2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className={`w-1/2 mx-auto block px-4 py-2 font-bold text-white rounded-lg ${
            isDarkMode ? "bg-green-600" : "bg-[#1BBF89]"
          }`}
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

export default Captcha;

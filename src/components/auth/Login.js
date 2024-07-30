import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import Icon from "../common/Icon";

const Login = () => {
  const { isDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const bottomIcons = [
    { name: "exit", label: "خروج" },
    { name: "contact", label: "ارتباط با ما" },
    { name: "emk", label: "امکانات من" },
    { name: "help", label: "راهنما" },
  ];

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    setError("");
    if (phoneNumber.trim() === "" || password.trim() === "") {
      setError("لطفا شماره تلفن و رمز عبور را وارد کنید.");
      return;
    }

    // اگر هر دو فیلد پر شده باشند، کاربر را به عنوان احراز هویت شده در نظر می‌گیریم
    login(phoneNumber, password);
    navigate("/dashboard");
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } w-full`}
    >
      <div
        className={`mb-8 relative w-full ${
          isDarkMode ? "bg-blue-600" : "bg-blue-500"
        } h-40 py-2 my-4 flex flex-col items-center`}
      >
        <h1
          className={`text-2xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          نرم افزار مدیریتی هم سبد
        </h1>
        <div className="relative mt-2">
          <Icon
            name="hamsabad"
            size={150}
            className="text-white transform translate-y-6"
          />
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <h2 className="mb-6 text-xl font-semibold text-center">ورود</h2>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <div
          className={`mb-4 relative border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-400 bg-gray-100"
          } rounded-lg`}
        >
          <label className="absolute text-sm right-3 top-2.5">
            شماره همراه
          </label>
          <input
            type="tel"
            placeholder="۰۹"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Icon
            name="mobile"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div
          className={`mb-4 relative border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-400 bg-gray-100"
          } rounded-lg`}
        >
          <label className="absolute text-sm right-3 top-2.5">رمز عبور</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••"
            className={`w-full py-2 pl-10 pr-3 rounded-lg text-left placeholder-right ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon
            name="lock"
            size={20}
            className="absolute text-gray-400 left-3 top-3"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="text-sm">
              مرا به خاطر بسپار
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-sm">
              نمایش رمز عبور
            </label>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={handleRegister}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-yellow-600 text-white"
                : "bg-yellow-500 text-gray-800"
            } w-[45%]`}
          >
            ثبت نام
          </button>
          <button
            onClick={handleLogin}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-gray-800"
            } w-[45%]`}
          >
            ورود
          </button>
        </div>

        <div className="mb-6 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            رمز عبور خود را فراموش کردید؟
          </a>
        </div>

        <div className="flex justify-between mt-6">
          {bottomIcons.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className={`p-2 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <Icon
                  name={item.name}
                  size={24}
                  className={isDarkMode ? "text-white" : "text-gray-800"}
                />
              </button>
              <span
                className={`text-sm mt-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;

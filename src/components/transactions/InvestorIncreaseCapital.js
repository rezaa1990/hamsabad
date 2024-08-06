import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import AppContext from "../../contexts/AppContext";

const InvestorIncreaseCapital = () => {
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
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(null);
  const [fileName, setFileName] = useState(""); // اضافه کردن state برای نام فایل

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const toggleForm = (id) => {
    setShowForm(showForm === id ? null : id);
  };

  const toggleModal = (id) => {
    setShowModal(showModal === id ? null : id);
  };

  const toggleDepositModal = (id) => {
    setShowDepositModal(showDepositModal === id ? null : id);
  };

  // تابع کمکی برای تعیین رنگ بر اساس وضعیت
  const getStatusColor = (status) => {
    switch (status) {
      case "در انتظار بررسی":
        return "bg-gray-300";
      case "درخواست سند واریز":
        return "bg-orange-300";
      case "بررسی سند واریز":
        return "bg-blue-300";
      case "تایید":
        return "bg-green-300";
      case "رد":
        return "bg-red-300";
      default:
        return "bg-white";
    }
  };

  const handleSubmitIncreaseCapital = (basketId, event) => {
    event.preventDefault();
    handleUpdateBasket(basketId, {
      status: "در انتظار بررسی",
      InvestAmount: 33000000,
    });
    toggleForm(null);
    alert("درخواست افزایش سرمایه با موفقیت ثبت شد.");
  };

  const handleSubmitDepositDocument = (basketId, event) => {
    event.preventDefault();
    handleUpdateBasket(basketId, {
      status: "بررسی سند واریز",
    });
    toggleDepositModal(null);
    alert("سند واریز با موفقیت ثبت شد.");
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full mb-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 mb-2">
          <div className="flex">
            <button
              onClick={handleNavigate}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Icon name="arrowright" size={16} className="ml-4" />
            </button>
            <span className="text-lg">افزایش سرمایه</span>
          </div>
        </div>
      </div>

      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="w-full mb-4 bg-white rounded-lg shadow-lg cursor-pointer"
          onClick={() => toggleDepositModal(basket.id)}
        >
          <div className="p-4">
            <div className={`p-4 rounded-lg ${getStatusColor(basket.status)}`}>
              <div className="mb-4 text-center">
                <span className="text-xl font-bold">شماره سبد</span>
                <div className="mt-2">{basket.contractNumber}</div>
                <span className="flex justify-end">وضعیت: {basket.status}</span>
              </div>

              <div className="flex mb-4">
                <span>سبدگردان: {basket.portfolioManager}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>میزان سرمایه: {basket.InvestAmount} ریال</span>
                <div className="flex">
                  <button className="p-2 bg-gray-200">
                    <Icon
                      name="messages2"
                      size={20}
                      className="text-gray-600"
                    />
                  </button>
                  <button className="p-2 bg-gray-200">
                    <Icon name="call" size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-200">
                    <Icon name="eye" size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span></span>
                <div className="flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleForm(basket.id);
                    }}
                    className=""
                  >
                    <Icon className="mx-1" name="dollar" size={30} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModal(basket.id);
                    }}
                    className=""
                  >
                    <Icon className="mx-1" name="capital" size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showForm === basket.id && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex mb-4">
                  <button
                    onClick={() => toggleForm(basket.id)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <Icon name="arrowright" size={16} className="ml-4" />
                  </button>
                  <h2 className="text-xl font-bold ">درخواست افزایش سرمایه:</h2>
                </div>
                <form
                  onSubmit={(e) => handleSubmitIncreaseCapital(basket.id, e)}
                >
                  <div className="mb-4">
                    <label className="block mb-2">مبلغ:</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        defaultValue={basket.InvestAmount}
                      />
                      <span className="mr-2">ریال</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">تاریخ:</label>
                    <DatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      calendar={persian}
                      locale={persian_fa}
                      className=""
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="ml-2" />
                      واریز به صورت مستقیم
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="ml-2" />
                      واریز به حساب کارگزاری
                    </label>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-green-500 rounded-lg"
                    >
                      ثبت درخواست افزایش سرمایه
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showModal === basket.id && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">قیمت افزایش سرمایه</h2>
                <p>مبلغ سرمایه‌گذاری: {basket.InvestAmount} ریال</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => toggleModal(basket.id)}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDepositModal === basket.id &&
            basket.status === "درخواست سند واریز" && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-w-md p-8 mx-auto bg-gray-200 shadow-lg">
                  <div className="flex mb-4">
                    <button
                      onClick={() => toggleDepositModal(null)}
                      className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                      <Icon name="arrowright" size={16} className="ml-4" />
                    </button>
                    <h2 className="text-xl font-bold ">ثبت سند واریز:</h2>
                  </div>
                  <form
                    onSubmit={(e) => handleSubmitDepositDocument(basket.id, e)}
                  >
                    <div className="mb-4">
                      
                      <input value={""} className="p-16"/>
                      
                      <div className="flex justify-center">
                        <label
                          htmlFor="file-upload"
                          className="px-2 py-1 mt-1 text-white bg-blue-500 rounded cursor-pointer"
                        >
                          انتخاب سند
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                        {/* <span className="ml-2 text-gray-600">
                          {fileName ? fileName : "فایلی انتخاب نشده"}
                        </span> */}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">توضیحات:</label>
                      <textarea
                        placeholder="نوشتن توضیحات"
                        className="w-full p-2 border"
                        rows="1"
                      ></textarea>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        type="submit"
                        className="px-8 py-1 text-white bg-red-500"
                      >
                        رد
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-1 text-white bg-green-500"
                      >
                        ثبت
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default InvestorIncreaseCapital;

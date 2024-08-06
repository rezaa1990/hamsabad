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
  const [fileName, setFileName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [showBasketDetails, setShowBasketDetails] = useState(null);

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

  const toggleBasketDetails = (id) => {
    setShowBasketDetails(showBasketDetails === id ? null : id);
  };

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
      const file = event.target.files[0];
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
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
          className="w-full bg-white shadow-lg cursor-pointer"
          onClick={() => toggleDepositModal(basket.id)}
        >
          <div className="p-4">
            <div className={`p-4 ${getStatusColor(basket.status)}`}>
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
                  <button
                    className="p-2 bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBasketDetails(basket.id);
                    }}
                  >
                    <Icon name="eye" size={25} className="text-gray-600" />
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
                    {imagePreviewUrl && (
                      <div className="flex justify-center mt-6">
                        <img
                          src={imagePreviewUrl}
                          alt="تصویر انتخاب شده"
                          className="justify-center w-44 h-44"
                        />
                      </div>
                    )}
                    <div className="mb-2">
                      <div className="flex justify-center">
                        <label
                          htmlFor="file-upload"
                          className="px-2 py-1 mt-1 text-white bg-blue-500 cursor-pointer"
                        >
                          انتخاب سند
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="mb-">
                      <label className="block">توضیحات:</label>
                      <textarea
                        placeholder="نوشتن توضیحات"
                        className="w-full p-2 border"
                        rows="1"
                      ></textarea>
                    </div>
                    <div className="flex justify-between">
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

          {showBasketDetails === basket.id && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-200 shadow-lg p-8 mx-6 w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => toggleBasketDetails(null)}
                    className="mr-2 text-gray-600 hover:text-gray-800"
                  >
                    <Icon name="arrowright" size={20} />
                  </button>
                  <h2 className="flex-grow text-xl font-bold">
                    {basket.status === "تایید"
                      ? `شماره سبد (${basket.status})`
                      : `شماره سبد (${basket.status})`}
                  </h2>
                </div>
                <div className="p-4 my-4">
                  <div className="flex mb-2">
                    <span className="ml-2 font-semibold">مبلغ:</span>
                    <span className="mx-2">{basket.InvestAmount}</span>
                    <span>ریال</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="ml-2 font-semibold">تاریخ:</span>
                    <span className="mr-2">{basket.date || "1398/03/12"}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">واریز به صورت مستقیم</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="ml-2 font-semibold">
                      پیام سرمایه‌گذار:
                    </span>
                    <span className="mr-2">
                      {basket.investorMessage || "-"}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <span className="ml-2 font-semibold">پیام سبدگردان:</span>
                    <span className="mr-2">{basket.managerMessage || "-"}</span>
                  </div>
                  {basket.status === "رد" && (
                    <div className="flex mb-2">
                      <span className="ml-2 font-semibold">علت رد:</span>
                      <span className="mr-2">{basket.rejectReason || "-"}</span>
                    </div>
                  )}
                  <div className="mb-2">
                    <span className="font-semibold">سند واریز:</span>
                    {basket.depositDocument && (
                      <div className="inline-block p-2 mt-2 bg-white">
                        <img
                          src={basket.depositDocument}
                          alt="سند واریز"
                          className="object-contain h-auto max-w-full max-h-60"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => toggleBasketDetails(null)}
                    className="px-4 py-2 text-gray-800 transition-colors bg-gray-300 rounded hover:bg-gray-400"
                  >
                    بازگشت
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvestorIncreaseCapital;

import React, { useState, useContext, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import AppContext from "../../contexts/AppContext";

// Generic Modal Component
const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 bg-gray-100">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="">
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

// Specific Modal Content for "history"
const HistoryModalContent = () => (
  <div>
    <div className="p-4 bg-gray-300">
      <div className="flex justify-between">
        <span>مبلغ</span>
        <span>در انتظار تایید</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
      </div>
      <div className="flex justify-between">
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
        <Icon className="" name="eye" size={32} />
      </div>
    </div>
    <div className="p-4 bg-red-500">
      <div className="flex justify-between">
        <span>مبلغ</span>
        <span>رد</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
      </div>
      <span>علت رد</span>
      <div className="flex justify-end ">
        <Icon className="" name="eye" size={32} />
      </div>
    </div>
    <div className="p-4 bg-blue-500">
      <div className="flex justify-between">
        <span>مبلغ</span>
        <span>در انتظار ارسال سند واریز</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
      </div>
      <div className="flex justify-between">
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
        <Icon className="" name="eye" size={32} />
      </div>
    </div>
    <div className="p-4 bg-green-500">
      <div className="flex justify-between">
        <span>مبلغ</span>
        <span>انجام شده</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
      </div>
      <div className="flex justify-between">
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
        <Icon className="" name="eye" size={32} />
      </div>
    </div>
  </div>
);

const PortfolioManagerCashRequest = () => {
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

  const [selectedBasket, setSelectedBasket] = useState(null);
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);

  const handleBasketClick = (basket) => {
    // Reset all modal visibility states to false
    setHistoryModalVisible(false);

    setSelectedBasket(basket);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="p-4 mb-4 bg-green-500 shadow-md cursor-pointer"
          onClick={() => handleBasketClick(basket)}
        >
          <div className="flex justify-center mb-4 text-lg font-bold sm:mb-8 sm:text-xl">
            <label className="mx-2 font-bold">شماره سبد: </label>
            <span>{basket.contractNumber}</span>
          </div>
          <div className="flex flex-col items-start justify-between mb-4 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="mb-2 sm:mb-0">
              <label className="font-semibold">سرمایه گذار: </label>
              <span>{basket.investor}</span>
            </div>
            <div className="">
              <label className="font-semibold">میزان سرمایه: </label>
              <span>{basket.InvestAmount}</span>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="flex justify-center px-4 py-2 bg-gray-200">
              <button
              // onClick={() => handleMessageClick("0912")}
              >
                <Icon className="mx-2" name="messages2" size={32} />
              </button>
              <button
              // onClick={() => handleCallClick("0912")}
              >
                <Icon className="mx-2" name="call" size={32} />
              </button>
              <Icon className="mx-2" name="eye" size={32} />
              <button
              // onClick={(event) => handleTransactionIconClick(basket, event)}
              >
                <Icon className="mx-2" name="transactionicon" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal isVisible={""} onClose={""} title={``}>
        <HistoryModalContent/>
      </Modal>
    </div>
  );
};

export default PortfolioManagerCashRequest;

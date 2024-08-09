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
// const HistoryModalContent = () => (
//   <div>
//     <div className="p-4 bg-gray-300">
//       <div className="flex justify-between">
//         <span>مبلغ</span>
//         <span>در انتظار تایید</span>
//       </div>
//       <div className="flex justify-between">
//         <span>تاریخ</span>
//       </div>
//       <div className="flex justify-between">
//         <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
//         <Icon className="" name="eye" size={32} />
//       </div>
//     </div>
//     <div className="p-4 bg-red-500">
//       <div className="flex justify-between">
//         <span>مبلغ</span>
//         <span>رد</span>
//       </div>
//       <div className="flex justify-between">
//         <span>تاریخ</span>
//       </div>
//       <span>علت رد</span>
//       <div className="flex justify-end ">
//         <Icon className="" name="eye" size={32} />
//       </div>
//     </div>
//     <div className="p-4 bg-blue-500">
//       <div className="flex justify-between">
//         <span>مبلغ</span>
//         <span>در انتظار ارسال سند واریز</span>
//       </div>
//       <div className="flex justify-between">
//         <span>تاریخ</span>
//       </div>
//       <div className="flex justify-between">
//         <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
//         <Icon className="" name="eye" size={32} />
//       </div>
//     </div>
//     <div className="p-4 bg-green-500">
//       <div className="flex justify-between">
//         <span>مبلغ</span>
//         <span>انجام شده</span>
//       </div>
//       <div className="flex justify-between">
//         <span>تاریخ</span>
//       </div>
//       <div className="flex justify-between">
//         <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
//         <Icon className="" name="eye" size={32} />
//       </div>
//     </div>
//   </div>
// );

const CashRequestModalContent = ({ cashrequestValue, setCashRequestValue }) => (
  <div className="p-4 px-8">
    {/* <h3 className="mb-4 text-lg font-bold">درخواست وجه</h3> */}
    <div className="mb-4">
      <label className="block mb-2">مبلغ درخواستی:</label>
      <div className="flex items-center justify-center">
        <input
          onChange={setCashRequestValue()}
          type="text"
          value={cashrequestValue}
          className="p-2 border"
          // readOnly
        />
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="mb-4">
      <label className="block mb-2">تاریخ:</label>

      <div className="flex justify-center ml-8">
        {" "}
        <DatePicker
          // value={selectedDate}
          // onChange={setSelectedDate}
          calendar={persian}
          locale={persian_fa}
        />
      </div>
    </div>
    <div className="flex justify-end mt-16">
      <button className="px-2 py-1 font-bold text-black bg-green-300">
        ثبت درخواست وجه از سبد
      </button>
    </div>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case "رد":
      return "bg-red-500";
    case "انجام شده":
      return "bg-green-500";
    case "در انتظار تایید":
      return "bg-gray-500";
    case "در انتظار سند واریز":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
const CashRequestHistoryModalContent = ({ basket, handleEyeIconClick }) => (
  <div className="">
    {basket.cashRequestHistory.map((cashreq, index) => (
      <div
        key={index}
        className={`p-4 mb-1 ${getStatusColor(cashreq.cashRequestStatus)}`}
      >
        <div className="flex justify-between mb-1">
          <span className="font-bold">وضعیت:</span>
          <span>{cashreq.cashRequestStatus}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">تاریخ:</span> {cashreq.date}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">
            {cashreq.isDirectPayment
              ? "واریز مستقیم"
              : "واریز به حساب کارگزاری"}
          </span>
          <button
            onClick={(event) => handleEyeIconClick(event, basket, cashreq)}
          >
            <Icon className="mx-2" name="eye" size={32} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const CashRequestDetailsModal = ({
  basket,
  cashreq,
  setIsCashRequestDetailsModalVisible,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4 text-right">
        <div className="flex justify-between">
          <span>:مبلغ</span>
          <span>{cashreq.amount} ریال</span>
        </div>
        <div className="flex justify-between">
          <span>:تاریخ</span>
          <span>{cashreq.date}</span>
        </div>
        <div>
          <span>:علت رد</span>
          <p>{cashreq.rejectionReason}</p>
        </div>
        {/* سایر داده‌ها */}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsCashRequestDetailsModalVisible(false)}
          className="px-4 py-2 text-white bg-gray-600 rounded"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
};

const ConfirmedCashRequestModal = ({ cashreq, onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="p-4 text-white bg-blue-500">
        <h2 className="text-xl font-bold text-center">
          درخواست وجه شماره سبد (تایید شده)
        </h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">مبلغ:</span>
            <span>{cashreq.amount} ریال</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">تاریخ:</span>
            <span>{cashreq.date}</span>
          </div>
          <div>
            <span className="font-bold">پیام سبدگردان:</span>
            <p className="mt-1">
              {cashreq.portfolioManagerMessage || "بدون پیام"}
            </p>
          </div>
          <div>
            <span className="font-bold">پیام سرمایه‌گذار:</span>
            <p className="mt-1">{cashreq.investorMessage || "بدون پیام"}</p>
          </div>
          <div>
            <span className="font-bold">سند واریز:</span>
            <div className="flex items-center justify-center h-32 mt-2 bg-gray-100">
              {cashreq.depositDocument ? (
                <img
                  src={cashreq.depositDocument}
                  alt="سند واریز"
                  className="max-h-full"
                />
              ) : (
                <span>سند واریز موجود نیست</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};

const InvestorCashRequest = () => {
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
  const [cashrequestValue, setCashRequestValue] = useState();
  //------------------------------------------------------------------------------------------
  const [selectedBasket, setSelectedBasket] = useState(null);
  // const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  const [isCashRequestModalVisible, setCashRequestModalVisible] =
    useState(false);
  const [isCashRequestHistoryModalVisible, setCashRequestHistoryModalVisible] =
    useState(false);
  const [
    isCashRequestDetailsModalVisible,
    setIsCashRequestDetailsModalVisible,
  ] = useState(false);
  const [cashreq, setCashreq] = useState();

  const [
    isConfirmedCashRequestModalVisible,
    setIsConfirmedCashRequestModalVisible,
  ] = useState(false);
  //------------------------------------------------------------------------------------------

  const handleBasketClick = (basket) => {
    // Reset all modal visibility states to false
    // setHistoryModalVisible(false);
    setSelectedBasket(basket);
    // setCashRequestHistoryModalVisible(true);
  };
  const handleEyeIconClick = (event, basket, cashreq) => {
    event.stopPropagation();

    if (cashreq.cashRequestStatus === "رد") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsCashRequestDetailsModalVisible(true);
    } else if (cashreq.cashRequestStatus === "انجام شده") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsConfirmedCashRequestModalVisible(true);
    }
  };

  const handleCloseConfirmedCashRequestModal = () => {
    setIsConfirmedCashRequestModalVisible(false);
  };

  const handleCloseCashRequestDetailsModal = () => {
    setIsCashRequestDetailsModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseCashRequestHistoryModal = () => {
    setCashRequestHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  const handleICashrequestHistoryconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setCashRequestHistoryModalVisible(true);
  };

  // const handleCloseHistoryModal = () => {
  //   setHistoryModalVisible(false);
  //   setSelectedBasket(null);
  // };

  const handleCashRequestIconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setCashRequestModalVisible(true);
  };

  const handleCloseCashRequestModal = () => {
    setCashRequestModalVisible(false);
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
                onClick={(event) =>
                  handleICashrequestHistoryconClick(basket, event)
                }
              >
                <Icon className="mx-2" name="cashrequesthistory" size={32} />
              </button>
              <button
                onClick={(event) => handleCashRequestIconClick(basket, event)}
              >
                <Icon className="mx-2" name="cashrequest" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* <Modal
        isVisible={isHistoryModalVisible}
        onClose={handleCloseHistoryModal}
        title={`تاریخچه ی `}
      >
        <HistoryModalContent />
      </Modal> */}

      <Modal
        isVisible={isCashRequestModalVisible}
        onClose={handleCloseCashRequestModal}
        title="درخواست وجه"
      >
        <CashRequestModalContent
          cashrequestValue={cashrequestValue}
          setCashRequestValue={setCashRequestValue}
        />
      </Modal>
      <Modal
        isVisible={isCashRequestHistoryModalVisible}
        onClose={handleCloseCashRequestHistoryModal}
        title={`درخواست وجه نقد سبد (شماره سبد: ${selectedBasket?.contractNumber})`}
      >
        <CashRequestHistoryModalContent
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>

      <Modal
        isVisible={isCashRequestDetailsModalVisible}
        onClose={handleCloseCashRequestDetailsModal}
        title={` (رد شده) ${selectedBasket?.contractNumber}`}
      >
        <CashRequestDetailsModal
          setIsCashRequestDetailsModalVisible={
            setIsCashRequestDetailsModalVisible
          }
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
          cashreq={cashreq}
        />
      </Modal>
      <Modal
        isVisible={isConfirmedCashRequestModalVisible}
        onClose={handleCloseConfirmedCashRequestModal}
        title={`درخواست وجه تایید شده (شماره سبد: ${selectedBasket?.contractNumber})`}
      >
        <ConfirmedCashRequestModal
          cashreq={cashreq}
          onClose={handleCloseConfirmedCashRequestModal}
        />
      </Modal>
    </div>
  );
};

export default InvestorCashRequest;

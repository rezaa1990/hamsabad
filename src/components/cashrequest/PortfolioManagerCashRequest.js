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

const getStatusColor = (status) => {
  switch (status) {
    case "رد":
      return "bg-[#DB524B]";
    case "انجام شده":
      return "bg-[#1BBF89]";
    case "در انتظار تایید":
      return "bg-gray-500";
    case "در انتظار سند واریز":
      return "bg-[#5D9CEC]";
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

const WaitingForConfirmModal = ({ cashreq, onConfirm, onReject, onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="p-6 space-y-16">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">مبلغ:</span>
            <div className="flex">
              <div className="">{"۱۰۰۰۰۰۰۰"}</div>
              <span className="mr-8">ریال</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">تاریخ:</span>
            <div className="flex">
              <div className="">{"۱۲۳۴/۱۲/۱۲"}</div>
              <span className="mr-8 text-gray-100">ریال</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-6">
          <button onClick={onConfirm} className="w-16 px-6 py-1 bg-[#1BBF89]">
            تایید
          </button>
          <button onClick={onReject} className="w-16 px-6 py-1 bg-[#DB524B]">
            رد
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmingCashRequestModal = ({ onConfirm, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    onConfirm(selectedOption, message);
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span>اکنون نقد ندارید، در اسرع وقت نقد میکنم:</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span>نقد موجود است و به حساب شما واریز می‌شود.</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span>
                سهم بنده از وجه نقد از شما درخواست شد لطفا در قسمت درخواست سهم
                تایید و واریز نمایید.
              </span>
            </label>
          </div>
          <div>
            <textarea
              placeholder="متن خطاب به سرمایه‌گذار ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleConfirm}
            className="px-2 py-1 font-bold bg-[#1BBF89]"
          >
            تایید اولیه درخواست
          </button>
        </div>
      </div>
    </div>
  );
};

const RejectingCashRequestModal = ({ onReject, onClose }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const handleReject = () => {
    onReject(selectedReason, additionalComments);
  };

  return (
    <div className="w-full max-w-md">
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="market_condition"
                checked={selectedReason === "market_condition"}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>
                باتوجه به روند بازار زمان مناسبی جهت برداشت از سرمایه نیست، از
                منابع دیگر تامین کنید.
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="high_amount"
                checked={selectedReason === "high_amount"}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>مبلغ درخواستی بسیار زیاد است.</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="out_of_contract"
                checked={selectedReason === "out_of_contract"}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>تاریخ خارج از قرارداد است.</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                className="ml-2"
                type="radio"
                value="other"
                checked={selectedReason === "other"}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>سایر دلایل</span>
            </label>
          </div>
          <div>
            <textarea
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="نوشتن توضیحات..."
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            // onClick={handleReject}
            className="px-6 py-1 bg-[#DB524B]"
          >
            رد
          </button>
        </div>
      </div>
    </div>
  );
};

const UploadDocumentModal = ({ onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    onSubmit(selectedFile, comments);
    onClose();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-right">
        ثبت سند واریز وجه درخواستی به حساب (شماره)
      </h2>
      <div className="mb-4">
        <div className="flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg">
          {selectedFile ? (
            <p className="text-gray-600">{selectedFile.name}</p>
          ) : (
            <p className="text-gray-400">برای انتخاب فایل کلیک کنید</p>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="w-full mt-2 text-white bg-blue-500"
        >
          انتخاب سند
        </button>
      </div>
      <div className="mb-4">
        <textarea
          placeholder="نوشتن توضیحات..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      <div className="flex justify-end">
        <button onClick={handleSubmit} className="text-white bg-green-500">
          ثبت
        </button>
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
  // const [cashrequestValue, setCashRequestValue] = useState();
  //------------------------------------------------------------------------------------------
  const [selectedBasket, setSelectedBasket] = useState(null);
  // const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  // const [isCashRequestModalVisible, setCashRequestModalVisible] =
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

  const [isWaitingForConfirmModalVisible, setIsWaitingForConfirmModalVisible] =
    useState(false);
  const [
    isConfirmingCashRequestModalVisible,
    setIsConfirmingCashRequestModalVisible,
  ] = useState(false);
  const [
    isRejectingCashRequestModalVisible,
    setIsRejectingCashRequestModalVisible,
  ] = useState(false);

  const [isUploadDocumentModalVisible, setIsUploadDocumentModalVisible] =
    useState(false);
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
    } else if (cashreq.cashRequestStatus === "در انتظار تایید") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsWaitingForConfirmModalVisible(true);
    } else if (cashreq.cashRequestStatus === "در انتظار سند واریز") {
      setSelectedBasket(basket);
      setCashreq(cashreq);
      setIsUploadDocumentModalVisible(true);
    }
  };

  const handleDocumentUpload = (file, comments) => {
    // Implement the logic for uploading the document
    console.log("Document uploaded:", file);
    console.log("Comments:", comments);
    // You might want to update the cashreq status or perform other actions here
    setIsUploadDocumentModalVisible(false);
  };

  const handleConfirmingCashRequest = () => {
    setIsWaitingForConfirmModalVisible(false);
    setIsConfirmingCashRequestModalVisible(true);
  };

  const handleRejectingCashRequest = () => {
    setIsWaitingForConfirmModalVisible(false);
    setIsRejectingCashRequestModalVisible(true);
  };

  const handleFinalConfirmCashRequest = (option, message) => {
    // Implement the logic for final confirmation of the cash request
    console.log(
      "Cash request confirmed with option:",
      option,
      "and message:",
      message
    );
    setIsConfirmingCashRequestModalVisible(false);
  };

  const handleCloseRejectingModal = () => {
    setIsRejectingCashRequestModalVisible(false);
  };

  const handleConfirmCashRequest = () => {
    // Implement the logic for confirming the cash request
    console.log("Cash request confirmed");
    handleCloseWaitingForConfirmModal();
  };

  const handleRejectCashRequest = () => {
    // Implement the logic for rejecting the cash request
    console.log("Cash request rejected");
    handleCloseWaitingForConfirmModal();
  };

  const handleCloseWaitingForConfirmModal = () => {
    setIsWaitingForConfirmModalVisible(false);
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

  // const handleCashRequestIconClick = (basket, event) => {
  //   event.stopPropagation();
  //   setSelectedBasket(basket);
  //   setCashRequestModalVisible(true);
  // };

  // const handleCloseCashRequestModal = () => {
  //   setCashRequestModalVisible(false);
  //   setSelectedBasket(null);
  // };

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
              <button>
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

      {/* <Modal
        isVisible={isCashRequestModalVisible}
        onClose={handleCloseCashRequestModal}
        title="درخواست وجه"
      >
        <CashRequestModalContent
          cashrequestValue={cashrequestValue}
          setCashRequestValue={setCashRequestValue}
        />
      </Modal> */}
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
      <Modal
        isVisible={isWaitingForConfirmModalVisible}
        onClose={handleCloseWaitingForConfirmModal}
        title={`درخواست افزایش سرمایه (شماره سبد: ${selectedBasket?.contractNumber})`}
      >
        <WaitingForConfirmModal
          cashreq={cashreq}
          onConfirm={handleConfirmCashRequest}
          onReject={handleRejectCashRequest}
          onClose={handleCloseWaitingForConfirmModal}
        />
      </Modal>
      <Modal
        isVisible={isWaitingForConfirmModalVisible}
        onClose={handleCloseWaitingForConfirmModal}
        title={`درخواست افزایش سرمایه`}
      >
        <WaitingForConfirmModal
          cashreq={cashreq}
          onConfirm={handleConfirmingCashRequest}
          onReject={handleRejectingCashRequest}
          onClose={handleCloseWaitingForConfirmModal}
        />
      </Modal>

      <Modal
        isVisible={isConfirmingCashRequestModalVisible}
        onClose={() => setIsConfirmingCashRequestModalVisible(false)}
        title="تایید درخواست وجه"
      >
        <ConfirmingCashRequestModal
          onConfirm={handleFinalConfirmCashRequest}
          onClose={() => setIsConfirmingCashRequestModalVisible(false)}
        />
      </Modal>

      <Modal
        isVisible={isRejectingCashRequestModalVisible}
        onClose={handleCloseRejectingModal}
        title="رد درخواست وجه"
      >
        <RejectingCashRequestModal onClose={handleCloseRejectingModal} />
      </Modal>
      <Modal
        isVisible={isUploadDocumentModalVisible}
        onClose={() => setIsUploadDocumentModalVisible(false)}
        title="ثبت سند واریز"
      >
        <UploadDocumentModal
          onClose={() => setIsUploadDocumentModalVisible(false)}
          onSubmit={handleDocumentUpload}
        />
      </Modal>
    </div>
  );
};

export default InvestorCashRequest;

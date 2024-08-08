import React, { useState, useContext } from "react";
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
      <div className="w-full max-w-lg p-8 bg-gray-200">
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
    {/* ... */}
  </div>
);

const ShareRequestModalContent = ({
  handleButtonConfirmSharerequestClick,
  basket,
}) => (
  <div className="space-y-1">
    <div className="p-6 border border-gray-400">
      <label>کل موجودی سبد (پرتفوی و نقد) :</label>
      <div className="flex justify-center">
        <input
          type="text"
          className="pl-2 bg-gray-100 text-end"
          value="1000000"
          readOnly
        />
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="p-6 border border-gray-400">
      <div className="flex justify-between ">
        <label>درصد توافق شده:</label>
        <input
          type="text"
          className="bg-gray-200 text-end"
          value="30"
          readOnly
        />
        <span>درصد</span>
      </div>
      <label>مبلغ سهم سبد گردان:</label>
      <div className="flex justify-end">
        <input
          type="text"
          className="ml-8 bg-gray-200 text-end"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div className="p-6 border border-gray-400">
      <label>مبلغ درخواست شده:</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="text-center bg-gray-100"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div className="p-6 border border-gray-400">
      <label>مبلغ باقیمانده:</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="text-center bg-gray-100"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div className="p-6 border border-gray-400">
      <label>تاریخ:</label>
      <input
        type="text"
        className="text-center bg-gray-100"
        value="1398/03/12"
        readOnly
      />
    </div>
    <div className="">
      <button
        onClick={() => handleButtonConfirmSharerequestClick(basket)}
        className="px-4 text-white bg-green-500 "
      >
        {" "}
        تایید
      </button>
      <button className="px-4 text-white bg-red-500 "> رد</button>
    </div>
  </div>
);

const ConfirmShareRequestModalContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [text, setText] = useState("");

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg">
      <div className="text-lg font-semibold text-right">
        تایید درخواست وجه (سرمایه‌گذار)
      </div>
      <div className="space-y-2">
        <label className="flex items-center text-right">
          <input
            type="radio"
            name="requestOption"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-2"
          />
          تشکر از زحمات جنابعالی، نقدی واریز میکنم، نیازی به نند کردن سهم ندارم.
        </label>
        <label className="flex items-center text-right">
          <input
            type="radio"
            name="requestOption"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-2"
          />
          تشکر از زحمات جنابعالی، لطفا جهت واریز مبلغ را از سبد نقد کنید.
        </label>
      </div>
      <input
        type="text"
        placeholder="متن خطاب به سیدگردان"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 text-right border border-gray-300 rounded-md"
      />
      <button
        onClick={() => console.log("تایید اولیه درخواست", selectedOption, text)}
        className="w-full py-2 text-white bg-green-500 rounded-md"
      >
        تایید اولیه درخواست
      </button>
    </div>
  );
};
// New Modal Content Component for Share Document
const ShareDocumentModalContent = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 text-right">
      <div className="text-lg font-semibold">
        ثبت سند واریز برای سبدگردان (شماره) - سرمایه گذار
      </div>
      <div className="h-40 border border-gray-300"></div>
      <button className="w-full py-2 text-white bg-blue-500 rounded">
        انتخاب سند
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="newContract"
          name="contractOption"
          className="ml-2"
        />
        <label htmlFor="newContract" className="text-gray-700">
          لطفا قرارداد جدید را ثبت نمایید.
        </label>
      </div>
      <input
        type="text"
        placeholder="نوشتن توضیحات..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button className="w-full py-2 text-white bg-green-500 rounded-md">
        تایید نهایی
      </button>
    </div>
  );
};

const InvestorPaymentRequest = () => {
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
  const [isShareRequestModalVisible, setShareRequestModalVisible] =
    useState(false);
  const [
    isConfirmShareRequestModalVisible,
    setConfirmShareRequestModalVisible,
  ] = useState(false);
  const [isShareDocumentModalVisible, setShareDocumentModalVisible] =
    useState(false);

  const handleBasketClick = (basket) => {
    setSelectedBasket(basket);
    if (basket.shareRequest == "درخواست سهم") {
      setShareRequestModalVisible(true);
    } else if (basket.sharedocument) {
      setShareDocumentModalVisible(true);
    }
  };

  const handleTransactionIconClick = (basket, event) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setHistoryModalVisible(true);
  };

  const handleButtonConfirmSharerequestClick = (basket) => {
    setSelectedBasket(basket);
    setConfirmShareRequestModalVisible(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseConfirmShareRequestModal = () => {
    setConfirmShareRequestModalVisible(false);
    setSelectedBasket(null);
  };

   const handleCloseShareDocumentModal = () => {
     setShareDocumentModalVisible(false);
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
              <Icon className="mx-2" name="messages2" size={32} />
              <Icon className="mx-2" name="call" size={32} />
              <Icon className="mx-2" name="eye" size={32} />
              <button
                onClick={(event) => handleTransactionIconClick(basket, event)}
              >
                <Icon className="mx-2" name="transactionicon" size={32} />
              </button>
              {/* Add investor-specific icons here */}
            </div>
          </div>
        </div>
      ))}

      <Modal
        isVisible={isHistoryModalVisible}
        onClose={handleCloseHistoryModal}
        title={`تاریخچه ی سبد (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <HistoryModalContent />
      </Modal>

      <Modal
        basket={selectedBasket}
        handleButtonConfirmSharerequestClick={
          handleButtonConfirmSharerequestClick
        }
        isVisible={isShareRequestModalVisible}
        onClose={handleCloseShareRequestModal}
        title={`درخواست سهم (${selectedBasket?.contractNumber || "شماره سبد"})`}
      >
        <ShareRequestModalContent
          handleButtonConfirmSharerequestClick={
            handleButtonConfirmSharerequestClick
          }
          basket={selectedBasket}
        />
      </Modal>

      <Modal
        basket={selectedBasket}
        handleButtonConfirmSharerequestClick={
          handleButtonConfirmSharerequestClick
        }
        isVisible={isConfirmShareRequestModalVisible}
        onClose={handleCloseConfirmShareRequestModal}
        title={` تایید درخواست وجه (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <ConfirmShareRequestModalContent />
      </Modal>
      <Modal
        isVisible={isShareDocumentModalVisible}
        onClose={handleCloseShareDocumentModal}
        title={`ثبت سند واریز`}
      >
        <ShareDocumentModalContent />
      </Modal>
    </div>
  );
};

export default InvestorPaymentRequest;

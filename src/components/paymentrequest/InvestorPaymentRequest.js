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

// Specific Modal Content for "history"
const HistoryModalContent = ({ basket, handleEyeIconClick }) => {
  return (
    <div>
      {basket.shareRequestHistory.map((sharereq, index) => (
        <div
          key={index}
          className={`p-4  ${getStatusColor(sharereq.shareRequestStatus)}`}
        >
          <div className="flex justify-between">
            <label>مبلغ</label>
            <span>{sharereq.amount}</span>
            <span>{sharereq.shareRequestStatus}</span>
          </div>
          <div className="flex justify-between">
            <label>تاریخ</label>
            <span>{sharereq.Date}</span>
          </div>
          <label>علت رد</label>
          <span>...</span>
          <div className="flex justify-end">
            <button
              onClick={(event) => handleEyeIconClick(event, basket, sharereq)}
            >
              <Icon className="" name="eye" size={32} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShareRequestModalContent = ({
  handleButtonConfirmSharerequestClick,
  handleButtonRejectSharerequestClick,
  basket,
}) => {
  const handleRejectShareRequestClick = () => {
    handleButtonRejectSharerequestClick(basket);
  };

  return (
    <div className="px-6 space-y-1">
      <div className="px-6 py-3 border border-gray-400">
        <label>کل موجودی سبد (پرتفوی و نقد) :</label>
        <div className="flex justify-end">
          <span></span>
          <input
            type="text"
            className="p-2 bg-white text-end"
            value="۱۰۰۰۰۰۰۰"
            readOnly
          />
          <span className="p-2">ریال</span>
        </div>
      </div>
      <div className="px-6 py-3 border border-gray-400 ">
        <div className="flex justify-between mb-1">
          <div className="flex justify-between">
            <label className="">درصد توافق شده:</label>
            <input
              type="text"
              className="p-2 bg-gray-100 text-end"
              value="۳۰"
              readOnly
            />
            <span className="py-2 mr-2">درصد</span>
          </div>
        </div>
        <div className="">
          <label>مبلغ سهم سبد گردان:</label>
          <div className="flex justify-end">
            <input
              type="text"
              className="p-2 bg-gray-100 text-end"
              value="۱۰۰۰۰۰۰۰"
              readOnly
            />
            <span className="p-2">ریال</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-3 border border-gray-400 ">
        <label>مبلغ درخواست شده:</label>
        <div className="flex justify-end">
          <span></span>
          <input
            type="text"
            className="p-2 bg-gray-100 text-end"
            value="۱۰۰۰۰۰۰"
            readOnly
          />
          <span className="p-2">ریال</span>
        </div>

        <label>مبلغ باقیمانده:</label>
        <div className="flex justify-end">
          <span></span>
          <input
            type="text"
            className="p-2 bg-gray-100 text-end"
            value="۱۰۰۰۰۰"
            readOnly
          />
          <span className="p-2">ریال</span>
        </div>
      </div>

      <div className="px-6 py-3 ">
        <div className="flex justify-between">
          <label>تاریخ:</label>

          <input
            type="text"
            className="bg-gray-100 text-end"
            value="۱۴۰۰/۰۸/۱۲"
            readOnly
          />
          {/* <span className=""></span> */}
        </div>
      </div>
      <div className="flex justify-around">
        <button
          onClick={() => handleButtonConfirmSharerequestClick(basket)}
          className="px-6 py-1 text-white bg-green-500 "
        >
          تایید
        </button>
        <button
          onClick={handleRejectShareRequestClick}
          className="px-6 py-1 text-white bg-red-500 "
        >
          رد
        </button>
      </div>
    </div>
  );
};
//
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

const RejectRequestshare = () => {
  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-lg">
      <div className="text-lg font-semibold text-right">
        درخواست سهم از سبد (رد شده)
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>مبلغ:</span>
          <span>100,000</span>
          <span>ریال</span>
        </div>
        <div className="flex justify-between">
          <span>تاریخ:</span>
          <span>1400/08/12</span>
          <span></span>
        </div>
        <div className="flex justify-between">
          <span>واریز به صورت مستقیم</span>
          <span></span>
          <span></span>
        </div>
        <div>
          <div className="flex justify-between">
            <span>پیام سرمایه‌گذار:</span>
            <span>
              با تشکر از زحمات شما، ولی متأسفانه نمی‌توانم این درخواست را تأیید
              کنم.
            </span>
            <span></span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span>علت رد:</span>
            <span>تغییر در سبد سرمایه‌گذاری</span>
            <span></span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span>پیام سبدگردان:</span>
            <span>
              با تشکر از درخواست شما، متأسفانه به دلیل تغییر در سبد سرمایه‌گذاری
              امکان تأیید این درخواست وجود ندارد.
            </span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <button className="px-6 py-2 text-white bg-green-500 rounded-md">
          بازگشت
        </button>
      </div>
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

// Modal Content for "درخواست سهم از سبد (تایید شده)"
const ConfirmedPortfolioShareRequestModalContent = ({ onClose }) => (
  <div className="px-8 space-y-8">
    <div className="flex justify-between">
      <label className="">کل موجودی:</label>
      <span className="">۱۰۰۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">درصد توافقی:</label>
      <span className="">۳۰</span>
      <span className="mr-2">درصد</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ سهم:</label>
      <span className="">۱۰۰۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ درخواستی:</label>
      <span className="">۱۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">مبلغ باقیمانده:</label>
      <span className="">۱۰۰۰۰۰۰۰</span>
      <span className="mr-2">ریال</span>
    </div>
    <div className="flex justify-between">
      <label className="">تاریخ:</label>
      <span>۱۳۹۸/۰۳/۰۴</span>
      <span className="mr-2"></span>
    </div>
    <div className="flex justify-end">
      <button
        onClick={onClose}
        className="flex px-4 font-bold text-black border border-gray-300"
      >
        بازگشت
      </button>
    </div>
  </div>
);

// New Modal Content for "رد شده" (Rejected) basket
const RejectedBasketModalContent = ({ basketNumber, onClose }) => (
  <div className="">
    <div className="px-8 space-y-8">
      <div className="flex justify-between">
        <span>مبلغ:</span>
        <span>۱۰۰۰۰۰۰</span>
        <span>ریال</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ:</span>
        <span>۱۳۹۹/۰۹/۲۱</span>
        <span></span>
      </div>
      <div className="flex justify-between">
        <span>واریز به صورت مستقیم</span>
        <span></span>
        <span></span>
      </div>
      <div>
        <div className="flex justify-between">
          <span>پیام سرمایه گذار :</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span>علت رد</span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span>پیام سبد گردان :</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-10">
      <button
        onClick={onClose}
        className="px-4 font-bold text-black border border-gray-300"
      >
        بازگشت
      </button>
    </div>
  </div>
);

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

  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Assume screen width less than 640px is considered small
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCallClick = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      if (isSmallScreen) {
        alert("دستگاه شما قابلیت تماس تلفنی را ندارد.");
      } else {
        Modal({
          title: "خطا",
          message:
            "متأسفانه دستگاه شما قابلیت تماس تلفنی را ندارد. لطفاً از طریق سایر راه‌های ارتباطی با ما در تماس باشید.",
        });
      }
    }
  };

  const handleMessageClick = (phoneNumber, message) => {
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(
        message
      )}`;
    } else {
      if (isSmallScreen) {
        alert("دستگاه شما قابلیت ارسال اس ام اس را ندارد.");
      } else {
        Modal({
          title: "خطا",
          message:
            "متأسفانه دستگاه شما قابلیت اشتراک‌گذاری اس ام اس را ندارد. لطفاً از طریق سایر راه‌های ارتباطی با ما در تماس باشید.",
        });
      }
    }
  };

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
  const [
    isConfirmedPortfolioShareRequestModalVisible,
    setConfirmedPortfolioShareRequestModalVisible,
  ] = useState(false);
  const [isRejectedBasketModalVisible, setRejectedBasketModalVisible] =
    useState(false);
  const [isRejectRequestshareisible, setRejectRequestshareisible] =
    useState(false);
  const [sharereq, setSharereq] = useState();

  const handleBasketClick = (basket) => {
    // Reset all modal visibility states to false
    setHistoryModalVisible(false);
    setShareRequestModalVisible(false);
    setConfirmShareRequestModalVisible(false);
    setShareDocumentModalVisible(false);
    setConfirmedPortfolioShareRequestModalVisible(false);
    setRejectedBasketModalVisible(false);
    setRejectRequestshareisible(false);
    setSelectedBasket(basket);
  };

  const handleEyeIconClick = (event, basket, sharereq) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setSharereq(sharereq);
    if (sharereq.shareRequestStatus === "رد") {
      setRejectedBasketModalVisible(true);
    } else if (sharereq.shareRequestStatus === "انجام شده") {
      setConfirmedPortfolioShareRequestModalVisible(true);
    } else if (sharereq.shareRequestStatus === "در انتظار تایید") {
      setShareRequestModalVisible(true);
    } else if (sharereq.shareRequestStatus === "در انتظار سند واریز") {
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

  const handleButtonRejectSharerequestClick = (basket) => {
    setSelectedBasket(basket);
    setRejectRequestshareisible(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseConfirmShareRequestModal = () => {
    setConfirmShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseShareDocumentModal = () => {
    setShareDocumentModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseRejectedBasketModal = () => {
    setRejectedBasketModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseConfirmedPortfolioShareRequestModal = () => {
    setConfirmedPortfolioShareRequestModalVisible(false);
    // setSelectedBasket(null);
  };

  const handleCloseRejectRequestshare = () => {
    setRejectRequestshareisible(false);
    // setSelectedBasket(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="p-4 mb-4 bg-[#1BBF89] shadow-md cursor-pointer"
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
              <button onClick={() => handleMessageClick("0912")}>
                <Icon className="mx-2" name="messages2" size={32} />
              </button>
              <button onClick={() => handleCallClick("0912")}>
                <Icon className="mx-2" name="call" size={32} />
              </button>
              <Icon className="mx-2" name="eye" size={32} />
              <button
                onClick={(event) => handleTransactionIconClick(basket, event)}
              >
                <Icon className="mx-2" name="transactionicon" size={32} />
              </button>
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
        <HistoryModalContent
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>

      <Modal
        isVisible={isShareRequestModalVisible}
        onClose={handleCloseShareRequestModal}
        title={`درخواست سهم از سبد(${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <ShareRequestModalContent
          handleButtonConfirmSharerequestClick={
            handleButtonConfirmSharerequestClick
          }
          handleButtonRejectSharerequestClick={
            handleButtonRejectSharerequestClick
          }
          basket={selectedBasket}
        />
      </Modal>

      <Modal
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
      <Modal
        isVisible={isConfirmedPortfolioShareRequestModalVisible}
        onClose={handleCloseConfirmedPortfolioShareRequestModal}
        title={`درخواست سهم از سبد (تایید شده)`}
      >
        <ConfirmedPortfolioShareRequestModalContent
          onClose={handleCloseConfirmedPortfolioShareRequestModal}
        />
      </Modal>
      <Modal
        isVisible={isRejectedBasketModalVisible}
        onClose={handleCloseRejectedBasketModal}
        title={`${selectedBasket?.contractNumber || ""} (رد شده)`}
      >
        <RejectedBasketModalContent
          basketNumber={selectedBasket?.contractNumber}
          onClose={handleCloseRejectedBasketModal}
        />
      </Modal>
      <Modal
        isVisible={isRejectRequestshareisible}
        onClose={() => handleCloseRejectRequestshare(false)}
        title="رد درخواست وجه نقد"
      >
        <RejectRequestshare />
      </Modal>
    </div>
  );
};

export default InvestorPaymentRequest;

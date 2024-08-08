import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";

// Generic Modal Component
const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-8 bg-gray-200">
        <div className="flex items-center">
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

// Specific Modal Content for "درخواست سهم"
const ShareRequestModalContent = () => (
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
        {/* <span className="text-end">۳۰</span> */}
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
    <button className="p-1 text-white bg-green-500 ">ثبت درخواست سهم</button>
  </div>
);

// Modal Content for "درخواست سهم از سبد (تایید شده)"
const ConfirmedPortfolioShareRequestModalContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between">
      <label>کل موجودی:</label>
      <div className="flex items-center">
        <span>100.000.000</span>
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>درصد توافقی:</label>
      <div className="flex items-center">
        <span>30</span>
        <span className="mr-2">درصد</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>مبلغ سهم:</label>
      <div className="flex items-center">
        <span>100.000.000</span>
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>مبلغ درخواستی:</label>
      <div className="flex items-center">
        <span>100.000.000</span>
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>مبلغ باقیمانده:</label>
      <div className="flex items-center">
        <span>100.000.000</span>
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>تاریخ:</label>
      <span>1398/03/12</span>
    </div>
    <button className="w-full p-2 text-black bg-gray-300 rounded">
      بازگشت
    </button>
  </div>
);

// New Modal Content for "ثبت سند واریز سبد"
const DepositDocumentModalContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-center">
      ثبت سند واریز سبد (شماره سبد)
    </h2>
    <div className="flex items-center justify-center h-48 border-2 border-gray-300">
      {/* Placeholder for image upload area */}
      <span className="text-gray-400">محل آپلود تصویر</span>
    </div>
    <button className="w-full p-2 text-white bg-blue-500 rounded">
      انتخاب سند
    </button>
    <textarea
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="نوشتن توضیحات..."
      rows="3"
    ></textarea>
    <button className="w-full p-2 text-white bg-green-500 rounded">ثبت</button>
  </div>
);

// New Modal Content for "رد شده" (Rejected) basket
const RejectedBasketModalContent = ({ basketNumber }) => (
  <div className="space-y-4">
    {/* <h2 className="text-xl font-bold text-center">شماره سبد (رد شده)</h2> */}
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>مبلغ:</span>
        <span>10.000.000 ریال</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ:</span>
        <span>1398/03/12</span>
      </div>
      <div>واریز به صورت مستقیم</div>
      <div>
        <span>پیام سرمایه گذار :</span>
        <p></p>
      </div>
      <div>
        <span>علت رد</span>
        <p></p>
      </div>
      <div>
        <span>پیام سبدگردان :</span>
        <p></p>
      </div>
    </div>
    <button className="w-full p-2 text-black bg-gray-300 rounded">
      بازگشت
    </button>
  </div>
);

const PortfolioManagerPaymentRequest = () => {
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

  // ---------------------------------------------------------------------------------------------------
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  // ---------------------------------------------------------------------------------------------------
  //درخواست سهم توسط سبدگردان
  const [isShareRequestModalVisible, setShareRequestModalVisible] =
    useState(false);
  // ---------------------------------------------------------------------------------------------------
  const [
    isConfirmedPortfolioShareRequestModalVisible,
    setConfirmedPortfolioShareRequestModalVisible,
  ] = useState(false);
  // ---------------------------------------------------------------------------------------------------

  const [isDepositDocumentModalVisible, setDepositDocumentModalVisible] =
    useState(false);
  //-----------------------------------------------------------------------------------------------------
   const [isRejectedBasketModalVisible, setRejectedBasketModalVisible] =
     useState(false);
//------------------------------------------------------------------------------------------------------
  const handleBasketClick = (basket) => {
    setSelectedBasket(basket);
    if (basket.shareRequest === "تایید") {
      setConfirmedPortfolioShareRequestModalVisible(true);
    } else if (basket.shareRequest === "درخواست سند نقد کردن") {
      setDepositDocumentModalVisible(true);
    } else if (basket.shareRequest === "رد") {
      setRejectedBasketModalVisible(true);
    }
  };

  const handleTransactionIconClick = (basket, event) => {
    event.stopPropagation(); // Prevent the basket click event from firing
    setSelectedBasket(basket);
    setHistoryModalVisible(true);
  };

  const handleDollarBagIconClick = (basket, event) => {
    event.stopPropagation(); // Prevent the basket click event from firing
    setSelectedBasket(basket);
    setShareRequestModalVisible(true);
  };
  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseConfirmedPortfolioShareRequestModal = () => {
    setConfirmedPortfolioShareRequestModalVisible(false);
    setSelectedBasket(null);
  };

  const handleCloseDepositDocumentModal = () => {
    setDepositDocumentModalVisible(false);
    setSelectedBasket(null);
  };

    const handleCloseRejectedBasketModal = () => {
      setRejectedBasketModalVisible(false);
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
              <button
                onClick={(event) => handleDollarBagIconClick(basket, event)}
              >
                <Icon className="mx-2" name="dollarbag" size={32} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Render all Modals */}
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
        isVisible={isShareRequestModalVisible}
        onClose={handleCloseShareRequestModal}
        title={`درخواست سهم (${selectedBasket?.contractNumber || "شماره سبد"})`}
      >
        <ShareRequestModalContent />
      </Modal>

      <Modal
        isVisible={isConfirmedPortfolioShareRequestModalVisible}
        onClose={handleCloseConfirmedPortfolioShareRequestModal}
        title={`درخواست سهم از سبد (تایید شده) (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <ConfirmedPortfolioShareRequestModalContent />
      </Modal>
      <Modal
        isVisible={isDepositDocumentModalVisible}
        onClose={handleCloseDepositDocumentModal}
        title={`ثبت سند واریز سبد (${
          selectedBasket?.contractNumber || "شماره سبد"
        })`}
      >
        <DepositDocumentModalContent />
      </Modal>
      <Modal
        isVisible={isRejectedBasketModalVisible}
        onClose={handleCloseRejectedBasketModal}
        title={`شماره سبد (رد شده) (${selectedBasket?.contractNumber || ""})`}
      >
        <RejectedBasketModalContent
          basketNumber={selectedBasket?.contractNumber}
        />
      </Modal>
    </div>
  );
};

export default PortfolioManagerPaymentRequest;

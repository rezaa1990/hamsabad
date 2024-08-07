import React, { useState } from "react";
import Icon from "../common/Icon";

// Generic Modal Component
const Modal = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 bg-white rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="font-bold text-red-500">
            X
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

// Specific Modal Content for "تاریخچه"
const HistoryModalContent = () => (
  <>
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between">
        <span>در انتظار تایید</span>
        <span>مبلغ</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
      </div>
    </div>
    <div className="p-4 bg-red-100 rounded-md">
      <div className="flex justify-between">
        <span>رد</span>
        <span>مبلغ</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
        <span>علت رد</span>
      </div>
    </div>
    <div className="p-4 bg-blue-100 rounded-md">
      <div className="flex justify-between">
        <span>در انتظار ارسال سند واریز</span>
        <span>مبلغ</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
      </div>
    </div>
    <div className="p-4 bg-green-100 rounded-md">
      <div className="flex justify-between">
        <span>انجام شده</span>
        <span>مبلغ</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ</span>
        <span>واریز مستقیم؟ واریز به حساب کارگزاری</span>
      </div>
    </div>
  </>
);

// Specific Modal Content for "درخواست سهم"
const ShareRequestModalContent = () => (
  <div className="space-y-4">
    <div>
      <label>کل موجودی سبد (پرتفوی و نقد):</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-full p-2 border"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div>
      <label>درصد توافق شده:</label>
      <div className="flex justify-between">
        <span className="w-full p-2 border">30</span>
        <span>درصد</span>
      </div>
    </div>
    <div>
      <label>مبلغ سهم سرمایه گذاران:</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-full p-2 border"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div>
      <label>مبلغ درخواست شده:</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-full p-2 border"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div>
      <label>مبلغ باقیمانده:</label>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-full p-2 border"
          value="10000000"
          readOnly
        />
        <span>ریال</span>
      </div>
    </div>
    <div className="flex justify-between">
      <label>تاریخ:</label>
      <input type="text" className="p-2 border" value="1398/03/12" readOnly />
    </div>
    <button className="w-full p-2 text-white bg-green-500 rounded">
      ثبت درخواست سهم
    </button>
  </div>
);

const PortfolioManagerPaymentRequest = () => {
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(true);
  const [isShareRequestModalVisible, setShareRequestModalVisible] =
    useState(true);

  const handleTransactionIconClick = () => {
    setHistoryModalVisible(true);
  };

  const handleDollarBagIconClick = () => {
    setShareRequestModalVisible(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalVisible(false);
  };

  const handleCloseShareRequestModal = () => {
    setShareRequestModalVisible(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="p-4 bg-green-500 shadow-md">
        <div className="flex justify-center mb-4 text-lg font-bold sm:mb-8 sm:text-xl">
          <label className="mx-2 font-bold">شماره سبد: </label>
          <span>10022</span>
        </div>
        <div className="flex flex-col items-start justify-between mb-4 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="mb-2 sm:mb-0">
            <label className="font-semibold">سرمایه گذار: </label>
            <span>علی عظیمی</span>
          </div>
          <div className="">
            <label className="font-semibold">میزان سرمایه: </label>
            <span> 100000000</span>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex justify-center px-4 py-2 bg-gray-200">
            <Icon className="mx-2" name="messages2" size={32} />
            <Icon className="mx-2" name="call" size={32} />
            <Icon className="mx-2" name="eye" size={32} />
            <Icon
              className="mx-2"
              name="transactionicon"
              size={32}
              onClick={handleTransactionIconClick}
            />
            <Icon
              className="mx-2"
              name="dollarbag"
              size={32}
              onClick={handleDollarBagIconClick}
            />
          </div>
        </div>
      </div>

      {/* Render History Modal */}
      <Modal
        isVisible={isHistoryModalVisible}
        onClose={handleCloseHistoryModal}
        title="درخواست سهم مشارکت (شماره سبد)"
      >
        <HistoryModalContent />
      </Modal>

      {/* Render Share Request Modal */}
      <Modal
        isVisible={isShareRequestModalVisible}
        onClose={handleCloseShareRequestModal}
        title="درخواست سهم از سبد (شماره سبد)"
      >
        <ShareRequestModalContent />
      </Modal>
    </div>
  );
};

export default PortfolioManagerPaymentRequest;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";

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
    case "در انتظار ارسال سند واریز":
      return "bg-blue-300";
    case "انجام شده":
      return "bg-green-300";
    case "رد":
      return "bg-red-300";
    default:
      return "bg-bg-gray-300";
  }
};

const IncreaseCapitalHistoryModal = ({ basket, handleEyeIconClick }) => (
  <div className="">
    {basket.increaseCapitalHistory.map((incaptreq, index) => (
      <div
        key={index}
        className={`p-4 mb-1 ${getStatusColor(
          incaptreq.increaseCapitalStatus
        )}`}
      >
        <div className="flex justify-between mb-1">
          <span className="font-bold">وضعیت:</span>
          <span>{incaptreq.increaseCapitalStatus}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">تاریخ:</span> {incaptreq.date}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">
            {incaptreq.directIncreaseCapital
              ? "واریز مستقیم"
              : "واریز به حساب کارگزاری"}
          </span>
          <button
            onClick={(event) => handleEyeIconClick(event, basket, incaptreq)}
          >
            <Icon className="mx-2" name="eye" size={32} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const RequestIncreaseCapitalModal = ({
  basket,
  handleConfirm,
  handleReject,
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">درخواست افزایش سرمایه:</div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4">
      <div className="mb-2">مبلغ:</div>
      <div className="flex items-center">
        <input
          type="text"
          value="10.000.000"
          className="w-full p-2 text-left border border-gray-300 rounded"
          readOnly
        />
        <span className="mr-2">ریال</span>
      </div>
    </div>
    <div className="mb-4">
      <div className="mb-2">تاریخ:</div>
      <input
        type="text"
        value="1398/03/12"
        className="w-full p-2 border border-gray-300 rounded"
        readOnly
      />
    </div>
    <div className="mb-4 space-y-2">
      <div className="flex items-center">
        <input type="radio" name="depositMethod" className="mr-2" />
        <span>واریز به‌صورت مستقیم</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="depositMethod" className="mr-2" />
        <span>واریز به حساب کارگزاری</span>
      </div>
    </div>
    <div className="flex justify-between">
      <button
        onClick={handleConfirm}
        className="w-24 px-4 py-2 text-white bg-green-500 rounded"
      >
        تایید
      </button>
      <button
        onClick={handleReject}
        className="w-24 px-4 py-2 text-white bg-red-500 rounded"
      >
        رد
      </button>
    </div>
  </div>
);

const RejectedIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">شماره سبد (رد شده)</div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="flex justify-between">
        <span>مبلغ:</span>
        <span>10.000.000 ریال</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ:</span>
        <span>1398/03/12</span>
      </div>
      <div>واریز به‌صورت مستقیم</div>
    </div>
    <div className="mb-4 space-y-2">
      <div>پیام سرمایه‌گذار :</div>
      <div>علت رد :</div>
      <div>پیام سبدگردان :</div>
    </div>
    <button className="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded">
      بازگشت
    </button>
  </div>
);

const ConfirmedIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">شماره سبد (تایید شده)</div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="flex justify-between">
        <span>مبلغ:</span>
        <span>10.000.000 ریال</span>
      </div>
      <div className="flex justify-between">
        <span>تاریخ:</span>
        <span>1398/03/12</span>
      </div>
      <div>واریز به‌صورت مستقیم</div>
    </div>
    <div className="mb-4 space-y-2">
      <div>پیام سرمایه‌گذار :</div>
      <div>پیام سبدگردان :</div>
      <div>سند واریز:</div>
    </div>
    <div className="h-32 p-4 mb-4 border-2 border-gray-300 rounded-lg"></div>
    <button className="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded">
      بازگشت
    </button>
  </div>
);

const UploadIncreaseCapitalDocumentModal = ({ basket, handleEyeIconClick }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">
        بررسی سند واریز سبد (شماره سبد)
      </div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4">
      <div className="h-48 p-4 border-2 border-gray-300 rounded-lg"></div>
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="نوشتن توضیحات..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex justify-between">
      <button className="w-24 px-4 py-2 text-white bg-green-500 rounded">
        تایید
      </button>
      <button className="w-24 px-4 py-2 text-white bg-red-500 rounded">
        رد
      </button>
    </div>
  </div>
);

const ConfirmingIncreaseCapitalModal = () => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">تایید درخواست افزایش سرمایه</div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>لطفا سند واریز وجه را بارگزاری کنید.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>نیازی به اسکن سند واریز نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="approvalOption" className="ml-2" />
        <span>
          این سری تایید می‌شود ولی بهتر است برای سری‌های بعد قبل از تصمیم هماهنگ
          کنید.
        </span>
      </div>
    </div>
    <div className="mb-4">
      <div className="mb-2">متن خطاب به سرمایه‌گذار</div>
      <textarea className="w-full h-24 p-2 border border-gray-300 rounded resize-none"></textarea>
    </div>
    <button className="w-full px-4 py-2 text-white bg-green-500 rounded">
      تایید درخواست
    </button>
  </div>
);

const RejectingIncreaseCapitalModal = () => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xl text-blue-500">رد درخواست افزایش سرمایه</div>
      <div className="text-2xl text-blue-500">&gt;</div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>باتوجه به روند بازار زمان مناسبی جهت افزایش سرمایه نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>مبلغ سرمایه زیاد است (ریسک بالایی دارد).</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>تاریخ صحیح نیست.</span>
      </div>
      <div className="flex items-center">
        <input type="radio" name="rejectionReason" className="ml-2" />
        <span>سایر دلایل</span>
      </div>
    </div>
    <div className="mb-4">
      <div className="mb-2">نوشتن توضیحات...</div>
      <textarea className="w-full h-24 p-2 border border-gray-300 rounded resize-none"></textarea>
    </div>
    <button className="w-full px-4 py-2 text-white bg-red-500 rounded">
      رد
    </button>
  </div>
);

const PortfolioManagerIncreaseCapital = () => {
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
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const [selectedBasket, setSelectedBasket] = useState(null);
  const [incaptreq, setIncaptreq] = useState();
  const [
    isIncreaseCapitalHistoryModalVisible,
    setIncreaseCapitalHistoryModalVisible,
  ] = useState(false);

  const [
    isRequestIncreaseCapitalModalVisible,
    setRequestIncreaseCapitalModalVisible,
  ] = useState(false);

  const [
    isRejectedIncreaseCapitalModalVisible,
    setRejectedIncreaseCapitalModalVisible,
  ] = useState(false);
  const [
    isConfirmedIncreaseCapitalModalVisible,
    setConfirmedIncreaseCapitalModalVisible,
  ] = useState(false);
  const [
    isUploadIncreaseCapitalDocumentModalVisible,
    setUploadIncreaseCapitalDocumentModalVisible,
  ] = useState(false);

  const [isConfirmingModalVisible, setConfirmingModalVisible] = useState(false);
  const [isRejectingModalVisible, setRejectingModalVisible] = useState(false);



  const handleEyeIconClick = (event, basket, incaptreq) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncaptreq(incaptreq);
    if (incaptreq.increaseCapitalStatus === "رد") {
      // setSelectedBasket(basket);
      // setSharereq(sharereq);
      setRejectedIncreaseCapitalModalVisible(true);
    } else if (incaptreq.increaseCapitalStatus === "انجام شده") {
      // setSelectedBasket(basket);
      // setSharereq(sharereq);
      setConfirmedIncreaseCapitalModalVisible(true);
      } else if (incaptreq.increaseCapitalStatus === "در انتظار تایید") {
        //   // setSelectedBasket(basket);
        //   // setSharereq(sharereq);
          setRequestIncreaseCapitalModalVisible(true);
      } else if (
        incaptreq.increaseCapitalStatus === "در انتظار ارسال سند واریز"
      ) {
        //   setSelectedBasket(basket);
        // setSharereq(sharereq);
        setUploadIncreaseCapitalDocumentModalVisible(true);
      }
  };

    const closeRejectedIncreaseCapitalModal = () => {
      setRejectedIncreaseCapitalModalVisible(false);
    };

    const closeConfirmedIncreaseCapitalModalModal = () => {
      setConfirmedIncreaseCapitalModalVisible(false);
    };

    const closeUploadIncreaseCapitalDocumentModal = () => {
      setUploadIncreaseCapitalDocumentModalVisible(false);
    };

        const closeRequestIncreaseCapitalModal = () => {
          setRequestIncreaseCapitalModalVisible(false);
        };
  const showIncreaseCapitalHistoryModal = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncreaseCapitalHistoryModalVisible(true);
  };

  const closeIncreaseCapitalHistoryModal = () => {
    setIncreaseCapitalHistoryModalVisible(false);
  }

const handleConfirmIncreaseCapital = () => {
  setRequestIncreaseCapitalModalVisible(false);
  setConfirmingModalVisible(true);
};

const handleRejectIncreaseCapital = () => {
  setRequestIncreaseCapitalModalVisible(false);
  setRejectingModalVisible(true);
};

const closeConfirmingModal = () => {
  setConfirmingModalVisible(false);
};

const closeRejectingModal = () => {
  setRejectingModalVisible(false);
};
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="p-4 mb-4 bg-green-500 shadow-md cursor-pointer"
          onClick={""}
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
                  showIncreaseCapitalHistoryModal(event, basket)
                }
              >
                <Icon className="mx-2" name="dollar" size={32} />
              </button>
              {/* <button onClick={""}>
                <Icon className="mx-2" name="capital" size={32} />
              </button> */}
            </div>
          </div>
        </div>
      ))}
      <Modal
        isVisible={isIncreaseCapitalHistoryModalVisible}
        onClose={closeIncreaseCapitalHistoryModal}
        title={`افزایش سرمایه`}
      >
        <IncreaseCapitalHistoryModal
          basket={selectedBasket}
          handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isRejectedIncreaseCapitalModalVisible}
        onClose={closeRejectedIncreaseCapitalModal}
        title={` رد `}
      >
        <RejectedIncreaseCapitalModal
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isConfirmedIncreaseCapitalModalVisible}
        onClose={closeConfirmedIncreaseCapitalModalModal}
        title={` رد `}
      >
        <ConfirmedIncreaseCapitalModal
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isUploadIncreaseCapitalDocumentModalVisible}
        onClose={closeUploadIncreaseCapitalDocumentModal}
        title={` درخواست سند `}
      >
        <UploadIncreaseCapitalDocumentModal
          basket={selectedBasket}
          // handleEyeIconClick={handleEyeIconClick}
        />
      </Modal>
      <Modal
        isVisible={isRequestIncreaseCapitalModalVisible}
        onClose={closeRequestIncreaseCapitalModal}
        title={` درخواست سند `}
      >
        <RequestIncreaseCapitalModal
          basket={selectedBasket}
          handleConfirm={handleConfirmIncreaseCapital}
          handleReject={handleRejectIncreaseCapital}
        />
      </Modal>
      <Modal
        isVisible={isConfirmingModalVisible}
        onClose={closeConfirmingModal}
        title={`تایید افزایش سرمایه`}
      >
        <ConfirmingIncreaseCapitalModal />
      </Modal>

      <Modal
        isVisible={isRejectingModalVisible}
        onClose={closeRejectingModal}
        title={`رد افزایش سرمایه`}
      >
        <RejectingIncreaseCapitalModal />
      </Modal>
    </div>
  );
};

export default PortfolioManagerIncreaseCapital;

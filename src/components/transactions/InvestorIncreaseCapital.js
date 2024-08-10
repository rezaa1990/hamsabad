import React, { useState, useContext } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
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

const RequestIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="">درخواست افزایش سرمایه</div>
);

const RejectedIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="">رد شده</div>
);

const ConfirmedIncreaseCapitalModal = ({ basket, handleEyeIconClick }) => (
  <div className="">تایید شده</div>
);

const UploadIncreaseCapitalDocumentModal = ({ basket, handleEyeIconClick }) => (
  <div className="">آپلود سند واریز</div>
);

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
        // } else if (sharereq.shareRequestStatus === "در انتظار تایید") {
        //   // setSelectedBasket(basket);
        //   // setSharereq(sharereq);
        //   setShareRequestModalVisible(true);
        } else if (incaptreq.increaseCapitalStatus === "در انتظار ارسال سند واریز") {
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

  const showIncreaseCapitalHistoryModal = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncreaseCapitalHistoryModalVisible(true);
  };

  const closeIncreaseCapitalHistoryModal = () => {
    setIncreaseCapitalHistoryModalVisible(false);
  };

  const showIncreaseCapitalRequest = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setRequestIncreaseCapitalModalVisible(true);
  };

  const closeIncreaseCapitalRequest = () => {
    setRequestIncreaseCapitalModalVisible(false);
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
              <button
                onClick={(event) => showIncreaseCapitalRequest(event, basket)}
              >
                <Icon className="mx-2" name="capital" size={32} />
              </button>
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
        isVisible={isRequestIncreaseCapitalModalVisible}
        onClose={closeIncreaseCapitalRequest}
        title={`درخواست افزایش سرمایه`}
      >
        <RequestIncreaseCapitalModal
          basket={selectedBasket}
          handleEyeIconClick={"handleEyeIconClick"}
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
    </div>
  );
};

export default InvestorIncreaseCapital;

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

const ConfirmIncreaseCapitalModal = ({
  onClose,
  onConfirm,
  handleUpdateBasket,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [messageToInvestor, setMessageToInvestor] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageToInvestor(event.target.value);
  };

  const handleSubmit = () => {
    let updateData = {};

    if (selectedOption === "upload") {
      updateData = {
        status: "درخواست سند واریز",
        approveDocSituation: "سند واریز را ارسال کنید",
      };
    } else if (selectedOption === "noUpload") {
      updateData = {
        status: "تایید",
      };
    } else if (selectedOption === "coordinate") {
      updateData = {
        status: "تایید",
        approveDocSituation:
          " این سری تایید میشود ولی بهتر است برای سری های بعد قبل از تصمیم هماهنگ کنید",
      };
    }

    onConfirm(selectedOption, messageToInvestor);
    handleUpdateBasket(updateData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white">
        <div className="flex mb-6">
          {" "}
          <button onClick={onClose} className="">
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold ">تایید درخواست افزایش سرمایه</h2>
        </div>
        <div className="mb-6 mr-8 space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span className="mr-2">لطفا سند واریز وجه را بارگذاری کنید.</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="noUpload"
              checked={selectedOption === "noUpload"}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span className="mr-2">نیازی به اسکن سند واریز نیست.</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="coordinate"
              checked={selectedOption === "coordinate"}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span className="mr-2">
              این سری تایید میشود ولی بهتر است برای سری های بعد قبل از تصمیم
              هماهنگ کنید.
            </span>
          </label>
        </div>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          placeholder="متن خطاب به سرمایه‌گذار"
          rows="3"
          value={messageToInvestor}
          onChange={handleMessageChange}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600"
          >
            تایید درخواست
          </button>
        </div>
      </div>
    </div>
  );
};

const RejectIncreaseCapitalModal = ({ onClose, onReject }) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onReject(reason, comment);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white">
        <div className="flex mb-8">
          {" "}
          <button onClick={onClose} className="">
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold ">رد درخواست افزایش سرمایه</h2>
        </div>
        <div className="mb-4 mr-8 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="reason"
              value="باتوجه به روند بازار زمان مناسبی جهت افزایش سرمایه نیست."
              checked={
                reason ===
                "باتوجه به روند بازار زمان مناسبی جهت افزایش سرمایه نیست."
              }
              onChange={handleReasonChange}
              className="ml-2"
            />
            <span>
              باتوجه به روند بازار زمان مناسبی جهت افزایش سرمایه نیست.
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="reason"
              value="مبلغ سرمایه زیاد است (ریسک بالایی دارد)."
              checked={reason === "مبلغ سرمایه زیاد است (ریسک بالایی دارد)."}
              onChange={handleReasonChange}
              className="ml-2"
            />
            <span>مبلغ سرمایه زیاد است (ریسک بالایی دارد).</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="reason"
              value="تاریخ صحیح نیست."
              checked={reason === "تاریخ صحیح نیست."}
              onChange={handleReasonChange}
              className="ml-2"
            />
            <span>تاریخ صحیح نیست.</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="reason"
              value="سایر دلایل"
              checked={reason === "سایر دلایل"}
              onChange={handleReasonChange}
              className="ml-2"
            />
            <span>سایر دلایل</span>
          </label>
        </div>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          placeholder="نوشتن توضیحات..."
          rows="3"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-8 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            رد
          </button>
        </div>
      </div>
    </div>
  );
};

const DepositDocumentIncreaseCapitalModal = ({
  onClose,
  onConfirm,
  onReject,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-gray-200">
        <div className="flex mb-4">
          <button onClick={onClose} className="ml-2">
            <Icon name="arrowright" size={16} />
          </button>
          <h2 className="text-xl font-bold">بررسی سند واریز سبد (شماره سبد)</h2>
        </div>
        <div
          className="mb-4 bg-white border border-gray-300"
          style={{ height: "200px" }}
        >
          {/* Placeholder for the deposit document image */}
        </div>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          placeholder="نوشتن توضیحات..."
          rows="2"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-between">
          <button
            onClick={() => onReject(comment)}
            className="px-8 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            رد
          </button>
          <button
            onClick={() => onConfirm(comment)}
            className="px-8 py-1 text-white bg-green-500 rounded hover:bg-green-600"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const showIncreaseCapitalHistoryModal = (event, basket) => {
    event.stopPropagation();
    setSelectedBasket(basket);
    setIncreaseCapitalHistoryModalVisible(true);
  };

  const closeIncreaseCapitalHistoryModal = () => {
    setIncreaseCapitalHistoryModalVisible(false);
  }

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
    </div>
  );
};

export default PortfolioManagerIncreaseCapital;

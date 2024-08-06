import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import AppContext from "../../contexts/AppContext";

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

  const [selectedBasket, setSelectedBasket] = useState(null);
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showDepositDocumentReviewModal, setShowDepositDocumentReviewModal] = useState(false);

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const handleBasketClick = (basket) => {
    if (basket.status === "در انتظار بررسی") {
      setSelectedBasket(basket);
    } else if (basket.status === "بررسی سند واریز") {
      setSelectedBasket(basket);
      setShowDepositDocumentReviewModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmForm(true);
  };

  const handleReject = () => {
    setShowRejectForm(true);
  };

  const handleConfirmRequest = (option, message) => {
    if (selectedBasket) {
      const updatedBaskets = baskets.map((basket) =>
        basket.id === selectedBasket.id
          ? {
              ...basket,
              status: option === "upload" ? "درخواست سند واریز" : "تایید",
              message: message,
            }
          : basket
      );
      setBaskets(updatedBaskets);
      setSelectedBasket(null);
      setShowConfirmForm(false);
    }
  };

  const handleRejectRequest = (reason, comment) => {
    if (selectedBasket) {
      const updatedBaskets = baskets.map((basket) =>
        basket.id === selectedBasket.id
          ? {
              ...basket,
              status: "رد",
              rejectionReason: reason,
              rejectionComment: comment,
            }
          : basket
      );
      setBaskets(updatedBaskets);
      setSelectedBasket(null);
      setShowRejectForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "در انتظار بررسی":
        return "bg-gray-300";
      case "درخواست سند واریز":
        return "bg-orange-300";
      case "بررسی سند واریز":
        return "bg-blue-300";
      case "تایید":
        return "bg-green-300";
      case "رد":
        return "bg-red-300";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={handleNavigate}
            className={`flex items-center ${
              isDarkMode
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold">افزایش سرمایه (شماره سبد)</h2>
        </div>

        {baskets.map((basket) => (
          <div
            key={basket.id}
            className={`mb-3 p-4 ${getStatusColor(
              basket.status
            )} cursor-pointer`}
            onClick={() => handleBasketClick(basket)}
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold">{basket.status}</span>
              <span>{basket.InvestAmount} ریال</span>
            </div>
            <div className="mb-2">{basket.depositDate}</div>
            <div className="flex items-center">
              <Icon name="eye" size={16} className="mr-2" />
              <span>
                {basket.paymentMethod === "مستقیم"
                  ? "واریز مستقیم"
                  : "واریز به حساب کارگزاری"}
              </span>
            </div>
            {basket.status === "رد" && (
              <div className="mt-2">علت رد: {basket.rejectionReason}</div>
            )}
          </div>
        ))}
      </div>

      {selectedBasket && selectedBasket.status === "در انتظار بررسی" && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div
            className={`w-full max-w-md p-6 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
          >
            <div className="flex mb-8">
              {" "}
              <button onClick={() => setSelectedBasket(null)} className="">
                <Icon className="ml-2" name="arrowright" size={20} />
              </button>
              <h2 className="text-xl font-bold ">درخواست افزایش سرمایه</h2>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">مبلغ:</label>
              <div className="text-center">
                <span
                  className={`p-2 w-full ${isDarkMode ? "bg-gray-600" : ""}`}
                >
                  {selectedBasket.InvestAmount}
                </span>

                <span className="p-2">ریال</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">تاریخ:</label>
              <div
                className={`text-center p-2 rounded ${
                  isDarkMode ? "bg-gray-600" : ""
                }`}
              >
                <span className="text-lg">{selectedBasket.depositDate}</span>
              </div>
            </div>
            <div className="my-8 font-medium text-center">
              <span>
                {selectedBasket.paymentMethod === "مستقیم"
                  ? "واریز به صورت مستقیم"
                  : "واریز به حساب کارگزاری"}
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleReject}
                className="px-8 py-1 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
              >
                رد
              </button>
              <button
                onClick={handleConfirm}
                className="px-8 py-1 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmForm && (
        <ConfirmForm
          onClose={() => setShowConfirmForm(false)}
          onConfirm={handleConfirmRequest}
          handleUpdateBasket={handleUpdateBasket}
        />
      )}

      {showRejectForm && (
        <RejectForm
          onClose={() => setShowRejectForm(false)}
          onReject={handleRejectRequest}
        />
      )}

      {showDepositDocumentReviewModal && (
        <DepositDocumentReviewModal
          onClose={() => setShowDepositDocumentReviewModal(false)}
          onConfirm={(message) => {
            const updatedBaskets = baskets.map((basket) =>
              basket.id === selectedBasket.id
                ? {
                    ...basket,
                    status: "تایید",
                    message: message,
                  }
                : basket
            );
            setBaskets(updatedBaskets);
            setSelectedBasket(null);
            setShowDepositDocumentReviewModal(false);
          }}
          onReject={(message) => {
            const updatedBaskets = baskets.map((basket) =>
              basket.id === selectedBasket.id
                ? {
                    ...basket,
                    status: "رد",
                    message: message,
                  }
                : basket
            );
            setBaskets(updatedBaskets);
            setSelectedBasket(null);
            setShowDepositDocumentReviewModal(false);
          }}
        />
      )}
    </div>
  );
};

const ConfirmForm = ({ onClose, onConfirm, handleUpdateBasket }) => {
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
        approveDocSituation: " این سری تایید میشود ولی بهتر است برای سری های بعد قبل از تصمیم هماهنگ کنید"
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

const RejectForm = ({ onClose, onReject }) => {
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

const DepositDocumentReviewModal = ({ onClose, onConfirm, onReject }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <div className="flex mb-4">
          <button onClick={onClose} className="ml-2">
            <Icon name="arrowright" size={16} />
          </button>
          <h2 className="text-xl font-bold">بررسی سند واریز سبد (شماره سبد)</h2>
        </div>
        <div className="mb-4 border border-gray-300 rounded-lg" style={{ height: '200px' }}>
          {/* Placeholder for the deposit document image */}
        </div>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          placeholder="نوشتن توضیحات..."
          rows="3"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-between">
          <button
            onClick={() => onReject(comment)}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            رد
          </button>
          <button
            onClick={() => onConfirm(comment)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerIncreaseCapital;
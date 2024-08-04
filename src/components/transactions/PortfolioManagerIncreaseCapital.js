import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";

const PortfolioManagerIncreaseCapital = () => {
  const navigate = useNavigate();
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [messageToInvestor, setMessageToInvestor] = useState("");

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const handleConfirm = () => {
    setShowConfirmForm(true);
  };

  const handleReject = () => {
    setShowRejectForm(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageToInvestor(event.target.value);
  };

  const handleConfirmRequest = () => {
    console.log("Selected option:", selectedOption);
    console.log("Message to investor:", messageToInvestor);
    setShowConfirmForm(false);
  };

  const handleCancel = () => {
    setShowConfirmForm(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={handleNavigate}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Icon name="arrowright" size={16} className="ml-4" />
          </button>
          <h2 className="text-xl font-bold">درخواست افزایش سرمایه:</h2>
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-2 mr-6 font-medium">مبلغ:</label>
            <div className="p-2 bg-gray-100 rounded">
              <span className="text-lg">۱۰۰۰۰۰۰۰ ریال</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 mr-6 font-medium">تاریخ:</label>
            <div className="p-2 bg-gray-100 rounded">
              <span className="text-lg">۱۴۰۳/۱۱/۲۳</span>
            </div>
          </div>
          <div className="mb-4 font-medium text-center">
            <span>واریز به صورت مستقیم</span>
          </div>
          <div className="mb-6 font-medium text-center">
            <span>واریز به حساب کارگزاری</span>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleReject}
              className="px-6 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
            >
              رد
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
            >
              تایید
            </button>
          </div>
        </form>
      </div>

      {showConfirmForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white">
            <div className="flex items-center mb-6">
              <button
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Icon name="arrowright" size={16} className="ml-4" />
              </button>
              <h2 className="text-xl font-bold">
                تایید درخواست افزایش سرمایه:
              </h2>
            </div>
            <div className="mb-6 mr-6 space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  value="upload"
                  checked={selectedOption === "upload"}
                  onChange={handleOptionChange}
                  className="form-radio"
                />
                <span className="mr-2">
                  لطفا سند واریز وجه را بارگذاری کنید.
                </span>
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
                  value="approveWithWarning"
                  checked={selectedOption === "approveWithWarning"}
                  onChange={handleOptionChange}
                  className="form-radio"
                />
                <span className="mr-2">
                  این سری تایید می‌شود ولی بهتر است برای سری‌های بعد قبل از
                  تصمیم هماهنگ کنید.
                </span>
              </label>
            </div>
            <div className="mb-6">
              <textarea
                className="w-full p-2 border resize-none"
                placeholder="متن خطاب به سرمایه‌گذار"
                rows="3"
                value={messageToInvestor}
                onChange={handleMessageChange}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmRequest}
                className="px-4 py-1 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
              >
                تایید درخواست
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectForm && (
        <RejectForm onClose={() => setShowRejectForm(false)} />
      )}
    </div>
  );
};

const RejectForm = ({ onClose }) => {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Rejection reason:", reason);
    console.log("Rejection comment:", comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">رد درخواست افزایش سرمایه</h2>
        <div className="mb-4 space-y-2">
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
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            رد
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagerIncreaseCapital;

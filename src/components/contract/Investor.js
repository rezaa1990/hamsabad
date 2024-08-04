import React, { useState, useRef, useEffect } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

const Investor = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editReasons, setEditReasons] = useState({
    initialAmount: false,
    percentage: false,
    dates: false,
    personalInfo: false,
    otherReasons: false,
  });
  const [editNotes, setEditNotes] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  // const [signature, setSignature] = useState("");
  const [hasPreviousSignature, setHasPreviousSignature] = useState(false); // این باید بر اساس داده‌های بک‌اند تنظیم شود

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleRejectModal = () => {
    setShowRejectModal(!showRejectModal);
  };

  const toggleEditRequestModal = () => {
    setShowEditRequestModal(!showEditRequestModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const toggleSignatureModal = () => {
    setShowSignatureModal(!showSignatureModal);
  };

  const handleReasonChange = (reason) => {
    setEditReasons((prev) => ({ ...prev, [reason]: !prev[reason] }));
  };

  const handleEditRequest = (e) => {
    e.preventDefault();
    console.log("Edit Reasons:", editReasons);
    console.log("Edit Notes:", editNotes);
    toggleEditRequestModal();
  };

  const handleTermsAccept = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const handleConfirmation = () => {
    if (hasPreviousSignature) {
      // ادامه با تایید نهایی
      console.log("قرارداد با امضای موجود تایید شد");
      toggleConfirmationModal();
    } else {
      toggleSignatureModal();
    }
  };

  const sigCanvas = useRef({});
  const sigContainerRef = useRef(null);

  useEffect(() => {
    if (sigContainerRef.current) {
      const width = sigContainerRef.current.offsetWidth;
      sigCanvas.current.width = width;
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSignatureSubmit = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("لطفا امضای خود را وارد کنید");
    } else {
      const signatureData = sigCanvas.current.toDataURL();
      console.log("امضا ثبت شد:", signatureData);
      setHasPreviousSignature(true);
      toggleSignatureModal();
      console.log("قرارداد با امضای جدید تایید شد");
      toggleConfirmationModal();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-start p-4 mb-2">
          <button
            onClick={handleNavigate}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Icon name="arrowright" size={16} className="ml-2" />
          </button>
          <h2 className="text-lg font-semibold text-center">بستن قرارداد</h2>
        </div>
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-3 space-y-10">
            <div className="text-center">
              <div className="font-medium">شماره قرارداد</div>
            </div>
            <div className="flex flex-col justify-between w-full sm:flex-row">
              <div className="text-right">
                <div className="font-medium ">تاریخ ثبت</div>
              </div>
              <div className="ml-16 text-right">
                <div className="font-medium ">سرمایه گذار</div>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full sm:flex-row">
              <div className="text-right">
                <div className="font-medium ">تاریخ ویرایش</div>
              </div>
              <div className="ml-16 text-right">
                <div className="font-medium ">سبدگردان</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">وضعیت</div>
            </div>
          </div>
          <div className="flex justify-center py-2 mb-3 border-t border-b border-gray-200">
            <button className="p-2">
              <Icon name="one" size={20} className="text-gray-600" />
            </button>
            <button className="p-2">
              <Icon name="messages2" size={20} className="text-gray-600" />
            </button>
            <button className="p-2">
              <Icon name="call" size={20} className="text-gray-600" />
            </button>
            <button className="p-2" onClick={toggleModal}>
              <Icon name="eye" size={26} className="text-gray-600" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              className="px-4 py-2 m-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
              onClick={toggleEditRequestModal}
            >
              درخواست اصلاح
            </button>
            <button
              className="px-4 py-2 m-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={toggleRejectModal}
            >
              رد
            </button>
            <button
              className="px-4 py-2 m-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
              onClick={toggleConfirmationModal}
            >
              تایید
            </button>
          </div>
        </div>
      </div>

      {/* Modal for viewing details */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-sm p-6 bg-white shadow-xl">
            <button
              onClick={toggleModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">اطلاعات سبدگردان:</h2>
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col space-y-2 text-right">
                  <div>
                    <span className="font-medium">نام و نام خانوادگی:</span>
                  </div>
                  <div>
                    <span className="font-medium">کد ملی:</span>
                  </div>
                  <div>
                    <span className="font-medium">شماره همراه:</span>
                  </div>
                  <div>
                    <span className="font-medium">تاریخ عضویت در هم سبد:</span>
                  </div>
                </div>
                <div className="w-24 h-32 mt-4 bg-gray-300 sm:mt-0 sm:mr-auto"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button onClick={toggleModal} className="p-2">
                <Icon name="arrowright" size={16} className="text-gray-700" />
              </button>

              <button className="p-2">
                <Icon name="messages2" size={24} className="text-gray-700" />
              </button>
              <button className="p-2">
                <Icon name="call" size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for rejection */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-sm p-6 bg-white shadow-xl">
            <button
              onClick={toggleRejectModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">علت رد:</h2>
              <form>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>از سرمایه‌گذاری منصرف شدم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>سبدگردان دیگری انتخاب کردم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>میخواهم بعدا سرمایه‌گذاری کنم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>روی درصد توافق نکردیم.</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="rejectReason" className="ml-2" />
                    <span>سایر دلایل</span>
                  </label>
                </div>
                <textarea
                  className="w-full p-2 mt-4 border border-gray-300 rounded"
                  placeholder="نوشتن توضیحات..."
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={toggleRejectModal}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    ثبت رد
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Request Modal */}
      {showEditRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white shadow-xl">
            <button
              onClick={toggleEditRequestModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">علت درخواست اصلاح:</h2>
              <form onSubmit={handleEditRequest}>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.initialAmount}
                      onChange={() => handleReasonChange("initialAmount")}
                    />
                    <span>مبلغ سرمایه اولیه را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.percentage}
                      onChange={() => handleReasonChange("percentage")}
                    />
                    <span>میزان درصد را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.dates}
                      onChange={() => handleReasonChange("dates")}
                    />
                    <span>تاریخ‌ها را اصلاح کنید.</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.personalInfo}
                      onChange={() => handleReasonChange("personalInfo")}
                    />
                    <span>اطلاعات من درست نیست</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={editReasons.otherReasons}
                      onChange={() => handleReasonChange("otherReasons")}
                    />
                    <span>سایر دلایل</span>
                  </label>
                </div>
                <textarea
                  className="w-full p-2 mt-4 border border-gray-300 rounded"
                  placeholder="نوشتن توضیحات..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={toggleEditRequestModal}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    درخواست اصلاح
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white shadow-xl">
            <button
              onClick={toggleConfirmationModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <p className="mb-4">
                اینجانب نام و نام خانوادگی
                <br />
                ضمن مطالعه موارد اشاره شده در قرارداد شماره فلان
              </p>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={isTermsAccepted}
                  onChange={handleTermsAccept}
                />
                <span>بندهای موجود در این قرارداد مورد تایید می‌باشد.</span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={toggleConfirmationModal}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  بازگشت
                </button>
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  disabled={!isTermsAccepted}
                  onClick={handleConfirmation}
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white shadow-xl">
            <button
              onClick={toggleSignatureModal}
              className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
            >
              <Icon name="close" size={24} />
            </button>
            <div className="text-right">
              <h2 className="mb-4 text-xl font-semibold">
                امضای خود را وارد کنید:
              </h2>
              <p className="mb-2 text-red-500">
                (توجه کنید که امضا قابل تغییر نیست)
              </p>
              <div
                ref={sigContainerRef}
                className="relative mb-4 border border-gray-300"
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: "signature-canvas",
                  }}
                />
                <span className="absolute text-gray-400 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
                  محل امضا
                </span>
                <button
                  onClick={clearSignature}
                  className="absolute p-1 bg-white border border-gray-300 rounded top-2 left-2 hover:bg-gray-100"
                >
                  <Icon name="eraser" size={20} />
                </button>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={toggleSignatureModal}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleSignatureSubmit}
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investor;

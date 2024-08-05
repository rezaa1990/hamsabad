import React, { useContext } from "react";
import { useBaskets } from "../../contexts/BasketsContext";
// import { useAuth } from "../../contexts/AuthContext";
import AppContext from "../../contexts/AppContext";

const ApproveDocument = () => {
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

  const { Baskets, handleUpdateBaskets } = useBaskets();
  // const { role } = useAuth();
  console.log("approvedoc_userrole", role);

  // اگر نقش کاربر "portfolioManager" نیست، هیچ چیزی نمایش نده
  if (role !== "portfolioManager") {
    return null;
  }

  const basketsToApprove = Baskets.find((inv) => inv.documentAccept === false);

  // اگر هیچ سرمایه‌گذاری برای تایید وجود ندارد، هیچ چیزی نمایش نده
  if (!basketsToApprove) {
    return null;
  }

  const handleApprove = () => {
    const updatedBaskets = {
      ...basketsToApprove,
      documentAccept: true,
      status: "تایید نهایی",
    };

    handleUpdateBaskets(updatedBaskets);
    alert("سرمایه‌گذاری با موفقیت تایید شد.");
  };

  const handleReject = () => {
    const updatedBaskets = {
      ...basketsToApprove,
      documentAccept: false,
      status: "رد شده",
    };

    handleUpdateBaskets(updatedBaskets);
    alert("سرمایه‌گذاری رد شد.");
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-right">
        بررسی سند واریز سبد (شماره {basketsToApprove.contractNumber})
      </h2>
      <div className="flex items-center justify-center h-48 mb-4 border-2 border-gray-300">
        {/* اینجا می‌توانید تصویر واقعی را نمایش دهید */}
        <div className="w-full h-full bg-gray-200"></div>
      </div>
      <textarea
        readOnly
        value={basketsToApprove.description || ""}
        className="w-full h-24 p-2 mb-4 border border-gray-300 rounded-md resize-none"
        placeholder="توضیحات..."
      ></textarea>
      <div className="flex justify-between">
        <button
          onClick={handleApprove}
          className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
        >
          تایید
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
        >
          رد
        </button>
      </div>
    </div>
  );
};

export default ApproveDocument;

import React, { useState } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";

const Investor = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 mb-2">
          <button
            onClick={handleNavigate}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Icon name="arrowright" size={16} className="ml-2" />
          </button>
          <h2 className="text-lg font-semibold text-center">بستن قرارداد</h2>
        </div>
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-3 space-y-2">
            <div className="text-center">
              <div className="font-medium">شماره قرارداد</div>
            </div>
            <div className="flex flex-col justify-around w-full sm:flex-row">
              <div className="text-right">
                <div className="font-medium ">تاریخ ثبت</div>
              </div>
              <div className="text-right">
                <div className="font-medium ">سرمایه گذار</div>
              </div>
            </div>
            <div className="flex flex-col justify-around w-full sm:flex-row">
              <div className="text-right">
                <div className="font-medium ">تاریخ ویرایش</div>
              </div>
              <div className="text-right">
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
            <button className="px-4 py-2 m-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600">
              درخواست اصلاح
            </button>
            <button className="px-4 py-2 m-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
              رد
            </button>
            <button className="px-4 py-2 m-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
              تایید
            </button>
          </div>
        </div>
      </div>

      {/* Modal Implementation */}
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
    </div>
  );
};

export default Investor;

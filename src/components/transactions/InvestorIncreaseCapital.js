import React, { useState } from "react";
import Icon from "../common/Icon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const InvestorIncreaseCapital = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 mb-2">
          <div className="flex">
            <button
              onClick={handleNavigate}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Icon name="arrowright" size={16} className="ml-4" />
            </button>
            <span className="text-lg">افزایش سرمایه</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="p-4 bg-green-500">
            <div className="mb-4 text-center">
              <span className="text-xl font-bold">شماره سبد</span>
              <div className="mt-2">12345</div>
            </div>

            <div className="flex mb-4">
              <span>سبدگردان: نام سبدگردان</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span>میزان سرمایه:</span>
              <div className="flex">
                <button className="p-2 bg-gray-200">
                  <Icon name="messages2" size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gray-200">
                  <Icon name="call" size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gray-200">
                  <Icon name="eye" size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={toggleForm}>
                <Icon className="mx-1" name="dollar" size={28} />
              </button>
              <Icon className="mx-1" name="capital" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* نمایش فرم درخواست افزایش سرمایه به صورت مودال */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-8 mx-auto bg-white shadow-lg">
            <div className="flex mb-4">
              <button
                onClick={toggleForm}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Icon name="arrowright" size={16} className="ml-4" />
              </button>
              <h2 className="text-xl font-bold ">درخواست افزایش سرمایه:</h2>
            </div>
            <form>
              <div className="mb-4">
                <label className="block mb-2">مبلغ:</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border"
                    defaultValue="10,000,000"
                  />
                  <span className="mr-2">ریال</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">تاریخ:</label>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  calendar={persian}
                  locale={persian_fa}
                  className=""
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="ml-2" />
                  واریز به صورت مستقیم
                </label>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="ml-2" />
                  واریز به حساب کارگزاری
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded"
                >
                  ثبت درخواست افزایش سرمایه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نمایش مودال قیمت */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">قیمت افزایش سرمایه</h2>
            <p>مبلغ سرمایه‌گذاری: 10,000,000 ریال</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorIncreaseCapital;

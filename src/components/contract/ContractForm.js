import React, { useState } from "react";
import * as icons from "../../assets/icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const ContractForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [initialCapital, setInitialCapital] = useState("");
  const [commissionRate, setCommissionRate] = useState(25);
  const [contractDuration, setContractDuration] = useState(25);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportingPeriod, setReportingPeriod] = useState("ماهانه");
  const [showModal, setShowModal] = useState(false);
  const [newClause, setNewClause] = useState("");
  const [clauses, setClauses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleIncrement = (setter, value, max = 100) => {
    setter((prev) => Math.min(prev + 1, max));
  };

  const handleDecrement = (setter, value, min = 0) => {
    setter((prev) => Math.max(prev - 1, min));
  };

  const dateToWords = (date) => {
    if (!(date instanceof Date)) {
      return "";
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  };

  const handleAddClause = () => {
    setShowModal(true);
    setEditingIndex(null);
    setNewClause("");
  };

  const handleClauseSubmit = () => {
    if (newClause.trim()) {
      if (editingIndex !== null) {
        const updatedClauses = [...clauses];
        updatedClauses[editingIndex] = newClause.trim();
        setClauses(updatedClauses);
      } else {
        setClauses([...clauses, newClause.trim()]);
      }
      setNewClause("");
      setEditingIndex(null);
    }
    setShowModal(false);
  };

  const handleEditClause = (index) => {
    setEditingIndex(index);
    setNewClause(clauses[index]);
    setShowModal(true);
  };

  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteClause = () => {
    const newClauses = clauses.filter((_, i) => i !== deleteIndex);
    setClauses(newClauses);
    setShowDeleteConfirmation(false);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } min-h-screen pb-20 pt-8 relative`}
    >
      <div
        className={`flex w-full m-4 text-lg font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <img
          onClick={handleBack}
          src={icons.arrowright}
          alt="Back"
          className="w-4 h-6 ml-3 cursor-pointer"
        />
        <span>بستن قرارداد</span>
      </div>

      {!showForm ? (
        <div
          className={`flex flex-col items-center w-full p-6 text-center border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-gray-100 text-gray-800"
          } cursor-pointer`}
          onClick={toggleForm}
        >
          <div className="mb-4">
            <img
              src={icons.contract}
              alt="Contract Icon"
              className="w-12 h-12"
            />
          </div>
          <span className="text-md">بستن قرارداد جدید</span>
        </div>
      ) : (
        <div
          className={`p-8 mx-auto border ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-800"
          } rounded-lg max-w-xl`}
        >
          <div
            className={`flex items-center justify-between mb-8 text-sm border-b pb-4 ${
              isDarkMode
                ? "text-white border-gray-600"
                : "text-gray-800 border-gray-300"
            }`}
          >
            <span>شماره قرارداد:</span>
            <span>عدد تولید شده نرم‌افزار:</span>
          </div>

          {/* اطلاعات سرمایه گذار */}
          <div className="relative p-4 mb-8 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800 bg-white"
              }`}
            >
              اطلاعات سرمایه گذار
            </div>
            <div className="mt-8">
              {["نام", "نام خانوادگی", "کد ملی", "شماره همراه"].map((label) => (
                <div className="flex items-center mb-4" key={label}>
                  <label className="w-32">{label}:</label>
                  <input
                    type="text"
                    className="flex-1 p-2 ml-4 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* اطلاعات قرارداد */}
          <div className="relative p-4 mb-8 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800 bg-white"
              }`}
            >
              اطلاعات قرارداد
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <label className="w-32 text-right">سرمایه اولیه:</label>
                <div className="flex items-center flex-1">
                  <input
                    type="text"
                    className="flex-1 p-2 text-left border rounded"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(e.target.value)}
                  />
                  <span className="mr-2">ریال</span>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">میزان کارمزد:</label>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col h-full">
                    <button
                      onClick={() =>
                        handleIncrement(setCommissionRate, commissionRate)
                      }
                      className={`px-1 border ${
                        isDarkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      } rounded-t flex-1`}
                      style={{ height: "100%" }}
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleDecrement(setCommissionRate, commissionRate)
                      }
                      className={`border ${
                        isDarkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      } rounded-b flex-1`}
                      style={{ height: "100%" }}
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-3 text-center border rounded"
                    value={commissionRate}
                    readOnly
                  />
                  <span className="mr-2">درصد</span>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">مدت قرارداد:</label>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col h-full">
                    <button
                      onClick={() =>
                        handleIncrement(setContractDuration, contractDuration)
                      }
                      className={`px-1 border ${
                        isDarkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      } rounded-t flex-1`}
                      style={{ height: "100%" }}
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleDecrement(setContractDuration, contractDuration)
                      }
                      className={`border ${
                        isDarkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      } rounded-b flex-1`}
                      style={{ height: "100%" }}
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-3 text-center border rounded"
                    value={contractDuration}
                    readOnly
                  />
                  <span className="mr-2">ماه</span>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">از تاریخ:</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  value={startDate}
                  onChange={setStartDate}
                  format="YYYY/MM/DD"
                  inputClass="flex-1 p-2 border rounded text-left cursor-pointer"
                  containerClassName="flex-1"
                />
              </div>
              <div className="mr-32 text-sm text-right text-gray-500">
                {dateToWords(startDate)}
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">تا تاریخ:</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  value={endDate}
                  onChange={setEndDate}
                  format="YYYY/MM/DD"
                  inputClass="flex-1 p-2 border rounded text-left cursor-pointer"
                  containerClassName="flex-1"
                />
              </div>
              <div className="mr-32 text-sm text-right text-gray-500">
                {dateToWords(endDate)}
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">بازه گزارش‌دهی:</label>
                <select
                  className="flex-1 p-2 text-right border rounded"
                  value={reportingPeriod}
                  onChange={(e) => setReportingPeriod(e.target.value)}
                >
                  <option value="ماهانه">ماهانه</option>
                  <option value="فصلی">فصلی</option>
                  <option value="سالانه">سالانه</option>
                </select>
              </div>
            </div>
          </div>

          {/* تبصره‌های اختیاری قرارداد */}
          <div className="relative p-4 border border-gray-300 rounded-lg">
            <div
              className={`border absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 ${
                isDarkMode ? "text-white bg-gray-700" : "text-gray-800 bg-white"
              }`}
            >
              تبصره‌های اختیاری قرارداد
            </div>
            <div className="mt-2 mb-4">
              <img
                src={icons.contract}
                alt="Contract Icon"
                className="w-12 h-12 m-auto cursor-pointer"
                onClick={handleAddClause}
              />
            </div>
            {clauses.map((clause, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="ml-2">تبصره اختیاری {index + 1}:</span>
                <input
                  type="text"
                  value={clause}
                  readOnly
                  className="flex-1 p-2 border rounded"
                />
                <img
                  src={icons.pencil}
                  alt="edit"
                  className="w-6 h-6 ml-2 cursor-pointer"
                  onClick={() => handleEditClause(index)}
                />
                <img
                  src={icons.Delete}
                  alt="Delete"
                  className="w-6 h-6 ml-2 cursor-pointer"
                  onClick={() => handleDeleteConfirmation(index)}
                />
              </div>
            ))}
          </div>

          {/* Modal for adding new clause */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-4 bg-white rounded-lg">
                <h2 className="mb-2 text-lg font-bold">
                  {editingIndex !== null ? "ویرایش تبصره" : "افزودن تبصره جدید"}
                </h2>
                <input
                  type="text"
                  value={newClause}
                  onChange={(e) => setNewClause(e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="متن تبصره را وارد کنید"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleClauseSubmit}
                    className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                  >
                    تایید
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    لغو
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirmation modal */}
          {showDeleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-4 bg-white rounded-lg">
                <h2 className="mb-2 text-lg font-bold">تایید حذف تبصره</h2>
                <p>آیا از حذف این تبصره اطمینان دارید؟</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleDeleteClause}
                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                  >
                    بله، حذف شود
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    لغو
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContractForm;

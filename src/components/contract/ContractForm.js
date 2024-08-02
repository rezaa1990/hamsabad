import React, { useState} from 'react';
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import * as icons from "../../assets/icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

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
  const [showPreview, setShowPreview] = useState(false);
  const [investorInfo, setInvestorInfo] = useState({
    name: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
  });

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

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleSaveDraft = () => {
    const draftContent = `
قرارداد سرمایه‌گذاری

اطلاعات سرمایه گذار:
نام: ${investorInfo.name}
نام خانوادگی: ${investorInfo.lastName}
کد ملی: ${investorInfo.nationalCode}
شماره همراه: ${investorInfo.phoneNumber}

اطلاعات قرارداد:
سرمایه اولیه: ${initialCapital} ریال
میزان کارمزد: ${commissionRate}٪
مدت قرارداد: ${contractDuration} ماه
از تاریخ: ${
      startDate instanceof Date
        ? startDate.toLocaleDateString("fa-IR")
        : "تاریخ نامعتبر"
    }
تا تاریخ: ${
      endDate instanceof Date
        ? endDate.toLocaleDateString("fa-IR")
        : "تاریخ نامعتبر"
    }
بازه گزارش‌دهی: ${reportingPeriod}

تبصره‌های اختیاری قرارداد:
${clauses.map((clause, index) => `تبصره ${index + 1}: ${clause}`).join("\n")}
    `;

    const blob = new Blob([draftContent], { type: "text/plain;charset=UTF-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "پیش‌نویس_قرارداد.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const PreviewModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`p-8 rounded-lg w-3/4 max-h-[90vh] overflow-y-auto ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            پیش‌نمایش قرارداد
          </h2>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">اطلاعات سرمایه گذار</h3>
            <p>نام: {investorInfo.name}</p>
            <p>نام خانوادگی: {investorInfo.lastName}</p>
            <p>کد ملی: {investorInfo.nationalCode}</p>
            <p>شماره همراه: {investorInfo.phoneNumber}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">اطلاعات قرارداد</h3>
            <p>سرمایه اولیه: {initialCapital} ریال</p>
            <p>میزان کارمزد: {commissionRate}٪</p>
            <p>مدت قرارداد: {contractDuration} ماه</p>
            <p>
              از تاریخ:{" "}
              {startDate instanceof Date
                ? startDate.toLocaleDateString("fa-IR")
                : "تاریخ نامعتبر"}
            </p>
            <p>
              تا تاریخ:{" "}
              {endDate instanceof Date
                ? endDate.toLocaleDateString("fa-IR")
                : "تاریخ نامعتبر"}
            </p>
            <p>بازه گزارش‌دهی: {reportingPeriod}</p>
          </div>

          {clauses.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold">
                تبصره‌های اختیاری قرارداد
              </h3>
              {clauses.map((clause, index) => (
                <p key={index}>
                  تبصره {index + 1}: {clause}
                </p>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleClosePreview}
              className={`px-4 py-2 font-bold text-white rounded ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              بستن پیش‌نمایش
            </button>
          </div>
        </div>
      </div>
    );
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
              {Object.entries(investorInfo).map(([key, value]) => (
                <div className="flex items-center mb-4" key={key}>
                  <label className="w-32">
                    {key === "name"
                      ? "نام"
                      : key === "lastName"
                      ? "نام خانوادگی"
                      : key === "nationalCode"
                      ? "کد ملی"
                      : "شماره همراه"}
                    :
                  </label>
                  <input
                    type="text"
                    className={`flex-1 p-2 ml-4 border rounded ${
                      isDarkMode
                        ? "bg-gray-600 border-gray-500"
                        : "bg-white border-gray-300"
                    }`}
                    value={value}
                    onChange={(e) =>
                      setInvestorInfo({
                        ...investorInfo,
                        [key]: e.target.value,
                      })
                    }
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
                    className={`flex-1 p-2 text-left border rounded ${
                      isDarkMode
                        ? "bg-gray-600 border-gray-500"
                        : "bg-white border-gray-300"
                    }`}
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
                    className={`flex-1 p-3 text-center border rounded ${
                      isDarkMode
                        ? "bg-gray-600 border-gray-500"
                        : "bg-white border-gray-300"
                    }`}
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
                    className={`flex-1 p-3 text-center border rounded ${
                      isDarkMode
                        ? "bg-gray-600 border-gray-500"
                        : "bg-white border-gray-300"
                    }`}
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
                  inputClass={`flex-1 p-2 border rounded text-left cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
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
                  inputClass={`flex-1 p-2 border rounded text-left cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                  containerClassName="flex-1"
                />
              </div>
              <div className="mr-32 text-sm text-right text-gray-500">
                {dateToWords(endDate)}
              </div>
              <div className="flex items-center">
                <label className="w-32 text-right">بازه گزارش‌دهی:</label>
                <select
                  className={`flex-1 p-2 text-right border rounded ${
                    isDarkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
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
                  className={`flex-1 p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                />
                <img
                  src={icons.pencil}
                  alt="edit"
                  className="w-6 h-6 m-2 cursor-pointer"
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

          <div className="justify-between mt-8">
            <div className="flex justify-center m-1">
              <button
                className="w-40 px-1 py-1 mx-1 font-bold text-white bg-[#891BBF] rounded hover:bg-opacity-90"
                onClick={handleSaveDraft}
              >
                ذخیره پیش‌نویس
              </button>
              <button
                className="w-40 px-1 py-1 mx-1 font-bold text-white bg-[#F7AF3E] rounded hover:bg-opacity-90"
                onClick={handlePreview}
              >
                پیش‌نمایش
              </button>
            </div>
            <div className="flex justify-center">
              <button className="w-40 px-1 py-1 mx-1 font-bold text-white bg-[#1BBF89] rounded hover:bg-opacity-90">
                تایید و ارسال
              </button>
              <button
                onClick={handleBack}
                className="w-40 px-1 py-1 mx-1 font-bold text-white bg-[#DB524B] rounded hover:bg-opacity-90"
              >
                لغو و بازگشت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new clause */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="mb-4 text-lg font-bold">
              {editingIndex !== null ? "ویرایش تبصره" : "افزودن تبصره جدید"}
            </h2>
            <input
              type="text"
              value={newClause}
              onChange={(e) => setNewClause(e.target.value)}
              className={`w-full p-2 mb-4 border rounded ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500"
                  : "bg-white border-gray-300"
              }`}
              placeholder="متن تبصره را وارد کنید"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClauseSubmit}
                className={`px-2 m-1 text-white rounded ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                تایید
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`px-2 m-1 rounded ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
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
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="mb-4 text-lg font-bold">تایید حذف تبصره</h2>
            <p>آیا از حذف این تبصره اطمینان دارید؟</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleDeleteClause}
                className={`px-2 m-1 text-white rounded ${
                  isDarkMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className={`px-2 m-1 rounded ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && <PreviewModal />}
    </div>
  );
}; 

export default ContractForm;
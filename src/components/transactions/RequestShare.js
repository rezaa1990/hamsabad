import React, { useState } from "react";
import { createTransaction } from "../../services/transactionService";

const RequestShare = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({ type: "request", amount });
      alert("درخواست سهم با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error requesting share:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">درخواست سهم</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">مقدار</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          ثبت
        </button>
      </form>
    </div>
  );
};

export default RequestShare;

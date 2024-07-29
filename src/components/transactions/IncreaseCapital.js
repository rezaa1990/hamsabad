import React, { useState } from "react";
import { createTransaction } from "../../services/transactionService";

const IncreaseCapital = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({ type: "increase", amount });
      alert("سرمایه با موفقیت افزایش یافت");
    } catch (error) {
      console.error("Error increasing capital:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">افزایش سرمایه</h2>
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
          افزایش
        </button>
      </form>
    </div>
  );
};

export default IncreaseCapital;

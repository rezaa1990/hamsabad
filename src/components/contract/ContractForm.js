import React, { useState } from "react";
import { contractService } from "../../services/contractService";

const ContractForm = () => {
  const [contract, setContract] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contractService.createContract(contract);
    alert("قرارداد جدید با موفقیت ایجاد شد");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ایجاد قرارداد جدید</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">نام قرارداد</label>
          <input
            type="text"
            value={contract.name}
            onChange={(e) => setContract({ ...contract, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">توضیحات</label>
          <textarea
            value={contract.description}
            onChange={(e) =>
              setContract({ ...contract, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          ایجاد قرارداد
        </button>
      </form>
    </div>
  );
};

export default ContractForm;

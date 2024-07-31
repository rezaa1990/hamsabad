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
      <h2 className="mb-4 text-2xl font-bold">ایجاد قرارداد جدید</h2>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
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
        <button type="submit" className="p-2 text-white bg-green-600 rounded">
          ایجاد قرارداد
        </button>
      </form>
    </div>
  );
};

export default ContractForm;

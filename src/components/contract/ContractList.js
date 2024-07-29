import React, { useState, useEffect } from "react";
import { contractService } from "../../services/contractService";

const ContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const data = await contractService.getContracts();
      setContracts(data);
    };
    fetchContracts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">لیست قراردادها</h2>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-bold">{contract.name}</h3>
            <p>{contract.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractList;

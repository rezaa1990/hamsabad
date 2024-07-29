import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contractService } from "../../services/contractService";

const ContractDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      const data = await contractService.getContractById(id);
      setContract(data);
    };
    fetchContract();
  }, [id]);

  if (!contract) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">جزئیات قرارداد</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-bold">{contract.name}</h3>
        <p>{contract.description}</p>
      </div>
    </div>
  );
};

export default ContractDetails;

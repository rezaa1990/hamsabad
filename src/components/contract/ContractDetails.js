// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { contractService } from "../../services/contractService";

// const ContractDetails = () => {
//   const { id } = useParams();
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       const data = await contractService.getContractById(id);
//       setContract(data);
//     };
//     fetchContract();
//   }, [id]);

//   if (!contract) {
//     return <p>در حال بارگذاری...</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">جزئیات قرارداد</h2>
//       <div className="p-6 bg-white rounded shadow-md">
//         <h3 className="text-xl font-bold">{contract.name}</h3>
//         <p>{contract.description}</p>
//       </div>
//     </div>
//   );
// };

// export default ContractDetails;

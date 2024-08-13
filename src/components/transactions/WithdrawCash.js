// import React, { useState } from "react";
// import { createTransaction } from "../../services/transactionService";

// const WithdrawCash = () => {
//   const [amount, setAmount] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createTransaction({ type: "withdraw", amount });
//       alert("مبلغ با موفقیت برداشت شد");
//     } catch (error) {
//       console.error("Error withdrawing cash:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">برداشت وجه</h2>
//       <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
//         <div className="mb-4">
//           <label className="block mb-1">مقدار</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button type="submit" className="p-2 text-white bg-green-600 rounded">
//           برداشت
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WithdrawCash;

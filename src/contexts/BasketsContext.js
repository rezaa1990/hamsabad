// import React, { createContext, useContext, useState } from "react";

// export const BasketsContext = createContext();

// export const BasketsProvider = ({ children }) => {
//   const [baskets, setBaskets] = useState([
//     {
//       id: 1,
//       contractNumber: "CN-2023-001",
//       InvestAmount: 1000000,
//       status: "در انتظار بررسی",
//       investor: "سرمایه‌گذار 1",
//       investorPhone: "09121234567",
//       portfolioManager: "سبدگردان 1",
//       portfolioManagerPhone: "09124681012",
//       depositDate: "2024-08-04",
//       paymentMethod: "مستقیم",
//     },
//     {
//       id: 2,
//       contractNumber: "CN-2023-002",
//       InvestAmount: 2000000,
//       status: "درخواست سند واریز",
//       investor: "سرمایه‌گذار 1",
//       investorPhone: "09121234567",
//       portfolioManager: "سبدگردان 1",
//       portfolioManagerPhone: "09124681012",
//       depositDate: "2024-08-04",
//       paymentMethod: "مستقیم",
//     },
//     {
//       id: 3,
//       contractNumber: "CN-2023-003",
//       InvestAmount: 3000000,
//       status: "بررسی سند واریز",
//       investor: "سرمایه‌گذار 1",
//       investorPhone: "09121234567",
//       portfolioManager: "سبدگردان 1",
//       portfolioManagerPhone: "09124681012",
//       depositDate: "2024-08-04",
//       paymentMethod: "مستقیم",
//     },
//     {
//       id: 4,
//       contractNumber: "CN-2023-004",
//       InvestAmount: 4000000,
//       status: "تایید",
//       investor: "سرمایه‌گذار 1",
//       investorPhone: "09121234567",
//       portfolioManager: "سبدگردان 1",
//       portfolioManagerPhone: "09124681012",
//       depositDate: "2024-08-04",
//       paymentMethod: "مستقیم",
//     },
//     {
//       id: 5,
//       contractNumber: "CN-2023-005",
//       InvestAmount: 5000000,
//       status: "رد",
//       investor: "سرمایه‌گذار 1",
//       investorPhone: "09121234567",
//       portfolioManager: "سبدگردان 1",
//       portfolioManagerPhone: "09124681012",
//       depositDate: "2024-08-04",
//       paymentMethod: "مستقیم",
//     },
//   ]);

//   const handleUpdateBasket = (updatedBasket) => {
//     setBaskets((prevBaskets) =>
//       prevBaskets.map((inv) =>
//         inv.id === updatedBasket.id ? updatedBasket : inv
//       )
//     );
//   };

//   return (
//     <BasketsContext.Provider value={{ baskets, handleUpdateBasket }}>
//       {children}
//     </BasketsContext.Provider>
//   );
// };

// export const useBaskets = () => useContext(BasketsContext);

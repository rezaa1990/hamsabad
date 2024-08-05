// import React, { createContext, useState } from "react";

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);

//   const addNotification = (message, type = "info") => {
//     const id = Date.now();
//     setNotifications((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => removeNotification(id), 5000);
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) =>
//       prev.filter((notification) => notification.id !== id)
//     );
//   };

//   const value = {
//     notifications,
//     addNotification,
//     removeNotification,
//   };

//   return (
//     <NotificationContext.Provider value={value}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

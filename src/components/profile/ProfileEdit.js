// import React, { useState, useContext } from "react";
// // import { useAuth } from "../../hooks/useAuth";
// import AppContext from "../../contexts/AppContext";

// const ProfileEdit = () => {
//    const {
//      isAuthenticated,
//      setIsAuthenticated,
//      role,
//      setRole,
//      login,
//      logout,
//      baskets,
//      setBaskets,
//      handleUpdateBasket,
//      phoneNumber,
//      setPhoneNumber,
//      nationalId,
//      setNationalId,
//      isDarkMode,
//      setIsDarkMode,
//      toggleDarkMode,
//    } = useContext(AppContext);
  
//   // const { user, updateUser } = useAuth();
//   const [profile, setProfile] = useState({
//     // username: user.username,
//     // email: user.email,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // await updateUser(profile);
//     alert("پروفایل با موفقیت به‌روز شد");
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">ویرایش پروفایل</h2>
//       <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
//         <div className="mb-4">
//           <label className="block mb-1">نام کاربری</label>
//           <input
//             type="text"
//             value={profile.username}
//             onChange={(e) =>
//               setProfile({ ...profile, username: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">ایمیل</label>
//           <input
//             type="email"
//             value={profile.email}
//             onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button type="submit" className="p-2 text-white bg-green-600 rounded">
//           ذخیره تغییرات
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileEdit;

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const ProfileEdit = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(profile);
    alert("پروفایل با موفقیت به‌روز شد");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ویرایش پروفایل</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">نام کاربری</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">ایمیل</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;

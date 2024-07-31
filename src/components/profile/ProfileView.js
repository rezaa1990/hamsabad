import React from "react";
import { useAuth } from "../../hooks/useAuth";

const ProfileView = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">پروفایل</h2>
      <div className="p-6 bg-white rounded shadow-md">
        <p>
          <strong>نام کاربری:</strong> {user.username}
        </p>
        <p>
          <strong>ایمیل:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileView;

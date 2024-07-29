import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4">بازیابی رمز عبور</h2>
        <div className="mb-4">
          <label className="block mb-1">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          ارسال لینک بازیابی
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

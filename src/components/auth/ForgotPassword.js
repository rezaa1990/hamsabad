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
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded shadow-md"
      >
        <h2 className="mb-4 text-2xl">بازیابی رمز عبور</h2>
        <div className="mb-4">
          <label className="block mb-1">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="p-2 text-white bg-green-600 rounded">
          ارسال لینک بازیابی
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

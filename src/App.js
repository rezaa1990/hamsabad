import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextProvider from "./contexts/ContextProvider"; // اضافه شده
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./contexts/ThemeContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import BottomMenu from "./components/common/BottomMenu";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ContractList from "./components/contract/ContractList";
import ContractForm from "./components/contract/ContractForm";
import ContractDetails from "./components/contract/ContractDetails";
import IncreaseCapital from "./components/transactions/IncreaseCapital";
import WithdrawCash from "./components/transactions/WithdrawCash";
import RequestShare from "./components/transactions/RequestShare";
import ProfileEdit from "./components/profile/ProfileEdit";
import GetSms from "./components/auth/Getsms";
import SetPassword from "./components/auth/Setpassword";
import InformationEntry from "./components/profile/InformationEntry";
import UserProfile from "./components/profile/UserProfile";

function App() {
  return (
    <ContextProvider>
      {" "}
      {/* استفاده از ContextProvider */}
      <Router>
        <AppContent />
      </Router>
    </ContextProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header />
      <div className="relative flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-4 pb-20 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getsms" element={<GetSms />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/informationentry" element={<InformationEntry />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contractform" element={<ContractForm />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contracts/new" element={<ContractForm />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
            <Route path="/increase-capital" element={<IncreaseCapital />} />
            <Route path="/withdraw-cash" element={<WithdrawCash />} />
            <Route path="/request-share" element={<RequestShare />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Routes>
        </main>
      </div>
      {isAuthenticated && <BottomMenu />}
      <Footer />
    </div>
  );
}

export default App;

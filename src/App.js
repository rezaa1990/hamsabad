import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import ProfileView from "./components/profile/ProfileView";
import ProfileEdit from "./components/profile/ProfileEdit";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ isAuthenticated }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-4 pb-20">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contracts/new" element={<ContractForm />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
            <Route path="/increase-capital" element={<IncreaseCapital />} />
            <Route path="/withdraw-cash" element={<WithdrawCash />} />
            <Route path="/request-share" element={<RequestShare />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Routes>
        </main>
      </div>
      {
      // isAuthenticated && 
      <BottomMenu />}
      <Footer />
    </div>
  );
}

export default App;

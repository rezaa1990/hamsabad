import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar isDarkMode={isDarkMode} />}
          <main className="flex-1 p-4 pb-20">
            <Routes>
              <Route
                path="/login"
                element={<Login isDarkMode={isDarkMode} />}
              />
              <Route
                path="/register"
                element={<Register isDarkMode={isDarkMode} />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword isDarkMode={isDarkMode} />}
              />
              <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
              <Route
                path="/contracts"
                element={<ContractList isDarkMode={isDarkMode} />}
              />
              <Route
                path="/contracts/new"
                element={<ContractForm isDarkMode={isDarkMode} />}
              />
              <Route
                path="/contracts/:id"
                element={<ContractDetails isDarkMode={isDarkMode} />}
              />
              <Route
                path="/increase-capital"
                element={<IncreaseCapital isDarkMode={isDarkMode} />}
              />
              <Route
                path="/withdraw-cash"
                element={<WithdrawCash isDarkMode={isDarkMode} />}
              />
              <Route
                path="/request-share"
                element={<RequestShare isDarkMode={isDarkMode} />}
              />
              <Route
                path="/profile"
                element={<ProfileView isDarkMode={isDarkMode} />}
              />
              <Route
                path="/profile/edit"
                element={<ProfileEdit isDarkMode={isDarkMode} />}
              />
            </Routes>
          </main>
        </div>
        {
          // isAuthenticated &&
          <BottomMenu isDarkMode={isDarkMode} />
        }
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;

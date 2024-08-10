import React, {useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppProvider from "./contexts/AppProvider";
import AppContext from "./contexts/AppContext";
// import { useAuth } from "./hooks/useAuth";
// import { useTheme } from "./contexts/ThemeContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import BottomMenu from "./components/common/BottomMenu";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ContractList from "./components/contract/ContractList";
// import ContractForm from "./components/contract/ContractForm";
import ContractDetails from "./components/contract/ContractDetails";
// import IncreaseCapital from "./components/transactions/IncreaseCapital";
import WithdrawCash from "./components/transactions/WithdrawCash";
import RequestShare from "./components/transactions/RequestShare";
import ProfileEdit from "./components/profile/ProfileEdit";
import GetSms from "./components/auth/Getsms";
import SetPassword from "./components/auth/Setpassword";
import InformationEntry from "./components/profile/InformationEntry";
import UserProfile from "./components/profile/UserProfile";
import UserRoleComponent from "./components/contract/UserRoleComponent";
import InvestRoleComponent from "./components/transactions/InvestRoleComponent";
// import DepositReceipt from "./components/notification/DepositReceipt";
import InvestmentApproval from "./components/notification/DepositReceipt";
import PaymentRequestRole from "./components/paymentrequest/PaymentRequestRole";
import CashRequestRole from "./components/cashrequest/CashRequestRole";

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isDarkMode } = useContext(AppContext);
  // const { isDarkMode } = AppProvider();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : ""
      }`}
    >
      <Header />
      <div className="relative flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 pb-20 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getsms" element={<GetSms />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/informationentry" element={<InformationEntry />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<UserRoleComponent />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/notification" element={<InvestmentApproval />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
            <Route path="/increasecapital" element={<InvestRoleComponent />} />
            <Route path="/share-request" element={<PaymentRequestRole />} />
            <Route path="/cashrequest" element={<CashRequestRole />} />
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

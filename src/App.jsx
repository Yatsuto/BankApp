import backgroundImage from './assets/Background.jpg';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import BankDashboard from './components/LandingPage.jsx';
import TransactionPage from './components/TransactionPage.jsx';
import TransferPage from './components/TransferPage.jsx';
import DepositPage from './components/DepositPage.jsx';
import WithdrawPage from './components/withdrawPage.jsx';
import OpenAccountPage from './components/OpenAccountPage.jsx';

// Optional wrapper for passing userId from route state
const BankDashboardWrapper = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  return <BankDashboard userId={userId} />;
};

function App() {
  return (
    <Router basename="/BankApp">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />

      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<BankDashboardWrapper />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/open-account" element={<OpenAccountPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

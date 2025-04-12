import backgroundImage from './assets/Background.jpg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import BankDashboard from './components/LandingPage.jsx';
import TransactionPage from './components/TransactionPage.jsx';
import TransferPage from './components/TransferPage.jsx';
import DepositPage from './components/DepositPage.jsx';
import WithdrawPage from './components/withdrawPage.jsx';

function App() {
  return (
    <Router>
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
      
      <RegisterPage></RegisterPage>
    </Router>
  );
}

export default App;

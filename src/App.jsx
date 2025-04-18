// Import background image asset
import backgroundImage from './assets/Background.jpg';

// Import React Router components for page routing
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import individual page components
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import BankDashboard from './components/LandingPage.jsx';
import TransactionPage from './components/TransactionPage.jsx';
import TransferPage from './components/TransferPage.jsx';
import DepositPage from './components/DepositPage.jsx';
import WithdrawPage from './components/withdrawPage.jsx';
import OpenAccountPage from './components/OpenAccountPage.jsx';
import ZellePage from './components/ZellePage.jsx';

// Wrapper to extract userId from navigation state and pass it to BankDashboard
const BankDashboardWrapper = () => {
  const location = useLocation(); // Access current route location
  const userId = location.state?.userId; // Extract userId if available
  return <BankDashboard userId={userId} />; // Pass userId as a prop to BankDashboard
};

// Main app component
function App() {
  return (
    // Router provides navigation capabilities
    <Router basename="/BankApp"> 
      
      {/* Set a fixed full-screen background image */}
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
          zIndex: -1, // Send background behind all content
        }}
      />

      {/* Main content container with routing logic */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          {/* Define route for login page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route for new user registration */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard route, uses wrapper to pass userId */}
          <Route path="/dashboard" element={<BankDashboardWrapper />} />

          {/* Route to display user's transaction history */}
          <Route path="/transactions" element={<TransactionPage />} />

          {/* Route for transferring money between accounts */}
          <Route path="/transfer" element={<TransferPage />} />

          {/* Route for opening a new account */}
          <Route path="/open-account" element={<OpenAccountPage />} />

          {/* Route for depositing funds */}
          <Route path="/deposit" element={<DepositPage />} />

          {/* Route for withdrawing funds */}
          <Route path="/withdraw" element={<WithdrawPage />} />

          {/* Route for Zelle transfers */}
          <Route path="/zelle" element={<ZellePage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export App component for use in main entry point (index.js)
export default App;

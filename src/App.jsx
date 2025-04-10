import backgroundImage from './assets/Background.jpg';
import Header from "./components/Header.jsx";
import Box from "./components/Box.jsx";
import Loginform from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import landingPage from "./components/LandingPage.jsx";
import BankDashboard from './components/LandingPage.jsx';
import TransactionPage from './components/TransactionPage.jsx';
import TransferPage from './components/TransferPage.jsx';


function App() {
  return (

    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed', // Key for consistent background
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >

      <TransactionPage accountId={2}/>

      {/*<Header></Header>
      <Box>
        <Loginform></Loginform>
        <RegisterForm></RegisterForm>
      </Box>*/}

    </div>
  );
}
export default App;
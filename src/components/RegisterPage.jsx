import React from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';


const handleRegister = async () => {
  try {
    const res = await fetch('https://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: username,
        password,
        first_name: "John",
        last_name: "Doe",
        ssn: "123-45-6789"
      })
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ User registered successfully!');
    } else {
      alert(`❌ Error: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert('🚨 Failed to register');
  }
};

const RegisterPage = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', paddingTop: '4rem', color: 'white' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>DigiBank</h1>
        <p>Your digital banking experience</p>
      </header>

      {/* Register Form */}
      <div style={{
        width: "300px",
        background: "transparent",
        borderRadius: "20px",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
        color: "white"
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Registeration</h2>

        {/* First Name */}
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <input type="text" placeholder="First Name" style={inputStyle} />
        </div>

        {/* Last Name */}
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <input type="text" placeholder="Last Name" style={inputStyle} />
        </div>

        {/* Username */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
           <IonIcon icon={personOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input type="text" placeholder="Username" style={inputWithIconStyle} />
        </div>

        {/* Password */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <IonIcon icon={lockClosedOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input type="password" placeholder="Password" style={inputWithIconStyle} />
        </div>

        {/* Checkbox */}
        <div style={{ width: '100%', fontSize: '0.8rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            I agree to the terms & conditions
          </label>
        </div>

        {/* Register Button */}
        <button style={buttonStyle}>Register</button>

        {/* Footer */}
        <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
        Already have an account? <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid white",
  borderRadius: "20px",
  backgroundColor: "transparent",
  color: "white",
  boxSizing: "border-box"
};

const inputWithIconStyle = {
  ...inputStyle,
  paddingRight: "40px"
};

const iconStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  color: 'white'
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer"
};

export default RegisterPage;

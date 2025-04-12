import React from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <header style={{ textAlign: 'center', marginTop: '6rem', color: 'white' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>DigiBank</h1>
        <p>Your digital banking experience</p>
      </header>

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
        <h2 style={{ marginBottom: '1rem' }}>Login</h2>

        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <IonIcon icon={personOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input
            type="text"
            placeholder="Username"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              border: "1px solid white",
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: "white",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <IonIcon icon={lockClosedOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              border: "1px solid white",
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: "white",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Remember me
          </label>
          <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Forgot Password?</a>
        </div>

        <button style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "20px",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Login
        </button>

        <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
        Don’t have an account? <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

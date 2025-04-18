// Import React and required hooks
import { useState } from 'react';
import { IonIcon } from '@ionic/react';

// Import icons for visual feedback
import { mailOutline, lockClosedOutline } from 'ionicons/icons';

// Import navigation helpers
import { Link, useNavigate } from 'react-router-dom';

// Login page component
const LoginPage = () => {
  // State for user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Login handler function triggered on button click
  const handleLogin = async () => {
    const loginPayload = { email, password }; // Package user input

    try {
      // Send login request to backend
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();

      // If login is successful, store user ID and redirect to dashboard
      if (res.ok && data.user && data.user.id) {
        alert("Login successful!");
        localStorage.setItem("userId", data.user.id);
        navigate("/dashboard");
      } else {
        // Show error message from backend if login fails
        alert(`Error: ${data.error || "Invalid login response"}`);
      }
    } catch (err) {
      // Handle request failure
      console.error(err);
      alert("Failed to login");
    }
  };

  return (
    <>
      {/* Header with brand and slogan */}
      <header style={{ textAlign: 'center', marginTop: '6rem', color: 'white' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>DigiBank</h1>
        <p>Your digital banking experience</p>
      </header>

      {/* Login form container */}
      <div style={{
        width: "300px",
        background: "transparent",
        borderRadius: "20px",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        position: "absolute",
        top: "45%",
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

        {/* Email input field with icon */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <IonIcon icon={mailOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Password input field with icon */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <IonIcon icon={lockClosedOutline} style={{ position: 'absolute', top: '15px', right: '15px', color: 'white' }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember me and forgot password row */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Remember me
          </label>
          <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Forgot Password?</a>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          style={{
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

        {/* Link to registration page */}
        <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
          Don&apos;t have an account? <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

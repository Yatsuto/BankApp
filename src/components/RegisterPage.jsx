import { useState } from "react"
import { IonIcon } from "@ionic/react"
import { mailOutline, lockClosedOutline } from "ionicons/icons"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return regex.test(password)
  }

  const allowedDomains = [
    "gmail.com",
    "fiu.edu",
    "icloud.com",
    "outlook.com",
    "yahoo.com",
  ]
  const domain = email.split("@")[1]

  const handleRegister = async () => {
    if (!allowedDomains.includes(domain)) {
      alert("Email must be from a valid provider (e.g., gmail.com, fiu.edu)")
      return
    }
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
      )
      return
    }

    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.user && data.user.id) {
        alert("✅ User registered successfully!")
        localStorage.setItem("userId", data.user.id)
        navigate("/dashboard")
      } else {
        alert(`❌ Error: ${data.error || "Invalid response"}`)
      }
    } catch (err) {
      console.error(err)
      alert("🚨 Failed to register")
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <header
        style={{ textAlign: "center", paddingTop: "4rem", color: "white" }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>DigiBank</h1>
        <p>Your digital banking experience</p>
      </header>

      <div
        style={{
          width: "300px",
          background: "transparent",
          borderRadius: "20px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          position: "absolute",
          top: "63%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Registration</h2>

        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          style={{ position: "relative", width: "100%", marginBottom: "1rem" }}
        >
          <IonIcon
            icon={mailOutline}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              color: "white",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputWithIconStyle}
          />
        </div>

        <div
          style={{ position: "relative", width: "100%", marginBottom: "1rem" }}
        >
          <IonIcon
            icon={lockClosedOutline}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              color: "white",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputWithIconStyle}
          />
        </div>

        <div
          style={{ width: "100%", fontSize: "0.8rem", marginBottom: "1rem" }}
        >
          <label style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" style={{ marginRight: "5px" }} />I agree to
            the terms & conditions
          </label>
        </div>

        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>

        <div style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "white", textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid white",
  borderRadius: "20px",
  backgroundColor: "transparent",
  color: "white",
  boxSizing: "border-box",
}

const inputWithIconStyle = {
  ...inputStyle,
  paddingRight: "40px",
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
}

export default RegisterPage

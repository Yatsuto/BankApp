// Import React hooks and navigation helper
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for opening a new bank account
const OpenAccountPage = () => {
  // Retrieve userId from localStorage (used for backend reference)
  const userId = localStorage.getItem("userId");

  // Form state for selected account type and optional selection (debit card or savings plan)
  const [accountType, setAccountType] = useState("Checking");
  const [option, setOption] = useState("");

  // Message shown for user feedback (success or error)
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for redirecting after success

  // Main handler for submitting new account request
  const handleOpenAccount = async () => {
    // Simple validation to ensure both dropdowns are filled
    if (!userId || !accountType || !option) {
      setMessage("Please select all options.");
      return;
    }

    try {
      // POST request to backend with account type and default balance of 0
      const res = await fetch("http://localhost:3000/api/accounts/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          account_type: accountType,
          initial_balance: 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open account");

      // Show confirmation and redirect after a short delay
      setMessage("✅ Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error creating account:", err);
      setMessage(err.message); // Display any caught errors to user
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Open a New Account</h1>

      {/* Form container with frosted glass styling */}
      <div className="bg-white/10 p-6 rounded-lg w-full max-w-md backdrop-blur-md border border-white/20">
        
        {/* Account type selection (Checking or Savings) */}
        <label className="block mb-2 font-semibold">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => {
            setAccountType(e.target.value); // Update selection
            setOption(""); // Reset second dropdown
          }}
          className="w-full bg-gray-900 text-white p-2 rounded mb-6 border border-white/20"
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>

        {/* Contextual dropdown for each account type */}
        <label className="block mb-2 font-semibold">
          {accountType === "Checking" ? "Would you like a Debit Card?" : "Enroll in a Savings Plan?"}
        </label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full bg-gray-900 text-white p-2 rounded mb-6 border border-white/20"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Submit button triggers account creation */}
        <button
          onClick={handleOpenAccount}
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
        >
          Open Account
        </button>

        {/* User feedback message (success or error) */}
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default OpenAccountPage;

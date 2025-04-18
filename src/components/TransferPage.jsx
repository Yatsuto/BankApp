// Import core React hooks
import React, { useState, useEffect } from 'react';

// Component to transfer funds between user accounts
const TransferMoney = ({ userId: propUserId }) => {
  // Use passed userId or fallback to stored value
  const userId = propUserId || localStorage.getItem("userId");

  // State variables to track user accounts and transfer input
  const [accounts, setAccounts] = useState([]);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  // Fetch all user accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/accounts/${userId}`);
        if (!response.ok) throw new Error('Failed to load accounts');
        const data = await response.json();
        setAccounts(data); // Save to local state
      } catch (err) {
        console.error('❌ Error loading accounts:', err);
        alert('Failed to load accounts.');
      }
    };

    if (userId) fetchAccounts();
  }, [userId]);

  // Handle the actual transfer POST request
  const handleTransfer = async () => {
    // Basic validation
    if (!fromAccountId || !toAccountId || !amount || fromAccountId === toAccountId) {
      alert('Please complete all fields and make sure the accounts are different.');
      return;
    }

    try {
      // Send transfer request to backend
      const response = await fetch('http://localhost:3000/api/accounts/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          from_account_id: fromAccountId,
          to_account_id: toAccountId,
          amount,
          note,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Transfer failed');
      }

      // Reset form on success
      alert(`Transfer of $${amount} successful!`);
      setAmount('');
      setNote('');
      setFromAccountId('');
      setToAccountId('');
    } catch (err) {
      console.error('❌ Transfer failed:', err.message);
      alert(`Transfer failed: ${err.message}`);
    }
  };

  // Only allow Checking or Savings as transfer sources
  const eligibleFromAccounts = accounts.filter(acc =>
    ['Checking', 'Savings'].includes(acc.account_type)
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md rounded-lg text-white border border-white/10 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Transfer Money</h2>

      {/* From Account Selector */}
      <label className="block mb-4">
        <span className="block mb-2">From Account</span>
        <select
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
        >
          <option value="">Select account</option>
          {eligibleFromAccounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_type} ••••{acc.account_number.slice(-4)}
            </option>
          ))}
        </select>
      </label>

      {/* To Account Selector */}
      <label className="block mb-4">
        <span className="block mb-2">To Account</span>
        <select
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
        >
          <option value="">Select account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_type} ••••{acc.account_number.slice(-4)}
            </option>
          ))}
        </select>
      </label>

      {/* Amount input */}
      <label className="block mb-4">
        <span className="block mb-2">Amount</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
          placeholder="e.g., 100.00"
        />
      </label>

      {/* Optional note */}
      <label className="block mb-6">
        <span className="block mb-2">Note (optional)</span>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
          placeholder="e.g., Rent, groceries"
        />
      </label>

      {/* Transfer Button */}
      <button
        onClick={handleTransfer}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-400 hover:to-green-500 transition-all"
      >
        Transfer
      </button>
    </div>
  );
};

export default TransferMoney;

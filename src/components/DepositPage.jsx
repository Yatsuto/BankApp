import React, { useState, useEffect } from 'react';

const DepositPage = ({ userId: propUserId }) => {
  const userId = propUserId || localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch(`http://localhost:3000/api/accounts/${userId}`);
      const data = await res.json();
      setAccounts(data);
    };
    fetchAccounts();
  }, [userId]);

  const handleDeposit = async () => {
    if (!selectedAccount || !amount || !checkNumber) {
      setMessage('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/accounts/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_id: selectedAccount,
          amount,
          note,
          checkNumber,
        }),
      });

      if (!response.ok) throw new Error('Deposit failed');
      setMessage('✅ Deposit successful!');
    } catch (err) {
      console.error('❌ Deposit error:', err);
      setMessage('Deposit failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 text-white border border-white/20 rounded-lg mt-10 backdrop-blur-md">
      <h2 className="text-xl font-semibold mb-4">Deposit Check</h2>

      <label className="block mb-4">
        <span>Deposit Into</span>
        <select
          className="w-full p-2 rounded bg-gray-800 border border-white/10"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_type} ••••{acc.account_number.slice(-4)}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span>Check Number</span>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 border border-white/10"
          value={checkNumber}
          onChange={(e) => setCheckNumber(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <span>Amount</span>
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full p-2 rounded bg-gray-800 border border-white/10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <span>Note (optional)</span>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 border border-white/10"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <button
        onClick={handleDeposit}
        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg mt-2"
      >
        Deposit
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default DepositPage;

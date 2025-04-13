import React, { useState, useEffect } from 'react';

const WithdrawPage = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [otp, setOtp] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch(`http://localhost:3000/api/accounts/${userId}`);
      const data = await res.json();
      const eligible = data.filter(a => ['Checking', 'Savings'].includes(a.account_type));
      setAccounts(eligible);
    };
    fetchAccounts();
  }, [userId]);

  const handleWithdraw = async () => {
    if (!selectedAccount || !amount) {
      alert('Select an account and enter an amount');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/accounts/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_id: selectedAccount,
          amount,
          note
        })
      });

      if (!res.ok) throw new Error('Withdraw failed');
      const { otp, expires_at } = await res.json();
      setOtp(otp);
      setExpiresAt(new Date(expires_at));
    } catch (err) {
      console.error('❌ Withdraw error:', err);
      alert('Withdraw failed');
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-2xl font-semibold mb-6">Withdraw Funds</h1>

      <label className="block mb-4">
        <span>Account</span>
        <select
          value={selectedAccount}
          onChange={e => setSelectedAccount(e.target.value)}
          className="w-full mt-2 p-2 bg-gray-900 border border-white/10 rounded"
        >
          <option value="">Select account</option>
          {accounts.map((a, i) => (
            <option key={i} value={a.id}>
              {a.account_type} ••••{a.account_number.slice(-4)} (${parseFloat(a.balance).toFixed(2)})
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span>Amount</span>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full mt-2 p-2 bg-gray-900 border border-white/10 rounded"
          placeholder="e.g. 50.00"
        />
      </label>

      <label className="block mb-6">
        <span>Note (optional)</span>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="w-full mt-2 p-2 bg-gray-900 border border-white/10 rounded"
        />
      </label>

      <button
        onClick={handleWithdraw}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 rounded-lg"
      >
        Withdraw
      </button>

      {/* ✅ OTP Popup */}
      {otp && (
        <div className="mt-8 p-6 bg-black/50 border border-white/10 rounded-lg text-center shadow-lg">
          <h2 className="text-xl font-semibold mb-2">One-Time ATM Code</h2>
          <p className="text-3xl font-bold tracking-widest text-green-400">{otp}</p>
          <p className="mt-2 text-sm text-gray-400">
            Valid until: {expiresAt.toLocaleTimeString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">Enter this code at the ATM to complete your withdrawal.</p>
        </div>
      )}
    </div>
  );
};

export default WithdrawPage;

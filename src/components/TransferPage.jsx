import React, { useState } from 'react';

const TransferMoney = () => {
  const accounts = [
    { type: 'Checking', last4: '1234' },
    { type: 'Savings', last4: '5678' },
  ];

  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleTransfer = () => {
    if (!fromAccount || !toAccount || !amount || fromAccount === toAccount) {
      alert('Please complete all fields and make sure the accounts are different.');
      return;
    }

    console.log(`Transferring $${amount} from ${fromAccount} to ${toAccount}. Note: ${note}`);
    // Here you'd trigger your actual transfer logic or API call
    alert(`Transfer of $${amount} from ${fromAccount} to ${toAccount} initiated.`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md rounded-lg text-white border border-white/10 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Transfer Money</h2>

      <label className="block mb-4">
        <span className="block mb-2">From Account</span>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
        >
          <option value="">Select account</option>
          {accounts.map((acc, idx) => (
            <option key={idx} value={`${acc.type} ••••${acc.last4}`}>
              {acc.type} ••••{acc.last4}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="block mb-2">To Account</span>
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-white/10"
        >
          <option value="">Select account</option>
          {accounts.map((acc, idx) => (
            <option key={idx} value={`${acc.type} ••••${acc.last4}`}>
              {acc.type} ••••{acc.last4}
            </option>
          ))}
        </select>
      </label>

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

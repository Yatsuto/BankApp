import React, { useEffect, useState } from 'react';

const TransactionPage = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/accounts/${accountId}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error('❌ Error fetching transactions:', err.message);
        setError('Could not load transactions.');
      }
    };

    if (accountId) fetchTransactions();
  }, [accountId]);

  return (
    <div
      className="min-h-screen p-6 text-white bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-df63e1c07d05')` }}
    >
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-4">
        {transactions.map((txn) => {
          const isSent = txn.from_account_id === accountId;
          const otherAccount = isSent ? txn.toAccount : txn.fromAccount;
          const directionLabel = isSent ? 'Sent to' : 'Received from';

          return (
            <div
              key={txn.id}
              className={`rounded-lg p-4 border ${
                isSent ? 'border-red-400 bg-red-900/20' : 'border-green-400 bg-green-900/20'
              }`}
            >
              <p className="text-sm text-gray-300">
                {directionLabel} {otherAccount?.account_type} ••••{otherAccount?.account_number?.slice(-4)}
              </p>
              {txn.note && <p className="text-sm italic text-gray-400">Note: {txn.note}</p>}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(txn.timestamp).toLocaleString()}
                </span>

                {/* ✅ Styled badge and amount */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                    {otherAccount?.account_type}
                  </span>
                  <span className={`text-lg font-bold ${isSent ? 'text-red-300' : 'text-green-300'}`}>
                    {isSent ? `-$${txn.amount}` : `+$${txn.amount}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionPage;

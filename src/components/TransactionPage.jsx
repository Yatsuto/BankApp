// Import core hooks and router helpers
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Component for displaying account transaction history
const TransactionPage = () => {
  const location = useLocation(); // To retrieve passed-in state (accountId)
  const navigate = useNavigate(); // For redirecting

  // Extract accountId from route state
  const { accountId } = location.state || {};

  // Component state: transactions and error message
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch transaction data when accountId changes or loads
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/accounts/${accountId}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data); // Store fetched transactions
      } catch (err) {
        console.error('❌ Error fetching transactions:', err.message);
        setError('Could not load transactions.');
      }
    };

    // Guard: redirect if no account is passed
    if (accountId) fetchTransactions();
    else setError('No account selected. Please go back to dashboard.');
  }, [accountId]);

  return (
    <div
      className="min-h-screen p-6 text-white bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-df63e1c07d05')` }}
    >
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

      {/* Error state (invalid account or fetch failure) */}
      {error && (
        <div className="text-red-400 mb-4">
          {error}
          <br />
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-400 underline mt-2 block"
          >
            ← Return to Dashboard
          </button>
        </div>
      )}

      {/* Transaction list */}
      <div className="space-y-4">
        {transactions.map((txn) => {
          const isSent = txn.from_account_id === accountId; // Determine direction of transaction
          const otherAccount = isSent ? txn.toAccount : txn.fromAccount;
          const directionLabel = isSent ? 'Sent to' : 'Received from';

          return (
            <div
              key={txn.id}
              className={`rounded-lg p-4 border ${
                isSent
                  ? 'border-red-400 bg-red-900/20'   // Styling for sent transactions
                  : 'border-green-400 bg-green-900/20' // Styling for received transactions
              }`}
            >
              {/* Direction and counterparty info */}
              <p className="text-sm text-gray-300">
                {directionLabel} {otherAccount?.account_type} ••••{otherAccount?.account_number?.slice(-4)}
              </p>

              {/* Optional transaction note */}
              {txn.note && (
                <p className="text-sm italic text-gray-400">Note: {txn.note}</p>
              )}

              {/* Timestamp and amount display */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(txn.timestamp).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  {/* Badge showing account type */}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                    {otherAccount?.account_type}
                  </span>
                  {/* Formatted amount with color and sign */}
                  <span
                    className={`text-lg font-bold ${isSent ? 'text-red-300' : 'text-green-300'}`}
                  >
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

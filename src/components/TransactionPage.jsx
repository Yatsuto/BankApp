import React from 'react';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline, walletOutline, removeOutline, addOutline } from 'ionicons/icons';

const TransactionPage = ({ account, onBack }) => {
  // Dummy data – replace with real transaction data later
  const transactions = [
    { id: 1, type: 'Deposit', amount: 200.0, date: '2025-04-01', icon: addOutline },
    { id: 2, type: 'Withdrawal', amount: -50.0, date: '2025-03-30', icon: removeOutline },
    { id: 3, type: 'Transfer to Savings', amount: -100.0, date: '2025-03-28', icon: walletOutline },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white mb-6 hover:underline"
      >
        <IonIcon icon={arrowBackOutline} />
        Back to Accounts
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{account.type} Account</h2>
        <p className="text-sm text-white/70">•••• {account.last4}</p>
        <p className="text-3xl font-bold mt-2">${account.balance.toFixed(2)}</p>
      </div>

      <h3 className="text-xl mb-4">Recent Transactions</h3>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {transactions.map(txn => (
          <div
            key={txn.id}
            className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-md border border-white/20 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <IonIcon icon={txn.icon} className="text-xl" />
              <div>
                <p className="font-medium">{txn.type}</p>
                <p className="text-sm text-white/70">{txn.date}</p>
              </div>
            </div>
            <p className={`text-lg font-semibold ${txn.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
              {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;

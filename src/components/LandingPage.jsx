import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import {
  settingsOutline,
  chatbubblesOutline,
  menuOutline,
  documentOutline,
  lockClosedOutline,
  cardOutline,
  giftOutline,
  helpCircleOutline,
  callOutline,
  closeCircleOutline,
  chatboxEllipsesOutline,
} from 'ionicons/icons';

const BankDashboard = ({ userId }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log('🔄 Fetching accounts for userId:', userId);
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/accounts/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch accounts');
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError('Load failed');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userId]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800/80 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50 backdrop-blur-md border-r border-white/10`}
      >
        {isSidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/10 z-40"
          ></div>
        )}

        <div className="p-6 space-y-5">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="space-y-4 text-sm">
            {[
              [documentOutline, 'Statements & Documents'],
              [settingsOutline, 'Settings'],
              [lockClosedOutline, 'Security Center'],
              [cardOutline, 'Manage Debit/Credit Card'],
              [giftOutline, 'My Rewards'],
              [helpCircleOutline, 'Help'],
              [callOutline, 'Contact Us'],
              [closeCircleOutline, 'Dispute a Transaction'],
              [chatboxEllipsesOutline, 'Share Feedback'],
            ].map(([icon, label], idx) => (
              <button
                key={idx}
                className="flex items-center gap-3 hover:text-gray-300 w-full"
                onClick={() => setSidebarOpen(false)}
              >
                <IonIcon icon={icon} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="h-full overflow-y-auto p-6 pb-24">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-white hover:text-black transition"
            >
              <IonIcon icon={menuOutline} className="text-2xl" />
            </button>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
          </div>
          <div className="flex gap-4">
            <button className="p-2 rounded-full hover:bg-white hover:text-black transition">
              <IonIcon icon={settingsOutline} className="text-xl" />
            </button>
            <button className="p-2 rounded-full hover:bg-white hover:text-black transition">
              <IonIcon icon={chatbubblesOutline} className="text-xl" />
            </button>
          </div>
        </header>

        {/* Accounts */}
        <section className="mb-10">
          <h2 className="text-xl mb-4">Your Accounts</h2>
          {loading && <p>Loading accounts...</p>}
          {error && <p className="text-red-400">{error}</p>}

          <div className="space-y-4">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  setSidebarOpen(false);
                  console.log(`Navigate to transaction history for ${acc.account_type}`);
                }}
                className="w-full text-left bg-white bg-opacity-10 hover:bg-opacity-20 transition p-4 rounded-lg backdrop-blur-md border border-white/20"
              >
                <h3 className="text-lg font-medium">{acc.account_type} Account</h3>
                <p className="text-sm">•••• {acc.account_number.slice(-4)}</p>
                <p className="text-2xl font-bold mt-2">
                  ${parseFloat(acc.balance).toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Manage Accounts */}
        <section className="flex flex-col items-center mt-12">
          <div className="border border-white/20 rounded-xl p-6 w-full max-w-md text-center backdrop-blur-md bg-white/5">
            <h2 className="text-xl mb-6 font-semibold text-white">Manage Accounts</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Zelle', 'Transfer', 'Deposit', 'Withdraw'].map((label, idx) => (
                <button
                  key={idx}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg font-medium border border-white/10 hover:from-gray-700 hover:to-gray-800 hover:border-white/30 active:scale-95 transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
            <a href="#" className="text-blue-400 hover:underline text-sm">
              Open a New Account
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BankDashboard;

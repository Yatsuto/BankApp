import React, { useState } from 'react';
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

const BankDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const accounts = [
    { type: 'Checking', balance: 3245.12, last4: '1234' },
    { type: 'Savings', balance: 8720.54, last4: '5678' },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800/80 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 z-50 backdrop-blur-md border-r border-white/10`}
      >
        {/* Overlay to close drawer on outside click */}
        {isSidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/10 z-40"
          ></div>
        )}

        <div className="p-6 space-y-5">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="space-y-4 text-sm">
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={documentOutline} /> Statements & Documents
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={settingsOutline} /> Settings
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={lockClosedOutline} /> Security Center
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={cardOutline} /> Manage Debit/Credit Card
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={giftOutline} /> My Rewards
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={helpCircleOutline} /> Help
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={callOutline} /> Contact Us
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={closeCircleOutline} /> Dispute a Transaction
            </button>
            <button className="flex items-center gap-3 hover:text-gray-300 w-full" onClick={() => setSidebarOpen(false)}>
              <IonIcon icon={chatboxEllipsesOutline} /> Share Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-white hover:text-black transition">
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
        <div className="space-y-4">
          {accounts.map((acc, index) => (
            <button
              key={index}
              onClick={() => {
                setSidebarOpen(false);
                console.log(`Navigate to transaction history for ${acc.type}`);
              }}
              className="w-full text-left bg-white bg-opacity-10 hover:bg-opacity-20 transition p-4 rounded-lg backdrop-blur-md border border-white border-opacity-20"
            >
              <h3 className="text-lg font-medium">{acc.type} Account</h3>
              <p className="text-sm">•••• {acc.last4}</p>
              <p className="text-2xl font-bold mt-2">${acc.balance.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Manage Accounts */}
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

  {/* Just a visible link, no routing needed */}
  <a href="#" className="text-blue-400 hover:underline text-sm">
    Open a New Account
  </a>
</div>

</section>


    </div>
  );
};

export default BankDashboard;

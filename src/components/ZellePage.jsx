import React from 'react';
import { useNavigate } from 'react-router-dom';

const ZellePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-3xl font-bold mb-4">Zelle</h1>
      <p className="text-lg text-gray-300 mb-8">🚧 This feature is currently under development.</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default ZellePage;

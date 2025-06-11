import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Placeholder for navigation

interface AccountPageProps {
  setCurrentPage: (page: string, replaceHistory?: boolean) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ setCurrentPage }) => {
  // Placeholder for user data. In a real app, this would come from context or a global state.
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setCurrentPage('login', true);
  };

  return (
    <div className="min-h-screen bg-[#14191f] text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Account Settings</h1>

      {/* Account Details Section */}
      <div className="bg-[#1f262e] rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Account Details</h2>
        <p className="mb-2"><span className="font-semibold">Name:</span> {user.name || 'N/A'}</p>
        <p className="mb-2"><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
        <button
          className="mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
          onClick={() => alert('Update Account Details functionality coming soon!')}
        >
          Update Details
        </button>
      </div>

      {/* Notifications Section */}
      <div className="bg-[#1f262e] rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-[#9dadbe]">No new notifications.</p>
        <button
          className="mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
          onClick={() => alert('Notification settings functionality coming soon!')}
        >
          Manage Notifications
        </button>
      </div>

      {/* Logout Section */}
      <div className="bg-[#1f262e] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="text-[#9dadbe] mb-4">Click the button below to log out of your account.</p>
        <button
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-all"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AccountPage; 
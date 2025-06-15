import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Placeholder for navigation

interface AccountPageProps {
  setCurrentPage: (page: string, replaceHistory?: boolean) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ setCurrentPage }) => {
  // Placeholder for user data. In a real app, this would come from context or a global state.
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (!user.email || !user.password) {
      // In a real app, password wouldn't be stored. This is based on the curl command.
      console.error('Email or password not available for logout.');
      setIsLoading(false);
      // Proceed with local logout even if API call can't be made as per curl command requirements
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      setCurrentPage('login', true);
      return;
    }

    try {
      const response = await fetch('https://bloomday-server-side.onrender.com/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Error during logout API call:', error);
    } finally {
      setIsLoading(false);
      // Always clear local storage and redirect regardless of API success/failure for UX
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      setCurrentPage('login', true);
    }
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
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Log Out'
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountPage; 
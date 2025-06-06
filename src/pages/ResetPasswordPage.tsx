import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router-dom for token from URL
import FlashMessage from '../components/FlashMessage';

interface ResetPasswordPageProps {
  setCurrentPage: (page: string) => void;
  token: string; // Add token prop
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ setCurrentPage, token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // In a real application, you'd get the token from the URL, e.g., using react-router-dom's useParams
  // For now, we'll assume a placeholder token or a way to pass it.
  // const { token } = useParams<{ token: string }>();
  // const token = "PLACEHOLDER_RESET_TOKEN"; // Replaced by prop

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlashMessage(null);
    setFlashMessageType(null);
    setIsLoading(true); // Set loading to true

    if (newPassword !== confirmNewPassword) {
      setFlashMessage("Passwords do not match!");
      setFlashMessageType('error');
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    if (!token) {
      setFlashMessage("Reset token is missing.");
      setFlashMessageType('error');
      setIsLoading(false); // Set loading to false if token is missing
      return;
    }

    try {
      const response = await fetch('https://bloomday-server-side.onrender.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setFlashMessage(data.message || "Password reset successfully!");
        setFlashMessageType('success');
        setTimeout(() => {
          setCurrentPage('login');
        }, 1500); // Redirect after short delay
      } else {
        setFlashMessage(data.message || "Failed to reset password. Invalid or expired token.");
        setFlashMessageType('error');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setFlashMessage("Network error. Please try again later.");
      setFlashMessageType('error');
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white`;
  const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700`;

  return (
    <div className={`min-h-screen bg-[#14191f] py-8 px-4 flex items-center justify-center`}>
      <div className={`max-w-md w-full rounded-lg shadow-md p-6 bg-[#1f262e]`}>
        <h1 className={`text-3xl font-bold mb-8 text-center text-white`}>Reset Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm new password"
              className={inputClasses}
            />
          </div>
          <button type="submit" className={buttonClasses} disabled={isLoading}>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />

        <div className="mt-6 text-center">
          <button onClick={() => setCurrentPage('login')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Use URLSearchParams for query token
import FlashMessage from '../components/FlashMessage';

interface VerifyEmailPageProps {
  setCurrentPage: (page: string) => void;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ setCurrentPage }) => {
  // const [token, setToken] = useState<string | null>(null); // Removed as urlToken is used directly
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get('token');
    // setToken(urlToken); // No longer needed

    const verifyEmail = async () => {
      if (!urlToken) {
        setFlashMessage("Verification token is missing.");
        setFlashMessageType('error');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://bloomday-server-side.onrender.com/verify-email?token=${urlToken}`);
        const data = await response.json();

        if (response.ok) {
          setFlashMessage(data.message || "Email verified successfully! You can now log in.");
          setFlashMessageType('success');
          setTimeout(() => {
            setCurrentPage('login');
          }, 2000);
        } else {
          setFlashMessage(data.message || "Email verification failed. Invalid or expired token.");
          setFlashMessageType('error');
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setFlashMessage("Network error. Please try again later.");
        setFlashMessageType('error');
      } finally {
        setIsLoading(false);
      }
    };

    if (urlToken) {
      verifyEmail();
    } else {
      setIsLoading(false);
    }
  }, [setCurrentPage]); // Depend on setCurrentPage as it's used inside useEffect

  return (
    <div className="min-h-screen bg-[#14191f] py-8 px-4 flex flex-col items-center justify-center">
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-8">Bloomday</h2>
      <div className="max-w-md w-full rounded-lg shadow-md p-6 bg-[#1f262e] text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {isLoading ? "Verifying Email..." : flashMessageType === 'success' ? "Verification Complete" : "Verification Failed"}
        </h1>
        {isLoading && (
          <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
        {!isLoading && flashMessageType === 'error' && (
          <button onClick={() => setCurrentPage('login')} className="mt-4 font-semibold text-purple-500 hover:underline">
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
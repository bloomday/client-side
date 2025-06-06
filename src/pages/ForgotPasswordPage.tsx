import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';

interface ForgotPasswordPageProps {
  setCurrentPage: (page: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlashMessage(null);
    setFlashMessageType(null);
    setIsLoading(true);

    try {
      const response = await fetch('https://bloomday-server-side.onrender.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setFlashMessage(data.message || "Reset link sent to your email.");
        setFlashMessageType('success');
      } else {
        setFlashMessage(data.message || "Failed to send reset link.");
        setFlashMessageType('error');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setFlashMessage("Network error. Please try again later.");
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white`;
  const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700`;

  return (
    <div className={`min-h-screen bg-[#14191f] py-8 px-4 flex items-center justify-center`}>
      <div className={`max-w-md w-full rounded-lg shadow-md p-6 bg-[#1f262e]`}>
        <h1 className={`text-3xl font-bold mb-8 text-center text-white`}>Forgot Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
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
              'Send Reset Link'
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

export default ForgotPasswordPage; 
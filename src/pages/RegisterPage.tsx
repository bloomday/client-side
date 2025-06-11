import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';

interface RegisterPageProps {
  setCurrentPage: (page: string, internal?: boolean) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setIsLoading(true); // Set loading to true

    if (password !== confirmPassword) {
      setFlashMessage("Passwords do not match!");
      setFlashMessageType('error');
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    try {
      const response = await fetch('https://bloomday-server-side.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setFlashMessage(data.message || "Registration successful! Please check your email.");
        setFlashMessageType('success');
        setTimeout(() => {
          setCurrentPage('login', true);
        }, 1500); // Redirect after short delay
      } else {
        setFlashMessage(data.message || "Registration failed. Please try again.");
        setFlashMessageType('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setFlashMessage("Network error. Please try again later.");
      setFlashMessageType('error');
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white`;
  const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700`;
  const socialButtonClasses = `flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 border border-[#3d4c5c] bg-[#dce7f3] text-[#14191f] hover:bg-[#b5c9e3]`;

  return (
    <div className="min-h-screen bg-[#14191f] py-8 px-4 flex flex-col items-center justify-center">
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-8">Bloomday</h2>
      <div className={`max-w-md w-full rounded-lg shadow-md p-6 bg-[#1f262e]`}>
        <h1 className={`text-3xl font-bold mb-8 text-center text-white`}>Register</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={inputClasses}
            />
          </div>
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
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
              'Register'
            )}
          </button>
        </form>

        <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />

        <div className="mt-8 text-center">
          <p className={`text-sm text-[#9dadbe]`}>Or register with:</p>
          <div className="mt-4 space-y-3">
            <button className={socialButtonClasses} disabled={isLoading}>
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Sign up with Google
            </button>
            <button className={socialButtonClasses} disabled={isLoading}>
              <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
              Sign up with Facebook
            </button>
          </div>
        </div>

        <p className={`mt-6 text-center text-sm text-[#9dadbe]`}>
          Already have an account? <button onClick={() => setCurrentPage('login')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 
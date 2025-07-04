import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

interface LoginPageProps {
  // setCurrentPage: (page: string, internal?: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await apiCall(
        '/signin',
        'POST',
        { email, password },
        false // Login does not require an existing token
      );

      if (response.success && response.data) {
        const data = response.data as { user: any; token: string };
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        setFlashMessage("Login successful!");
        setFlashMessageType('success');
        setTimeout(() => {
          console.log("Attempting to navigate to home page.");
          navigate('/', { replace: true });
        }, 1500);
      } else {
        setFlashMessage(response.message || "Login failed");
        setFlashMessageType('error');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setFlashMessage(error.message || "Network error. Please try again later.");
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white`;
  const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700`;
  // const socialButtonClasses = `flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 border border-[#3d4c5c] bg-[#dce7f3] text-[#14191f] hover:bg-[#b5c9e3]`;

  return (
    <div className="min-h-screen bg-[#14191f] py-8 px-4 flex flex-col items-center justify-center">
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-8">Bloomday</h2>
      <div className={`max-w-md w-full rounded-lg shadow-md p-6 bg-[#1f262e]`}>
        <h1 className={`text-3xl font-bold mb-8 text-center text-white`}>Login</h1>
        
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
          <div>
            <label className={`block text-sm font-medium mb-2 text-[#9dadbe]`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9dadbe]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className={buttonClasses} disabled={isLoading}>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />

        <div className="mt-8 text-center">
          <p className={`text-sm text-[#9dadbe]`}>Or log in with:</p>
          <div className="mt-4 space-y-3">
            {/* <button className={socialButtonClasses} disabled={isLoading}>
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button> */}
            {/* <button className={socialButtonClasses} disabled={isLoading}>
              <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
              Sign in with Facebook
            </button> */}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/forgot-password')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
            Forgot password?
          </button>
        </div>

        <p className={`mt-6 text-center text-sm text-[#9dadbe]`}>
          Don't have an account? <button onClick={() => navigate('/register')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 
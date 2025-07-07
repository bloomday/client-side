import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

const LoginPage: React.FC = () => {
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
        false
      );
      if (response.success && response.data) {
        const data = response.data as { user: any; token: string };
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        setFlashMessage('Login successful!');
        setFlashMessageType('success');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } else {
        setFlashMessage(response.message || 'Login failed');
        setFlashMessageType('error');
      }
    } catch (error: any) {
      setFlashMessage(error.message || 'An error occurred, please try again later.');
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white';
  const buttonClasses = 'w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#14191f] overflow-hidden">
      <div className="flex flex-col items-center">
        <img src="/bloomday-icon.svg" alt="Bloomday Logo" className="h-12 w-12" />
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Bloomday</h2>
        <div className="max-w-md w-full rounded-lg shadow-md p-4 bg-[#1f262e] max-h-[90vh] overflow-y-auto mt-4">
          <div className="space-y-4 p-6">
            <h1 className="text-3xl font-bold text-center text-white">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#9dadbe]">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@example.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#9dadbe]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
              <div className="pt-2">
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
              </div>
            </form>
            <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
            <div className="text-center">
              <button onClick={() => navigate('/forgot-password')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
                Forgot password?
              </button>
            </div>
            <p className="text-center text-sm text-[#9dadbe]">
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="font-semibold text-purple-500 hover:underline" disabled={isLoading}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 
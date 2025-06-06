import React, { useState } from 'react';

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    setCurrentPage('home'); // Redirect to home after login attempt
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#1f262e] border-[#3d4c5c] text-white`;
  const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700`;
  const socialButtonClasses = `flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 border border-[#3d4c5c] text-white bg-[#1f262e] hover:bg-[#23272f]`;

  return (
    <div className={`min-h-screen bg-[#14191f] py-8 px-4 flex items-center justify-center`}>
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
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={inputClasses}
            />
          </div>
          <button type="submit" className={buttonClasses}>Log In</button>
        </form>

        <div className="mt-8 text-center">
          <p className={`text-sm text-[#9dadbe]`}>Or log in with:</p>
          <div className="mt-4 space-y-3">
            <button className={socialButtonClasses}>
              <img src="https://www.svgrepo.com/show/506497/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button>
            <button className={socialButtonClasses}>
              <img src="https://www.svgrepo.com/show/506471/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
              Sign in with Facebook
            </button>
          </div>
        </div>

        {/* <p className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-[#9dadbe]' : 'text-gray-600'}`}>
          Don't have an account? <button onClick={() => setCurrentPage('register')} className="font-semibold text-purple-500 hover:underline">Sign Up</button>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage; 
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

interface AuthPageProps {
  setCurrentPage: (page: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`min-h-screen bg-[#14191f] py-8 px-4 flex items-center justify-center`}>
      {isLogin ? (
        <LoginPage setCurrentPage={setCurrentPage} />
      ) : (
        <RegisterPage setCurrentPage={setCurrentPage} />
      )}
      <div className={`fixed bottom-4 left-0 right-0 text-center text-[#9dadbe]`}>
        {isLogin ? (
          <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="font-semibold text-purple-500 hover:underline">Sign Up</button></p>
        ) : (
          <p>Already have an account? <button onClick={() => setIsLogin(true)} className="font-semibold text-purple-500 hover:underline">Log In</button></p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

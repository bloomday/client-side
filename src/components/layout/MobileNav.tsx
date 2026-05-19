import React from 'react';
import { Search, User as UserIcon, Calendar, Home as HomeIcon, LogIn } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // I check the token here so the public landing page does not show private account links.
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const navItemClass = (path: string) =>
    `flex flex-col items-center py-2 px-3 rounded ${
      location.pathname === path ? 'text-teal-600' : 'text-gray-600'
    }`;

  return (
    <div className="bg-[#14191f] md:hidden fixed bottom-0 left-0 right-0 px-4 py-2 border-t border-[#26313d]">
      <div className="flex justify-around">
        <button onClick={() => navigate('/')} className={navItemClass('/')}>
          <HomeIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Home</span>
        </button>

        <button onClick={() => navigate('/browse')} className={navItemClass('/browse')}>
          <Search className="w-6 h-6 mb-1" />
          <span className="text-xs">Browse</span>
        </button>

        <button onClick={() => navigate('/past')} className={navItemClass('/past')}>
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-xs">Past</span>
        </button>

        {isLoggedIn ? (
          <button onClick={() => navigate('/account')} className={navItemClass('/account')}>
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Account</span>
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className={navItemClass('/login')}>
            <LogIn className="w-6 h-6 mb-1" />
            <span className="text-xs">Login</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
import React from 'react';
import { Search, User as UserIcon, Calendar, Home as HomeIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
  // currentPage: string;
  // setCurrentPage: (page: string, internal?: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#14191f] md:hidden fixed bottom-0 left-0 right-0 px-4 py-2">
      <div className="flex justify-around">
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center py-2 px-3 rounded ${location.pathname === '/' ? 'text-teal-600' : 'text-gray-600'}`}
        >
          <HomeIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button 
          onClick={() => navigate('/browse')}
          className={`flex flex-col items-center py-2 px-3 rounded ${location.pathname === '/browse' ? 'text-teal-600' : 'text-gray-600'}`}
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-xs">Browse</span>
        </button>
        
        <button 
          onClick={() => navigate('/past')}
          className={`flex flex-col items-center py-2 px-3 rounded ${location.pathname === '/past' ? 'text-teal-600' : 'text-gray-600'}`}
        >
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-xs">Past</span>
        </button>
        <button 
          onClick={() => navigate('/account')}
          className={`flex flex-col items-center py-2 px-3 rounded ${location.pathname === '/account' ? 'text-teal-600' : 'text-gray-600'}`}
        >
          <UserIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Account</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav; 
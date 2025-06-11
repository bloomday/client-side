import React from 'react';
import { Search, Plus, Calendar, Home as HomeIcon } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  setCurrentPage: (page: string, internal?: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentPage, setCurrentPage }) => (
  <div className="bg-[#14191f] md:hidden fixed bottom-0 left-0 right-0 px-4 py-2">
    <div className="flex justify-around">
      <button 
        onClick={() => setCurrentPage('home', true)}
        className={`flex flex-col items-center py-2 px-3 rounded ${currentPage === 'home' ? 'text-teal-600' : 'text-gray-600'}`}
      >
        <HomeIcon className="w-6 h-6 mb-1" />
        <span className="text-xs">Home</span>
      </button>
      <button 
        onClick={() => setCurrentPage('browse', true)}
        className={`flex flex-col items-center py-2 px-3 rounded ${currentPage === 'browse' ? 'text-teal-600' : 'text-gray-600'}`}
      >
        <Search className="w-6 h-6 mb-1" />
        <span className="text-xs">Browse</span>
      </button>
      <button 
        onClick={() => setCurrentPage('create', true)}
        className={`flex flex-col items-center py-2 px-3 rounded ${currentPage === 'create' ? 'text-teal-600' : 'text-gray-600'}`}
      >
        <Plus className="w-6 h-6 mb-1" />
        <span className="text-xs">Create</span>
      </button>
      <button 
        onClick={() => setCurrentPage('past', true)}
        className={`flex flex-col items-center py-2 px-3 rounded ${currentPage === 'past' ? 'text-teal-600' : 'text-gray-600'}`}
      >
        <Calendar className="w-6 h-6 mb-1" />
        <span className="text-xs">Past</span>
      </button>
    </div>
  </div>
);

export default MobileNav; 
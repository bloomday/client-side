import React from 'react';
import { Plus } from 'lucide-react';

interface NavbarProps {
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => (
  <nav className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent"
        >
          Bloomday
        </button>
        <div className="hidden md:flex space-x-6">
          <button 
            onClick={() => setCurrentPage('browse')}
            className="text-gray-700 hover:text-purple-600 transition-colors"
          >
            Browse Events
          </button>
          <button 
            onClick={() => setCurrentPage('past')}
            className="text-gray-700 hover:text-purple-600 transition-colors"
          >
            Past Events
          </button>
        </div>
        <button 
          onClick={() => setCurrentPage('create')}
          className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar; 
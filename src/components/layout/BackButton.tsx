import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  setCurrentPage: (page: string) => void;
}

const BackButton: React.FC<BackButtonProps> = ({ setCurrentPage }) => (
  <button 
    onClick={() => setCurrentPage('home')}
    className="md:hidden fixed top-4 left-4 z-50 bg-[#223449] rounded-full p-2 shadow-md"
  >
    <ArrowLeft className="w-6 h-6 text-gray-500" />
  </button>
);

export default BackButton; 
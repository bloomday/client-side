import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  // setCurrentPage: (page: string) => void; // Removed
}

const BackButton: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} // Use navigate(-1) to go back
      className="md:hidden fixed top-4 left-4 z-50 bg-[#223449] rounded-full p-2 shadow-md"
    >
      <ArrowLeft className="w-6 h-6 text-gray-500" />
    </button>
  );
};

export default BackButton; 
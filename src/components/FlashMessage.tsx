import React, { useEffect } from 'react';

interface FlashMessageProps {
  message: string | null;
  type: 'success' | 'error' | null;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Message disappears after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColorClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg max-w-md text-white text-sm font-normal z-50 ${bgColorClass}`}>
      {message}
      <button onClick={onClose} className="ml-4 text-white font-bold">
        &times;
      </button>
    </div>
  );
};

export default FlashMessage; 
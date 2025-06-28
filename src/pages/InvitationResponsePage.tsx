import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';
import FlashMessage from '../components/FlashMessage';

const InvitationResponsePage: React.FC = () => {
  const { action, id } = useParams<{ action: 'accept' | 'decline', id: string }>();
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  useEffect(() => {
    const handleInvitation = async () => {
      if (!id || (action !== 'accept' && action !== 'decline')) {
        setFlashMessage('Invalid invitation link.');
        setFlashMessageType('error');
        return;
      }

      setIsLoading(true);
      setFlashMessage(null);
      setFlashMessageType(null);

      try {
        const url = `https://bloomday-server-side.onrender.com/invite/${action}/${id}`;
        const response = await apiCall(url, 'POST', undefined, false); // No body, no auth required

        if (response.success) {
          setFlashMessage(response.message || `Invitation ${action}ed successfully!`);
          setFlashMessageType('success');
        } else {
          setFlashMessage(response.message || `Failed to ${action} invitation.`);
          setFlashMessageType('error');
        }
      } catch (error: any) {
        console.error(`Error ${action}ing invitation:`, error);
        setFlashMessage(error.message || "Network error. Please try again later.");
        setFlashMessageType('error');
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/register');
        }, 3000); // Redirect after 3 seconds
      }
    };

    handleInvitation();
  }, [action, id, navigate]);

  return (
    <div className="min-h-screen bg-[#14191f] flex flex-col items-center justify-center p-4">
      <div className="bg-[#1f262e] rounded-lg shadow-md p-8 text-center text-white">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Processing your invitation...</p>
          </div>
        ) : (
          <p className="text-lg">{flashMessage ? flashMessage : 'Loading invitation status...'}</p>
        )}
      </div>
      <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
    </div>
  );
};

export default InvitationResponsePage; 
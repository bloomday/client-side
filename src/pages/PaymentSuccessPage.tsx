import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../components/layout/BackButton';
import FlashMessage from '../components/FlashMessage';

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const [eventId, setEventId] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('eventId');
    if (id) {
      setEventId(id);
      setFlashMessage('Payment successful!');
      setFlashMessageType('success');
    } else {
      setFlashMessage('Payment successful, but event ID not found.');
      setFlashMessageType('success');
    }
  }, [location.search]);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  return (
    <div className="min-h-[80vh] bg-[#14191f] px-4 flex items-center justify-center overflow-y-hidden">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
        <BackButton />
        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Thank You for Your Bloom!</h1>
        <p className="text-gray-600 mb-6">Your payment was successful and your gift has been sent.</p>
        {eventId && <p className="text-sm text-gray-500 mb-4">Event ID: {eventId}</p>}
        <Link 
          to={eventId ? `/event/${eventId}` : '/'} 
          className="inline-block bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
        >
          Return to event
        </Link>
      </div>
      <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
    </div>
  );
};

export default PaymentSuccessPage; 
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Event } from '../types';
import FlashMessage from '../components/FlashMessage';
import { apiCall } from '../utils/api';

interface EventDetailsPageProps {
  event: Event | undefined;
  // fromMyEventsPage?: boolean;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ event /*, fromMyEventsPage */ }) => {
  const [inviteEmails, setInviteEmails] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentUserHost, setIsCurrentUserHost] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [eventGalleryImages, setEventGalleryImages] = useState<Event['gallery']>([]);

  console.log('EventDetailsPage - event prop:', event);

  const userId = localStorage.getItem('userId');
  const userName = JSON.parse(localStorage.getItem('user') || '{}').name;
  const isCurrentUserAttendee = userId && event && (event.invitees || []).includes(userId);
  const eventStarted = event && new Date(event.date) < new Date();

  useEffect(() => {
    if (userId && event?.hosts && (event.hosts || []).some(host => host._id === userId)) {
      setIsCurrentUserHost(true);
    } else {
      setIsCurrentUserHost(false);
    }

    const fetchEventGallery = async () => {
      if (!event?._id || !eventStarted) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await apiCall<{ url: string, uploadedBy: string, uploadedAt: string }[]>(`/events/${event._id}/gallery`, 'GET', undefined, true);

        if (response.success && response.data) {
          setEventGalleryImages(response.data);
        } else {
          console.error('Failed to fetch event gallery:', response.message);
          setFlashMessage(response.message || 'Failed to load event gallery.');
          setFlashMessageType('error');
        }
      } catch (error) {
        console.error('Error fetching event gallery:', error);
        setFlashMessage('Network error. Could not load event gallery.');
        setFlashMessageType('error');
      }
    };

    fetchEventGallery();
  }, [event, userId, eventStarted]);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  const handleSendInvites = async () => {
    if (!event?._id) {
      setFlashMessage('Event ID is missing.');
      setFlashMessageType('error');
      return;
    }

    const emailsArray = inviteEmails.split(',').map(email => email.trim()).filter(email => email !== '');
    if (emailsArray.length === 0) {
      setFlashMessage('Please enter at least one email address.');
      setFlashMessageType('error');
      return;
    }

    setIsLoading(true);
    setFlashMessage(null);
    setFlashMessageType(null);

    try {
      // const token = localStorage.getItem('token'); // apiCall handles token implicitly
      // if (!token) {
      //   setFlashMessage('Authentication token not found. Please log in.');
      //   setFlashMessageType('error');
      //   setIsLoading(false);
      //   return;
      // }

      const response = await apiCall<{ message: string }>('/send-invite', 'POST', { eventId: event._id, inviteEmails: emailsArray }, true);

      if (response.success) {
        setFlashMessage(response.message || 'Invites sent successfully.');
        setFlashMessageType('success');
        setInviteEmails(''); // Clear input after success
      } else {
        throw new Error(response.message || 'Failed to send invites.');
      }
    } catch (error: any) {
      console.error('Send invites error:', error);
      setFlashMessage(error.message || 'Network error. Please try again later.');
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files) as File[];
      setSelectedFiles(fileArray);
    }
  };

  const handleImageUpload = async () => {
    setFlashMessageType(null);

    if (!event?._id) {
      setFlashMessage('Event ID is missing for image upload.');
      setFlashMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      // const token = localStorage.getItem('token'); // apiCall handles token implicitly
      // if (!token) {
      //   setFlashMessage('Authentication token not found. Please log in.');
      //   setFlashMessageType('error');
      //   setIsLoading(false);
      //   return;
      // }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });
      formData.append('uploadedBy', userName || 'Anonymous');

      const response = await apiCall<{ message: string }>(`/events/${event._id}/upload-multiple`, 'POST', formData, true);

      if (response.success) {
        setFlashMessage(response.message || 'Images uploaded successfully.');
        setFlashMessageType('success');
        setSelectedFiles([]); // Clear selected files after success
      } else {
        throw new Error(response.message || 'Failed to upload images.');
      }
    } catch (error: any) {
      console.error('Upload images error:', error);
      setFlashMessage(error.message || 'Network error. Please try again later.');
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#14191f] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Event not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#14191f]">
      <div className="relative h-64 md:h-96">
        <img 
          src={event.ivImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop'} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{event.name}</h1>
            <p className="text-lg opacity-90">Hosted by {event.hosts && event.hosts.length > 0 ? event.hosts.map(host => host.name).join(', ') : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendees ({(event.invitees || []).length})</h2>
              <div className="flex flex-wrap gap-2">
                {[...Array(Math.min((event.invitees || []).length, 20))].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {String.fromCharCode(65 + (i % 26))}
                  </div>
                ))}
                {((event.invitees || []).length) > 20 && (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    +{((event.invitees || []).length) - 20}
                  </div>
                )}
              </div>
            </div>
            {isCurrentUserHost && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Invites</h2>
                <textarea
                  className="w-full p-3 border rounded-lg resize-y bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  placeholder="Enter invitee emails, separated by commas (e.g., email1@example.com, email2@example.com)"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                ></textarea>
                <button
                  onClick={handleSendInvites}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Send Invites'
                  )}
                </button>
              </div>
            )}

            {/* QR Code and Share Section */}
            {isCurrentUserHost && event.qrCode && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Event QR Code</h2>
                <div className="flex flex-col items-center">
                  <img src={event.qrCode} alt="Event QR Code" className="w-48 h-48 object-contain mb-4" />
                  <button 
                    onClick={() => navigator.clipboard.writeText(event.eventUrl)}
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
                  >
                    Copy Event Link
                  </button>
                  {navigator.share && (
                    <button 
                      onClick={async () => {
                        try {
                          await navigator.share({ title: event.name, url: event.eventUrl });
                          console.log('Event shared successfully!');
                        } catch (error: any) {
                          if (error.name === 'AbortError') {
                            console.log('Share canceled by user.');
                          } else {
                            console.error('Error sharing event:', error);
                          }
                        }
                      }}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all mt-3"
                    >
                      Share Event
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Image Upload Section */}
            {isCurrentUserAttendee && eventStarted && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Event Images</h2>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <button
                  onClick={handleImageUpload}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
                  disabled={isLoading || !selectedFiles.length}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Upload Images'
                  )}
                </button>
              </div>
            )}

            {/* Event Gallery Section */}
            {eventGalleryImages && eventGalleryImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventGalleryImages.map((img, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden">
                      <img src={img.url} alt={`Event Gallery ${index + 1}`} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs text-center">Uploaded by {img.uploadedBy} on {new Date(img.uploadedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <User className="w-5 h-5 mr-3 text-purple-600" />
                  <div>
                    <p className="font-semibold">Host</p>
                    <p>{event.hosts && event.hosts.length > 0 ? event.hosts.map(host => host.name).join(', ') : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {new Date(event.date) > new Date() && (
                  <>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all">
                      RSVP - Free
                    </button>
                    {/* <button className="w-full bg-coral-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-coral-600 transition-all">
                      Buy Tickets - $25
                    </button> */}
                  </>
                )}
                <span className="inline-block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg">
                  {event.type || 'General'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
    </div>
  );
};

export default EventDetailsPage; 
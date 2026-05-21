import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Event } from '../types';
import FlashMessage from '../components/FlashMessage';
import { apiCall } from '../utils/api';
import { Link } from 'react-router-dom'; // Added Link import

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
  // Add state for the gift form
  const [giftName, setGiftName] = useState('');
  const [giftEmail, setGiftEmail] = useState('');
  const [giftAmount, setGiftAmount] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [showGiftForm, setShowGiftForm] = useState(false);
  // States for attendees count and loading/error states
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [attendeesLoading, setAttendeesLoading] = useState(false);
  const [attendeesError, setAttendeesError] = useState('');

  console.log('EventDetailsPage - event prop:', event);

  const userId = localStorage.getItem('userId');
  const userName = JSON.parse(localStorage.getItem('user') || '{}').name;
  const isCurrentUserAttendee = userId && event && (event.invitees || []).includes(userId);
  const eventStarted = event && new Date(event.date) < new Date();


  const fetchAttendeeCount = async () => {
    if (!event?._id) return;

    setAttendeesLoading(true);
    setAttendeesError('');

    const response = await apiCall<{ totalAttendees: number; attendees: any[] }>(
      `/events/${event._id}/attendees`,
      'GET',
      undefined,
      false
    );

    if (response.success && response.data) {
      setTotalAttendees(response.data.totalAttendees || 0);
    } else {
      setTotalAttendees(0);
      setAttendeesError(response.message || 'Unable to load attendees');
    }

    setAttendeesLoading(false);
  };

  useEffect(() => {
    fetchAttendeeCount();

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
          setFlashMessage(response.message || 'An error occurred, please try again later.');
          setFlashMessageType('error');
        }
      } catch (error: any) {
        console.error('Error fetching event gallery:', error);
        setFlashMessage(error.message || 'An error occurred, please try again later.');
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

    // Email validation regex (basic, but covers common formats)
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i;

    for (const email of emailsArray) {
      if (!emailRegex.test(email)) {
        setFlashMessage(`Invalid email address: ${email}. Please enter valid email(s).`);
        setFlashMessageType('error');
        return;
      }
    }

    setIsLoading(true);
    setFlashMessage(null);
    setFlashMessageType(null);

    try {
      let overallSuccess = true;
      let firstErrorMessage: string | null = null;

      if (emailsArray.length === 1) {
        // Single email, send one request
        const response = await apiCall<{ message: string }>(
          '/send-invite',
          'POST',
          { eventId: event._id, inviteEmails: emailsArray },
          true
        );
        if (!response.success) {
          overallSuccess = false;
          firstErrorMessage = response.message || 'Failed to send invite.';
        }
      } else {
        // Multiple emails, send individual requests
        const invitePromises = emailsArray.map(email =>
          apiCall<{ message: string }>(
            '/send-invite',
            'POST',
            { eventId: event._id, inviteEmails: [email] }, // Send each email as a single-element array
            true
          )
        );

        const results = await Promise.all(invitePromises);

        for (const result of results) {
          if (!result.success) {
            overallSuccess = false;
            if (!firstErrorMessage) {
              firstErrorMessage = result.message || 'Failed to send some invites.';
            }
            console.error('Individual invite failed:', result.message);
          }
        }
      }

      if (overallSuccess) {
        setFlashMessage('Invites sent successfully.');
        setFlashMessageType('success');
        setInviteEmails(''); // Clear input after success
      } else {
        setFlashMessage(firstErrorMessage || 'An error occurred, please try again later.');
        setFlashMessageType('error');
      }
    } catch (error: any) {
      console.error('Send invites error:', error);
      setFlashMessage(error.message || 'An error occurred, please try again later.');
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
        throw new Error(response.message || 'An error occurred, please try again later.');
      }
    } catch (error: any) {
      console.error('Upload images error:', error);
      setFlashMessage(error.message || 'An error occurred, please try again later.');
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Attendees (
                {attendeesLoading
                  ? 'Loading...'
                  : attendeesError
                    ? '0'
                    : totalAttendees}
                )
              </h2>

              {attendeesLoading && (
                <p className="text-gray-500 mb-4">Loading attendees...</p>
              )}

              {attendeesError && !attendeesLoading && (
                <p className="text-gray-500 mb-4">Unable to load attendees</p>
              )}              <div className="flex flex-wrap gap-2">
                {[...Array(Math.min(totalAttendees, 20))].map((_, i) => (<div key={i} className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {String.fromCharCode(65 + (i % 26))}
                </div>
                ))}
                {totalAttendees > 20 && (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    +{totalAttendees - 20}
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
                  placeholder="Enter invitee email(s), separated by commas (e.g., email1@example.com, email2@example.com)"
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
                <div
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-500 transition-colors duration-200 mb-4"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                  </div>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm mb-2">Selected Files:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="text-sm flex justify-between items-center">
                          {file.name}
                          <button
                            onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                <p className="text-gray-700 mb-4">This event has {eventGalleryImages.length} images in its gallery.</p>
                <Link
                  to={`/events/${event._id}/gallery-full`}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold text-center block hover:from-purple-700 hover:to-teal-700 transition-all"
                >
                  View All Images
                </Link>
              </div>
            )}
            {/* Gift a Bloom / Crowdfund Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6 relative">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Gift a Bloom</h2>
              {!showGiftForm ? (
                <button
                  onClick={() => setShowGiftForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#animatedGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13H7a2 2 0 0 1-2-2V8z" /><path d="M7 8h10v4" /><path d="M17 8v13h-5" /><path d="M22 12v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4" /><path d="M12 22v-4" /><path d="M4 12h16" /></svg>
                  <span>Gift a Bloom</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowGiftForm(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      setFlashMessage(null);
                      setFlashMessageType(null);
                      try {
                        const response = await apiCall<{ authorization_url: string }>(
                          `/pay/${event._id}`,
                          'POST',
                          {
                            amount: Number(giftAmount),
                            message: giftMessage,
                            name: giftName,
                            email: giftEmail,
                          },
                          false
                        );
                        console.log('Gift a Bloom payment response:', response);
                        if (response.success && response.data?.authorization_url) {
                          window.open(response.data.authorization_url, '_blank');
                        } else {
                          setFlashMessage(response.message || 'Failed to initiate payment.');
                          setFlashMessageType('error');
                        }
                      } catch (error: any) {
                        setFlashMessage(error.message || 'An error occurred, please try again later.');
                        setFlashMessageType('error');
                      } finally {
                        setIsLoading(false);
                        setGiftName('');
                        setGiftEmail('');
                        setGiftAmount('');
                        setGiftMessage('');
                      }
                    }}
                    className="space-y-4 pt-8"
                  >
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={giftName}
                        onChange={e => setGiftName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Your Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={giftEmail}
                        onChange={e => setGiftEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Amount</label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={giftAmount}
                        onChange={e => setGiftAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Message (optional)</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={giftMessage}
                        onChange={e => setGiftMessage(e.target.value)}
                        rows={2}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#animatedGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                      )}
                      <span>{isLoading ? 'Processing...' : 'Gift the Bloom'}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
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
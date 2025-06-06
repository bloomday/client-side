import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';

interface CreateEventPageProps {
  setCurrentPage: (page: string) => void;
  eventTypes: string[];
}

const CreateEventPage: React.FC<CreateEventPageProps> = ({ setCurrentPage, eventTypes }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [allowCrowdfunding, setAllowCrowdfunding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);

  const handleCloseFlash = () => {
    setFlashMessage(null);
    setFlashMessageType(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlashMessage(null);
    setFlashMessageType(null);
    setIsLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setFlashMessage("You must be logged in to create an event.");
      setFlashMessageType('error');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', `${date}T${time}:00Z`); // Combine date and time to ISO format
    formData.append('location', location);
    formData.append('allowCrowdfunding', String(allowCrowdfunding));
    if (selectedImageFile) {
      formData.append('ivImage', selectedImageFile);
    }

    try {
      const response = await fetch('https://bloomday-server-side.onrender.com/create-event', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFlashMessage(data.message || "Event created successfully!");
        setFlashMessageType('success');
        // Clear form fields
        setName('');
        setDate('');
        setTime('');
        setLocation('');
        setType('');
        setDescription('');
        setSelectedImageFile(null);
        setAllowCrowdfunding(false);

        setTimeout(() => {
          setCurrentPage('home');
        }, 1500);
      } else {
        setFlashMessage(data.message || "Failed to create event.");
        setFlashMessageType('error');
      }
    } catch (error) {
      console.error('Create event error:', error);
      setFlashMessage("Network error. Please try again later.");
      setFlashMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white";
  const labelClasses = "block text-sm font-medium text-[#9dadbe] mb-2";
  const buttonClasses = `w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all transform hover:scale-105`;

  return (
    <div className="min-h-screen bg-[#14191f] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1f262e] rounded-lg shadow-md p-6">
          <h1 className="text-lg font-bold text-white mb-8 text-center">Create a New Event</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClasses}>Event Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name"
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Time</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Event Type</label>
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select event type</option>
                {eventTypes.map(evtType => (
                  <option key={evtType} value={evtType}>{evtType}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event..."
                rows={4}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Event Image</label>
              <input
                type="file"
                onChange={(e) => setSelectedImageFile(e.target.files ? e.target.files[0] : null)}
                className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowCrowdfunding"
                checked={allowCrowdfunding}
                onChange={(e) => setAllowCrowdfunding(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="allowCrowdfunding" className="ml-2 block text-sm text-[#9dadbe]">
                Allow Crowdfunding
              </label>
            </div>
            <button
              type="submit"
              className={buttonClasses} disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Event'
              )}
            </button>
          </form>
          <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
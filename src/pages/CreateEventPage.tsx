import React, { useState } from 'react';
import FlashMessage from '../components/FlashMessage';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

interface CreateEventPageProps {
  eventTypes: string[];
}

const CreateEventPage: React.FC<CreateEventPageProps> = ({ eventTypes }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [allowCrowdfunding, setAllowCrowdfunding] = useState<'yes' | 'no'>('no');
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashMessageType, setFlashMessageType] = useState<'success' | 'error' | null>(null);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

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
    formData.append('date', `${date}T${time}:00Z`);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('visibility', visibility);
    formData.append('allowCrowdfunding', allowCrowdfunding === 'yes' ? 'true' : 'false');
    if (selectedImageFile) {
      formData.append('ivImage', selectedImageFile);
    }

    // For debugging: console log the FormData contents
    // const formDataObject: { [key: string]: any } = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    // console.log('Sending data:', formDataObject);
    // console.log('Token:', token);

    try {
      const response = await apiCall(
        '/create-event',
        'POST',
        formData,
        true
      );

      if (response.success) {
        setFlashMessage(response.message || "Event created successfully!");
        setFlashMessageType('success');
        setName('');
        setDate('');
        setTime('');
        setLocation('');
        setType('');
        setDescription('');
        setSelectedImageFile(null);
        setAllowCrowdfunding('no');
        setVisibility('public');

        setTimeout(() => {
          navigate('/my-events');
        }, 1500);
      } else {
        setFlashMessage(response.message || "Failed to create event.");
        setFlashMessageType('error');
      }
    } catch (error: any) {
      console.error('Create event error:', error);
      setFlashMessage(error.message || "Network error. Please try again later.");
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
              <label className={labelClasses}>Visibility</label>
              <select
                required
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                className={inputClasses}
              >
                <option value="public">public</option>
                <option value="private">private</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Allow Crowdfunding</label>
              <select
                required
                value={allowCrowdfunding}
                onChange={(e) => setAllowCrowdfunding(e.target.value as 'yes' | 'no')}
                className={inputClasses}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
        </div>
      </div>
      <FlashMessage message={flashMessage} type={flashMessageType} onClose={handleCloseFlash} />
    </div>
  );
};

export default CreateEventPage;
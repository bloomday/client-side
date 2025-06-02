import React from 'react';

interface CreateEventPageProps {
  newEvent: any;
  setNewEvent: (event: any) => void;
  handleCreateEvent: (e: React.FormEvent<HTMLFormElement>) => void;
  eventTypes: string[];
}

const CreateEventPage: React.FC<CreateEventPageProps> = ({ newEvent, setNewEvent, handleCreateEvent, eventTypes }) => (
  <div className="min-h-screen bg-[#14191f]py-8 px-4">
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#14191f] rounded-lg shadow-md p-6">
        <h1 className="text-lg font-bold text-white mb-8 text-center">Create a New Event</h1>
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              required
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Enter event name"
              className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-4 py-3 border bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                required
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              required
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="Enter event location"
              className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              required
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select event type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Describe your event..."
              rows={4}
              className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL (Optional)</label>
            <input
              type="url"
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-[#1f262e] border border-[#3d4c5c] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default CreateEventPage; 
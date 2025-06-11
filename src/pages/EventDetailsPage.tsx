import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Event } from '../types';

interface EventDetailsPageProps {
  event: Event | undefined;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ event }) => {
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
            <p className="text-lg opacity-90">Hosted by {event.hosts[0] || 'N/A'}</p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendees ({event.invitees ? event.invitees.length : 0})</h2>
              <div className="flex flex-wrap gap-2">
                {[...Array(Math.min(event.invitees ? event.invitees.length : 0, 20))].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {String.fromCharCode(65 + (i % 26))}
                  </div>
                ))}
                {(event.invitees ? event.invitees.length : 0) > 20 && (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    +{(event.invitees ? event.invitees.length : 0) - 20}
                  </div>
                )}
              </div>
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
                    <p>{event.hosts[0] || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {new Date(event.date) > new Date() && (
                  <>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all">
                      RSVP - Free
                    </button>
                    <button className="w-full bg-coral-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-coral-600 transition-all">
                      Buy Tickets - $25
                    </button>
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
    </div>
  );
};

export default EventDetailsPage; 
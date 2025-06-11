import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types';

export interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  showPastLabel?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, showPastLabel = false }) => (
  <div 
    className="bg-[#1f262e] border border-[#3d4c5c] rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
    onClick={() => onClick(event)}
  >
    <img 
      src={event.ivImage || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'} 
      alt={event.name}
      className="w-full h-32 object-cover"
    />
    <div className="p-4">
      {showPastLabel && (
        <span className="inline-block bg-gray-200 text-teal-800 text-xs px-2 py-1 rounded-full mb-2">
          Past Event
        </span>
      )}
      <h3 className="font-semibold text-lg mb-2 text-teal-400">{event.name}</h3>
      <div className="flex items-center text-gray-600 text-sm mb-1">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{event.location}</span>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2">{event.description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="w-4 h-4 mr-1" />
          <span>{event.invitees ? event.invitees.length : 0} attending</span>
        </div>
        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
          {event.type || 'General'}
        </span>
      </div>
    </div>
  </div>
);

export default EventCard; 
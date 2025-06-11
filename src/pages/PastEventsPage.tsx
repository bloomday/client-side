import React from 'react';
import EventCard from '../components/EventCard';
import { Event } from '../types';

interface PastEventsPageProps {
  pastEvents: Event[];
  setCurrentPage: (page: string) => void;
}

const PastEventsPage: React.FC<PastEventsPageProps> = ({ pastEvents, setCurrentPage }) => (
  <div className="min-h-screen bg-[#14191f] py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-lg font-bold text-white mb-8 text-center">Past Events</h1>
      {pastEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map(event => (
            <EventCard 
              key={event._id} 
              event={event} 
              onClick={(event) => setCurrentPage(`event-${event._id}`)}
              showPastLabel={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No past events to display.</p>
        </div>
      )}
    </div>
  </div>
);

export default PastEventsPage; 
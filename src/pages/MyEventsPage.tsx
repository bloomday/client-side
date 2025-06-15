import React from 'react';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';

interface MyEventsPageProps {
  myEvents: Event[];
}

const MyEventsPage: React.FC<MyEventsPageProps> = ({ myEvents }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#14191f] flex flex-col justify-between max-w-screen-lg mx-auto pt-16">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">My Events</h2>
      <div className="flex flex-wrap items-stretch gap-3 px-4">
        {myEvents.length > 0 ? (
          myEvents.map(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            return (
              <div
                key={event._id}
                className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] flex h-full flex-col gap-4 rounded-lg bg-[#1f262e] border border-purple-500 p-4 cursor-pointer transform transition-transform hover:scale-105 relative"
                onClick={() => navigate(`/event/${event._id}`)}
              >
                <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">Your Event</span>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                  style={{ backgroundImage: `url('${event.ivImage || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'}')` }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">{event.name}</p>
                  <p className="text-[#9dadbe] text-sm font-normal leading-normal">{formattedDate} at {formattedTime}</p>
                  <p className="text-[#9dadbe] text-xs font-normal leading-normal mt-1">{event.location}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 w-full">
            <p className="text-[#9dadbe] text-lg">You haven't created any events yet.</p>
            <button 
              onClick={() => navigate('/create')}
              className="mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all transform hover:scale-105"
            >
              Create Your First Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage; 
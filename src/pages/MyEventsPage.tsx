import React from 'react';

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type?: string;
  hosts: string[];
  slug: string;
  eventUrl: string;
  qrCode: string;
  allowCrowdfunding: boolean;
  invitees: string[];
  ivImage: string | null;
  gallery: any[];
  contributions: any[];
  __v: number;
  totalAmount: number;
  contributors: number;
  score: number;
  views: number; // Added views property
}

interface MyEventsPageProps {
  myEvents: Event[];
  setCurrentPage: (page: string) => void;
}

const MyEventsPage: React.FC<MyEventsPageProps> = ({ myEvents, setCurrentPage }) => (
  <div className="min-h-screen bg-[#14191f] flex flex-col justify-between max-w-screen-lg mx-auto py-8 px-4">
    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">My Events</h2>
    <div className="flex flex-wrap items-stretch p-4 gap-3">
      {myEvents.length > 0 ? (
        myEvents.map(event => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          return (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 bg-[#1f262e] border border-[#3d4c5c] p-4" key={event._id}>
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
            onClick={() => setCurrentPage('create')}
            className="mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            Create Your First Event
          </button>
        </div>
      )}
    </div>
    <div className="h-5 bg-[#14191f]"></div>
  </div>
);

export default MyEventsPage; 
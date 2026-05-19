import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Event } from '../types/index';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  upcomingEvents: Event[];
}

const HomePage: React.FC<HomePageProps> = ({ upcomingEvents }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1, containScroll: 'keepSnaps' });

  return (
    <div className="min-h-screen bg-[#14191f] flex flex-col justify-between max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#14191f]">
        <div className="max-w-screen-lg mx-auto flex items-center p-4 pb-4 justify-between">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">Bloomday</h2>
          <div className="flex items-center justify-end">
            <button
              onClick={() => navigate('/create')}
              className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 text-sm"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full px-0 md:px-4 py-3 pt-16">
        <div className="relative w-full min-h-[180px] md:min-h-[218px] rounded-none md:rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover object-center absolute inset-0"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14191f] via-[#14191f]/80 to-transparent" />
        </div>
      </div>

      {/* Trending Events Carousel Section */}
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Hosted Events</h2>
      <div className="embla overflow-hidden px-4" ref={emblaRef}>
        <div className="embla__container flex w-full cursor-grab">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              const eventDate = new Date(event.date);
              const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              const isMyEvent = userId && event.hosts && event.hosts.some(host => host._id === userId);

              return (
                <div key={event._id} className="embla__slide flex-shrink-0">
                  <div
                    className={`flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1f262e] border ${isMyEvent ? 'border-purple-500' : 'border-[#3d4c5c]'} p-4 cursor-pointer transform transition-transform`}
                    onClick={() => navigate('/event/' + event._id)}
                  >
                    {isMyEvent && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">Your Event</span>
                    )}
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
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 w-full">
              <p className="text-[#9dadbe] text-lg">No hosted events available yet.</p>
              <button 
                onClick={() => navigate('/create')}
                className="mt-4 bg-[#dce7f3] text-[#14191f] px-6 py-3 rounded-lg font-bold hover:bg-[#b5c9e3] transition-colors"
              >
                Create New Event
              </button>
            </div>
          )}
        </div>
      </div>
      {/* View All Trending Events Link */}
      {upcomingEvents.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
          >
            View All Trending Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quick Links Section */}
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-5">Quick Links</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">

        <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer" onClick={() => navigate('/my-events')}>
          <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M208,64H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V80A16,16,0,0,0,208,64ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V64H96ZM208,208H48V80H208V208Z"></path></svg>
          <h2 className="text-white text-base font-bold leading-tight">My Events</h2>
        </div>
        <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer" onClick={() => navigate('/past')}>
          <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>
          <h2 className="text-white text-base font-bold leading-tight">Past Events</h2>
        </div>
      
      </div>
      <div className="h-5 bg-[#14191f]"></div>
    </div>
  );
};

export default HomePage; 
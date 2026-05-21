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
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
  });

  return (
    <div className="min-h-screen bg-[#14191f] flex flex-col justify-between w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#14191f]">
        <div className="max-w-7xl mx-auto flex items-center p-4 pb-4 justify-between px-4 md:px-8 lg:px-12">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
            Bloomday
          </h2>

          <div className="flex items-center justify-end">
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/create')}
                className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 text-sm"
              >
                Create Event
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-lg font-bold border border-[#3d4c5c] text-white hover:bg-[#1f262e] transition-colors text-sm"
                >
                  Log In
                </button>

                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-10 lg:py-16 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-teal-400 font-semibold mb-3">
              Community Event Platform
            </p>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Host unforgettable moments with Bloomday
            </h1>

            <p className="text-[#9dadbe] text-lg leading-relaxed mb-8 max-w-xl">
              Discover celebrations, weddings, conferences, and memorable community events.
              Bloomday helps people host and experience meaningful moments together.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/browse')}
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 transition-all"
              >
                Browse Events
              </button>

              {!isLoggedIn ? (
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 rounded-lg font-semibold border border-[#3d4c5c] text-white hover:bg-[#1f262e] transition-all"
                >
                  Join Bloomday
                </button>
              ) : (
                <button
                  onClick={() => navigate('/create')}
                  className="px-6 py-3 rounded-lg font-semibold border border-[#3d4c5c] text-white hover:bg-[#1f262e] transition-all"
                >
                  Create Event
                </button>
              )}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
              alt="Community celebration"
              className="rounded-2xl shadow-2xl border border-[#26313d] object-cover h-[420px] w-full max-w-xl"
            />
          </div>
        </div>
      </div>

      {/* Hosted Events Carousel Section */}
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Hosted Events
      </h2>

      <div className="embla overflow-hidden px-4" ref={emblaRef}>
        <div className="embla__container flex w-full cursor-grab">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const eventDate = new Date(event.date);

              const formattedDate = eventDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              const formattedTime = eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });

              const isMyEvent =
                userId && event.hosts && event.hosts.some((host) => host._id === userId);

              const isPastEvent = eventDate < new Date();

              const eventStatus =
                event.visibility === 'private'
                  ? 'Private'
                  : isPastEvent
                    ? 'Past Event'
                    : 'Upcoming';

              return (
                <div key={event._id} className="embla__slide flex-shrink-0">
                  <div
                    className={`relative flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#1f262e] border ${
                      isMyEvent ? 'border-purple-500' : 'border-[#3d4c5c]'
                    } p-4 cursor-pointer transform transition-transform`}
                    onClick={() => navigate('/event/' + event._id)}
                  >
                    {isMyEvent && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        Your Event
                      </span>
                    )}

                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                      style={{
                        backgroundImage: `url('${
                          event.ivImage ||
                          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'
                        }')`,
                      }}
                    />

                    <div>
                      <div className="mb-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            eventStatus === 'Upcoming'
                              ? 'bg-green-500/20 text-green-300'
                              : eventStatus === 'Past Event'
                                ? 'bg-gray-500/20 text-gray-300'
                                : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {eventStatus}
                        </span>
                      </div>

                      <p className="text-white text-base font-medium leading-normal">
                        {event.name}
                      </p>

                      <p className="text-[#9dadbe] text-sm font-normal leading-normal">
                        {formattedDate} at {formattedTime}
                      </p>

                      <p className="text-[#9dadbe] text-xs font-normal leading-normal mt-1">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 w-full">
              <p className="text-[#9dadbe] text-lg mb-4">
                No hosted events available yet.
              </p>

              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/create')}
                  className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 text-sm"
                >
                  Create Event
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg font-bold border border-[#3d4c5c] text-white hover:bg-[#1f262e] transition-colors text-sm"
                  >
                    Log In
                  </button>

                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:from-purple-700 hover:to-teal-700 text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Community Stats Section */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#3d4c5c] bg-[#1f262e] p-4 text-center">
            <p className="text-2xl font-bold text-white">52</p>
            <p className="text-xs text-[#9dadbe] mt-1">Community Members</p>
          </div>

          <div className="rounded-xl border border-[#3d4c5c] bg-[#1f262e] p-4 text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-[#9dadbe] mt-1">
              Successfully Hosted Events
            </p>
          </div>

          <div className="rounded-xl border border-[#3d4c5c] bg-[#1f262e] p-4 text-center">
            <p className="text-2xl font-bold text-white">1</p>
            <p className="text-xs text-[#9dadbe] mt-1">
              Growing Event Platform
            </p>
          </div>
        </div>
      </div>

      {/* View All Hosted Events Link */}
      {upcomingEvents.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition-all"
          >
            Browse Hosted Events
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quick Links Section */}
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-5">
        Quick Links
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {isLoggedIn ? (
          <div
            className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer"
            onClick={() => navigate('/my-events')}
          >
            <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,64H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V80A16,16,0,0,0,208,64ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V64H96ZM208,208H48V80H208V208Z" />
            </svg>

            <h2 className="text-white text-base font-bold leading-tight">
              My Events
            </h2>
          </div>
        ) : (
          <div
            className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer"
            onClick={() => navigate('/register')}
          >
            <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128 128a40 40 0 1 0-40-40 40 40 0 0 0 40 40Zm0 16c-35.35 0-64 17.91-64 40v8a8 8 0 0 0 16 0v-8c0-13.23 21.49-24 48-24s48 10.77 48 24v8a8 8 0 0 0 16 0v-8c0-22.09-28.65-40-64-40Z" />
            </svg>

            <h2 className="text-white text-base font-bold leading-tight">
              Join Bloomday
            </h2>
          </div>
        )}

        <div
          className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer"
          onClick={() => navigate('/past')}
        >
          <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z" />
          </svg>

          <h2 className="text-white text-base font-bold leading-tight">
            Past Events
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
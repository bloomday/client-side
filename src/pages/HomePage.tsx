import React from 'react';

interface HomePageProps {
  upcomingEvents: any[];
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ upcomingEvents, setCurrentPage }) => (
  <div className="min-h-screen bg-[#14191f] flex flex-col justify-between max-w-screen-lg mx-auto">
    {/* Header */}
    <div className="flex items-center bg-[#14191f] p-4 pb-2 justify-between">
      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">Bloomday</h2>
      <div className="flex w-12 items-center justify-end">
        <button
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
        >
          {/* <span className="sr-only">Settings</span> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
          </svg> */}
        </button>
      </div>
    </div>

    {/* Hero Image Section */}
    <div className="w-full px-0 md:px-4 py-3">
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

    {/* Upcoming Events Section */}
    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Upcoming Events</h2>
    <div className="flex flex-wrap items-stretch p-4 gap-3">
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map(event => (
          <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 bg-[#1f262e] border border-[#3d4c5c] p-4" key={event.id}>
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
              style={{ backgroundImage: `url('${event.image}')` }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">{event.name}</p>
              <p className="text-[#9dadbe] text-sm font-normal leading-normal">{event.date} at {event.time}</p>
              <p className="text-[#9dadbe] text-xs font-normal leading-normal mt-1">{event.location}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 w-full">
          <p className="text-[#9dadbe] text-lg">No upcoming events yet.</p>
          <button 
            onClick={() => setCurrentPage('create')}
            className="mt-4 bg-[#dce7f3] text-[#14191f] px-6 py-3 rounded-lg font-bold hover:bg-[#b5c9e3] transition-colors"
          >
            Create New Event
          </button>
        </div>
      )}
    </div>

    {/* Quick Links Section */}
    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Quick Links</h2>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer" onClick={() => setCurrentPage('browse')}>
        <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
        <h2 className="text-white text-base font-bold leading-tight">Search</h2>
      </div>
      <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4c5c] bg-[#1f262e] p-4 items-center cursor-pointer" onClick={() => setCurrentPage('past')}>
        <svg className="text-white" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>
        <h2 className="text-white text-base font-bold leading-tight">Past Events</h2>
      </div>
    </div>
    <div className="h-5 bg-[#14191f]"></div>
  </div>
);

export default HomePage; 
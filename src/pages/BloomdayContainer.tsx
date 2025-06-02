import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';
import BackButton from '../components/layout/BackButton';
import HomePage from './HomePage';
import CreateEventPage from './CreateEventPage';
import BrowseEventsPage from './BrowseEventsPage';
import PastEventsPage from './PastEventsPage';
import EventDetailsPage from './EventDetailsPage';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  host: string;
  attendees: number;
  image: string;
  isPast: boolean;
}

interface DateRange {
  start: string;
  end: string;
}

const eventTypes = ['Wedding', 'Birthday', 'Get Together', 'House Party', 'Festival', 'Conference', 'Workshop'];

const BloomdayContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Summer Music Festival",
      date: "2025-07-15",
      time: "18:00",
      location: "Central Park",
      type: "Festival",
      description: "Join us for an amazing evening of live music featuring local and international artists.",
      host: "MusicEvents Co.",
      attendees: 152,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
      isPast: false
    },
    {
      id: 2,
      name: "Birthday Celebration",
      date: "2025-06-20",
      time: "19:30",
      location: "Downtown Venue",
      type: "Birthday",
      description: "Come celebrate Sarah's 25th birthday with food, drinks, and great company!",
      host: "Sarah Johnson",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=200&fit=crop",
      isPast: false
    },
    {
      id: 3,
      name: "Tech Meetup",
      date: "2025-05-10",
      time: "18:30",
      location: "Innovation Hub",
      type: "Get Together",
      description: "Monthly networking event for tech professionals and enthusiasts.",
      host: "Tech Community",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      isPast: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; dateRange: DateRange }>({
    type: '',
    dateRange: { start: '', end: '' }
  });

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'host' | 'attendees' | 'isPast'>>({
    name: '',
    date: '',
    time: '',
    location: '',
    type: '',
    description: '',
    image: ''
  });

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event: Event = {
      ...newEvent,
      id: Date.now(),
      host: 'You',
      attendees: 0,
      isPast: false,
      image: newEvent.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'
    };
    setEvents([...events, event]);
    setNewEvent({
      name: '',
      date: '',
      time: '',
      location: '',
      type: '',
      description: '',
      image: ''
    });
    setCurrentPage('home');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedFilters.type || event.type === selectedFilters.type;
    const matchesDate = (!selectedFilters.dateRange.start || event.date >= selectedFilters.dateRange.start) &&
      (!selectedFilters.dateRange.end || event.date <= selectedFilters.dateRange.end);
    return matchesSearch && matchesType && matchesDate;
  });

  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage upcomingEvents={upcomingEvents} setCurrentPage={setCurrentPage} />;
    if (currentPage === 'create') return <CreateEventPage newEvent={newEvent} setNewEvent={setNewEvent} handleCreateEvent={handleCreateEvent} eventTypes={eventTypes} />;
    if (currentPage === 'browse') return <BrowseEventsPage filteredEvents={filteredEvents} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} eventTypes={eventTypes} setCurrentPage={setCurrentPage} />;
    if (currentPage === 'past') return <PastEventsPage pastEvents={pastEvents} setCurrentPage={setCurrentPage} />;
    if (currentPage.startsWith('event-')) {
      const eventId = currentPage.replace('event-', '');
      const event = events.find(e => e.id === parseInt(eventId));
      return <EventDetailsPage event={event} />;
    }
    return <HomePage upcomingEvents={upcomingEvents} setCurrentPage={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen bg-[#14191f]">
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bg-coral-500 { background-color: #FF7F50; }
        .bg-coral-600 { background-color: #FF6347; }
        .bg-coral-400 { background-color: #FA8072; }
        .text-coral-800 { color: #DC143C; }
        .bg-teal-100 { background-color: #E6FFFA; }
        .text-teal-800 { color: #2D3748; }
        @media (max-width: 768px) {
          .pb-20 { padding-bottom: 5rem; }
        }
      `}</style>
      {/* <Navbar setCurrentPage={setCurrentPage} /> */}
      {currentPage !== 'home' && <BackButton setCurrentPage={setCurrentPage} />}
      <div className="pb-20 md:pb-0">
        {renderPage()}
      </div>
      <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default BloomdayContainer; 
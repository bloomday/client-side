import React, { useState, useEffect } from 'react';
import MobileNav from '../components/layout/MobileNav';
import BackButton from '../components/layout/BackButton';
import HomePage from './HomePage';
import CreateEventPage from './CreateEventPage';
import BrowseEventsPage from './BrowseEventsPage';
import PastEventsPage from './PastEventsPage';
import EventDetailsPage from './EventDetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import VerifyEmailPage from './VerifyEmailPage';
import MyEventsPage from './MyEventsPage';
import AccountPage from './AccountPage';
import { Event } from '../types/index';
import { apiCall } from '../utils/api';
import { useLocation, Routes, Route, useNavigate, useParams } from 'react-router-dom';

interface DateRange {
  start: string;
  end: string;
}

const eventTypes = ['Wedding', 'Birthday', 'Get Together', 'House Party', 'Festival', 'Conference', 'Workshop'];

const BloomdayContainer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trendingEvents, setTrendingEvents] = useState<{ trending: Event[] }>({ trending: [] });
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; dateRange: DateRange }>({
    type: '',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await apiCall<{ trending: Event[] }>('https://bloomday-server-side.onrender.com/events/trending', 'GET', undefined, true);
        if (response.success && response.data) {
          setTrendingEvents(response.data);
          console.log("All Trending Events Dates:", response.data.trending.map(event => event.date));
          console.log("Current Date for comparison:", new Date());
        } else {
          console.error("Failed to fetch trending events:", response.message);
          setTrendingEvents({ trending: [] });
        }
      } catch (error) {
        console.error("Error fetching trending events:", error);
        setTrendingEvents({ trending: [] });
      }
    };

    const fetchMyEvents = async () => {
      try {
        const response = await apiCall<{ events: Event[] }>('https://bloomday-server-side.onrender.com/my-events', 'GET', undefined, true);
        if (response.success && response.data) {
          console.log("My Events API response data:", response.data);
          setMyEvents(response.data.events);
        } else {
          console.error("Failed to fetch user's events:", response.message);
          setMyEvents([]);
        }
      } catch (error) {
        console.error("Error fetching user's events:", error);
        setMyEvents([]);
      }
    };

    if (localStorage.getItem('token')) {
      fetchTrendingEvents();
      fetchMyEvents();
    } else {
      navigate('/login', { replace: true });
    }
  }, [location.pathname, navigate]);

  const filteredEvents = (Array.isArray(trendingEvents.trending) ? trendingEvents.trending : []).filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedFilters.type || event.type === selectedFilters.type;
    const matchesDate = (!selectedFilters.dateRange.start || event.date >= selectedFilters.dateRange.start) &&
      (!selectedFilters.dateRange.end || event.date <= selectedFilters.dateRange.end);
    return matchesSearch && matchesType && matchesDate;
  });

  const upcomingEvents = (Array.isArray(trendingEvents.trending) ? trendingEvents.trending : []);
  console.log("Upcoming Events after filter:", upcomingEvents);
  const pastEvents = (Array.isArray(trendingEvents.trending) ? trendingEvents.trending : []).filter(event => new Date(event.date) <= new Date());

  const renderPage = () => {
    console.log("Current trendingEvents before filter:", trendingEvents);
    return (
      <Routes>
        <Route path="/" element={<HomePage upcomingEvents={upcomingEvents} />} />
        <Route path="/create" element={<CreateEventPage eventTypes={eventTypes} />} />
        <Route path="/browse" element={<BrowseEventsPage filteredEvents={filteredEvents} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} eventTypes={eventTypes} />} />
        <Route path="/past" element={<PastEventsPage pastEvents={pastEvents} />} />
        <Route path="/my-events" element={<MyEventsPage myEvents={myEvents} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPageWrapper />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/event/:id" element={<EventDetailsPageWrapper />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  };

  // Wrapper component to pass the token to ResetPasswordPage
  const ResetPasswordPageWrapper: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    if (!token) {
      return <LoginPage />; // Redirect to login if token is missing
    }
    return <ResetPasswordPage token={token} />;
  };

  const EventDetailsPageWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchEvent = async () => {
        if (!id) {
          console.error("Event ID is missing.");
          navigate('/');
          return;
        }
        try {
          const response = await apiCall<{ event: Event, totalAmount: number }>(`https://bloomday-server-side.onrender.com/event/${id}/details`, 'GET', undefined, true);
          if (response.success && response.data) {
            console.log("Event details fetched successfully:", response.data);
            setEvent(response.data.event);
          } else {
            console.error("Failed to fetch event details:", response.message, response);
            navigate('/');
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
          navigate('/');
        }
      };
      fetchEvent();
    }, [id, navigate]);

    if (!event) {
      return (
        <div className="min-h-screen bg-[#14191f] flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ); // Or a loading spinner
    }
    return <EventDetailsPage event={event} />;
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/reset-password/') || location.pathname === '/forgot-password' || location.pathname === '/auth/verify-email';

  return (
    <div className={'bg-[#14191f]'}>
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
      {!isAuthPage && location.pathname !== '/' && <BackButton />}
      <div className="pb-20 md:pb-0">
        {renderPage()}
      </div>
      {!isAuthPage && <MobileNav />}
    </div>
  );
};

export default BloomdayContainer; 
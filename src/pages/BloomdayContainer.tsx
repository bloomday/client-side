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
}

interface DateRange {
  start: string;
  end: string;
}

const eventTypes = ['Wedding', 'Birthday', 'Get Together', 'House Party', 'Festival', 'Conference', 'Workshop'];

const BloomdayContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; dateRange: DateRange }>({
    type: '',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    const path = window.location.pathname;
    const search = window.location.search;

    if (path === '/auth/verify-email' && search.includes('token=')) {
      setCurrentPage('verify-email-route');
    } else if (path.startsWith('/auth/reset-password/') && search.includes('token=')) {
      const token = path.split('/')[3];
      setCurrentPage(`reset-password/${token}`);
    } else if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/register') {
      setCurrentPage('register');
    } else if (path === '/forgot-password') {
      setCurrentPage('forgot-password');
    } else {
      setCurrentPage('login');
    }

    const fetchTrendingEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("No token found for fetching trending events.");
          return;
        }

        const response = await fetch('https://bloomday-server-side.onrender.com/events/trending', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setTrendingEvents(result.trending || []);
        } else {
          console.error("Failed to fetch trending events:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching trending events:", error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchTrendingEvents();
    }
  }, [currentPage]);

  const filteredEvents = trendingEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedFilters.type || event.type === selectedFilters.type;
    const matchesDate = (!selectedFilters.dateRange.start || event.date >= selectedFilters.dateRange.start) &&
      (!selectedFilters.dateRange.end || event.date <= selectedFilters.dateRange.end);
    return matchesSearch && matchesType && matchesDate;
  });

  const upcomingEvents = trendingEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = trendingEvents.filter(event => new Date(event.date) <= new Date());

  const renderPage = () => {
    const pageProps = { setCurrentPage };
    if (currentPage === 'home') return <HomePage {...pageProps} upcomingEvents={upcomingEvents} />;
    if (currentPage === 'create') return <CreateEventPage {...pageProps} eventTypes={eventTypes} />;
    if (currentPage === 'browse') return <BrowseEventsPage {...pageProps} filteredEvents={filteredEvents} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} eventTypes={eventTypes} />;
    if (currentPage === 'past') return <PastEventsPage {...pageProps} pastEvents={pastEvents} />;
    if (currentPage === 'login') return <LoginPage {...pageProps} />;
    if (currentPage === 'register') return <RegisterPage {...pageProps} />;
    if (currentPage === 'forgot-password') return <ForgotPasswordPage {...pageProps} />;
    if (currentPage.startsWith('reset-password/')) {
      const token = currentPage.split('/')[1];
      return <ResetPasswordPage setCurrentPage={setCurrentPage} token={token} />;
    }
    if (currentPage === 'verify-email-route') {
      return <VerifyEmailPage setCurrentPage={setCurrentPage} />;
    }
    if (currentPage.startsWith('event-')) {
      const eventId = currentPage.replace('event-', '');
      const event = trendingEvents.find(e => e._id === eventId);
      return <EventDetailsPage {...pageProps} event={event} />;
    }
    return <HomePage {...pageProps} upcomingEvents={upcomingEvents} />;
  };

  return (
    <div className={'min-h-screen bg-[#14191f]'}>
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
      {(currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'register' && !currentPage.startsWith('reset-password/') && currentPage !== 'forgot-password' && currentPage !== 'verify-email-route') && <BackButton setCurrentPage={setCurrentPage} />}
      <div className="pb-20 md:pb-0">
        {renderPage()}
      </div>
      {(currentPage !== 'login' && currentPage !== 'register' && !currentPage.startsWith('reset-password/') && currentPage !== 'forgot-password' && currentPage !== 'verify-email-route') && <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default BloomdayContainer; 
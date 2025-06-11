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
import { Event } from '../types';

interface DateRange {
  start: string;
  end: string;
}

const eventTypes = ['Wedding', 'Birthday', 'Get Together', 'House Party', 'Festival', 'Conference', 'Workshop'];

const BloomdayContainer: React.FC = () => {
  const [currentPage, _setInternalCurrentPage] = useState<string>('login');
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; dateRange: DateRange }>({
    type: '',
    dateRange: { start: '', end: '' }
  });

  const setCurrentPage = (page: string, replaceHistory = false) => {
    const newPath = page === 'home' ? '/' : `/${page}`;
    let pathForHistory = newPath;

    if (page === 'verify-email-route') {
      pathForHistory = `/auth/verify-email${window.location.search}`;
    } else if (page.startsWith('reset-password/')) {
      const token = page.split('/')[1];
      pathForHistory = `/auth/reset-password/${token}`;
    } else if (page === 'home') {
      pathForHistory = '/';
    } else if (page === 'login' || page === 'register' || page === 'forgot-password') {
      pathForHistory = `/${page}`;
    } else if (page.startsWith('event-')) {
      const eventId = page.replace('event-', '');
      pathForHistory = `/event/${eventId}`;
    }

    if (replaceHistory) {
      window.history.replaceState(null, '', pathForHistory);
    } else {
      window.history.pushState(null, '', pathForHistory);
    }
    _setInternalCurrentPage(page);
  };

  useEffect(() => {
    const setPageFromUrl = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      let targetPage = 'login'; // Default to login
      let shouldReplaceHistory = false;

      if (path === '/auth/verify-email' && search.includes('token=')) {
        targetPage = 'verify-email-route';
      } else if (path.startsWith('/auth/reset-password/') && path.split('/').length > 2) {
        const token = path.split('/')[2];
        targetPage = `reset-password/${token}`;
      } else if (path === '/login' || path === '/register' || path === '/forgot-password') {
        if (localStorage.getItem('token')) {
          targetPage = 'home';
          shouldReplaceHistory = true; // Redirect to home if already logged in
        } else {
          targetPage = path.substring(1);
        }
      } else if (path === '/') {
        if (!localStorage.getItem('token')) {
          targetPage = 'login';
          shouldReplaceHistory = true; // Redirect to login if not logged in
        } else {
          targetPage = 'home';
        }
      } else {
        const pageFromPath = path.substring(1);
        const knownPages = ['create', 'browse', 'past', 'my-events'];
        if (knownPages.includes(pageFromPath) || pageFromPath.startsWith('event-')) {
          targetPage = pageFromPath;
        } else if (localStorage.getItem('token')) {
          targetPage = 'home';
          shouldReplaceHistory = true; // Redirect to home for unknown path if logged in
        } else {
          targetPage = 'login';
          shouldReplaceHistory = true; // Redirect to login for unknown path if not logged in
        }
      }

      // Only replace history if explicitly marked or if the determined target page is different from the current URL
      if (shouldReplaceHistory && window.location.pathname !== pathForHistory(targetPage)) {
        setCurrentPage(targetPage, true);
      } else {
        _setInternalCurrentPage(targetPage);
      }
    };

    // Helper to get the history path from the internal page name
    const pathForHistory = (page: string) => {
      if (page === 'home') return '/';
      if (page.startsWith('verify-email-route')) return `/auth/verify-email${window.location.search}`;
      if (page.startsWith('reset-password/')) return `/auth/reset-password/${page.split('/')[1]}`;
      if (page.startsWith('event-')) return `/event/${page.replace('event-', '')}`;
      return `/${page}`;
    };

    setPageFromUrl(); // Set initial page

    const handlePopState = () => {
      setPageFromUrl();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
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

    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("No token found for fetching user's events.");
          return;
        }

        const response = await fetch('https://bloomday-server-side.onrender.com/my-events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setMyEvents(result.events || []);
        } else {
          console.error("Failed to fetch user's events:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user's events:", error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchTrendingEvents();
      fetchMyEvents();
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
    if (currentPage === 'my-events') return <MyEventsPage {...pageProps} myEvents={myEvents} />;
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
      {(currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'register' && !currentPage.startsWith('reset-password/') && currentPage !== 'forgot-password' && currentPage !== 'verify-email-route' && currentPage !== 'my-events') && <BackButton setCurrentPage={setCurrentPage} />}
      <div className="pb-20 md:pb-0">
        {renderPage()}
      </div>
      {(currentPage !== 'login' && currentPage !== 'register' && !currentPage.startsWith('reset-password/') && currentPage !== 'forgot-password' && currentPage !== 'verify-email-route' && currentPage !== 'my-events') && <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default BloomdayContainer; 
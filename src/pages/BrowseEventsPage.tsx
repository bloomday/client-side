import React from 'react';
import EventCard from '../components/EventCard';
import { Search } from 'lucide-react';
import { Event } from '../types';

interface BrowseEventsPageProps {
  filteredEvents: Event[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: { type: string; dateRange: { start: string; end: string } };
  setSelectedFilters: (filters: any) => void;
  eventTypes: string[];
  setCurrentPage: (page: string) => void;
}

const BrowseEventsPage: React.FC<BrowseEventsPageProps> = ({ filteredEvents, searchQuery, setSearchQuery, selectedFilters, setSelectedFilters, eventTypes, setCurrentPage }) => (
  <div className="min-h-screen bg-[#14191f] py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-8 text-center">Browse Events</h2>
      <div className="bg-[#1f262e] border border-[#3d4c5c] rounded-lg shadow-md p-6 mb-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 w-5 h-5" />
            <input
              type="text"
              // placeholder="Search for events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#223449] text-teal-700  rounded-lg focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={selectedFilters.type}
                onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#223449] text-teal-700 rounded-lg focus:ring-2 focus:ring-teal-600"
              >
                <option value="">All Types</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={selectedFilters.dateRange.start}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  dateRange: { ...selectedFilters.dateRange, start: e.target.value }
                })}
                className="w-full px-4 py-2 bg-[#223449] text-teal-700 rounded-lg focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={selectedFilters.dateRange.end}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  dateRange: { ...selectedFilters.dateRange, end: e.target.value }
                })}
                className="w-full px-4 py-2 bg-[#223449] text-teal-700 rounded-lg focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>
        </div>
      </div>
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event._id} 
              event={event} 
              onClick={(event) => setCurrentPage(`event-${event._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  </div>
);

export default BrowseEventsPage; 
import { apiCall } from '../utils/api';

export const eventsService = {
  getHostedEvents: async () => {
    return apiCall('/events/hosted-events', 'GET', undefined, false);
  },
};
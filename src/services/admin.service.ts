import { apiCall } from '../utils/api';

export const adminService = {
  getAllUsers: async () => {
    return apiCall('/admin/users');
  },
};
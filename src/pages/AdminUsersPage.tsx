import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';

interface AdminUser {
  _id: string;
  name?: string;
  fullName?: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface AdminUsersResponse {
  success: boolean;
  message: string;
  totalUsers: number;
  users: AdminUser[];
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const response = await apiCall<AdminUsersResponse>(
        '/admin/users',
        'GET',
        undefined,
        true
      );

      if (response.success && response.data) {
        setUsers(response.data.users || []);
        setTotalUsers(response.data.totalUsers || 0);
      } else {
        setErrorMessage(response.message || 'Unable to fetch users.');
      }

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.fullName || user.name || '';
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.role || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#14191f] text-white px-4 py-6 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <p className="text-[#9dadbe] text-sm">Admin Dashboard</p>
        <h1 className="text-2xl font-bold">Registered Users</h1>
        <p className="text-[#9dadbe] mt-1">
          View platform sign-ups and user growth evidence for Bloomday.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-[#1f262e] border border-[#3d4c5c] p-4">
          <p className="text-[#9dadbe] text-sm">Total Registered Users</p>
          <h2 className="text-3xl font-bold mt-2">{totalUsers}</h2>
        </div>

        <div className="rounded-xl bg-[#1f262e] border border-[#3d4c5c] p-4">
          <p className="text-[#9dadbe] text-sm">Displayed Users</p>
          <h2 className="text-3xl font-bold mt-2">{filteredUsers.length}</h2>
        </div>
      </div>

      <div className="mb-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full px-4 py-3 rounded-lg bg-[#1f262e] border border-[#3d4c5c] text-white placeholder:text-[#9dadbe] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {isLoading && (
        <div className="text-center py-12 text-[#9dadbe]">
          Loading users...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 text-red-300 p-4">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && (
        <div className="overflow-x-auto rounded-xl border border-[#3d4c5c] bg-[#1f262e]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#26313d] text-[#9dadbe]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-[#3d4c5c]">
                  <td className="px-4 py-3">
                    {user.fullName || user.name || 'Unnamed User'}
                  </td>
                  <td className="px-4 py-3 text-[#9dadbe]">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-purple-600/20 text-purple-300 px-3 py-1 text-xs">
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#9dadbe]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#9dadbe]">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
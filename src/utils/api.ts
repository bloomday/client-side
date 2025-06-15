// Define a general API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}

// Function to handle 401 unauthorized responses
export const handleUnauthorized = () => {
  console.log('401 Unauthorized: Clearing user data and redirecting to login.');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  // Using window.location.href for a full page reload and clean state
  window.location.href = '/login'; 
};

// Generic API call utility
export async function apiCall<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object,
  requiresAuth: boolean = true
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // If token is missing but auth is required, consider it unauthorized
      handleUnauthorized();
      return { success: false, message: 'Authentication required, but no token found.', statusCode: 401 };
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Do not handle 401 globally for the sign-in endpoint; let the component handle it.
    if (response.status === 401 && !url.includes('/signin')) {
      handleUnauthorized();
      return { success: false, message: 'Session expired. Please log in again.', statusCode: 401 };
    }

    const data: T = await response.json();

    if (response.ok) {
      return { success: true, data, statusCode: response.status };
    } else {
      // For non-OK responses, return the server's message or a generic error
      return { success: false, message: (data as any).message || 'An error occurred', statusCode: response.status };
    }
  } catch (error) {
    console.error('API call error:', error);
    return { success: false, message: (error as Error).message || 'Network error', statusCode: 500 };
  }
} 
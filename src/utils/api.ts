// Define a general API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}

// Function to handle 401 unauthorized responses
export const handleUnauthorized = () => {
  console.log('handleUnauthorized: Redirecting to login.');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  // Using window.location.href for a full page reload and clean state
  window.location.href = '/login'; 
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://bloomday-server-side.onrender.com';

// Generic API call utility
export async function apiCall<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object,
  requiresAuth: boolean = true
): Promise<ApiResponse<T>> {
  console.log("apiCall received URL:", url);
  const headers: HeadersInit = {};
  let requestBody: BodyInit | undefined;

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    requestBody = body ? JSON.stringify(body) : undefined;
  } else {
    requestBody = body;
  }

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("API Request Token:", token);
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // If token is missing but auth is required, consider it unauthorized
      console.log('apiCall: Token missing, calling handleUnauthorized.');
      handleUnauthorized();
      return { success: false, message: 'Authentication required, but no token found.', statusCode: 401 };
    }
  }

  try {
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : API_BASE_URL + url;
    // console.log("API Call fullUrl:", fullUrl);

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: requestBody,
    });

    // Do not handle 401 globally for the sign-in endpoint; let the component handle it.
    if (response.status === 401 && !url.includes('/signin')) {
      console.log('apiCall: Received 401 status, calling handleUnauthorized.');
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
    return { success: false, message: 'An error occurred, please try again later.', statusCode: 500 };
  }
} 
import axios from 'axios';

/**
 * Configured axios instance for all real API calls.
 * Base URL and auth token are injected via environment variables and Zustand store.
 *
 * Backend team: set VITE_API_BASE_URL in .env.local to point to your server.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('irefer_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 → clear session and redirect to login
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('irefer_access_token');
      localStorage.removeItem('irefer_refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

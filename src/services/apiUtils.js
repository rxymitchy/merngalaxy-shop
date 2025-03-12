
// API URLs
export const API_URL = 'http://localhost:5000/api';

// Helper function for error handling
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Check if we should use mock data
export const useMockData = () => {
  return process.env.NODE_ENV === 'development' || true; // Force mock data for now
};

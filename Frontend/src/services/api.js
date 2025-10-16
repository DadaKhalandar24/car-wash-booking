import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const bookingAPI = {
  // Get all bookings with filters
  getBookings: (params = {}) => api.get('/bookings', { params }),
  
  // Search bookings
  searchBookings: (query, page = 1) => 
    api.get('/bookings/search', { params: { q: query, page } }),
  
  // Get single booking
  getBooking: (id) => api.get(`/bookings/${id}`),
  
  // Create booking
  createBooking: (data) => api.post('/bookings', data),
  
  // Update booking
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  
  // Delete booking
  deleteBooking: (id) => api.delete(`/bookings/${id}`),
};

export default api;

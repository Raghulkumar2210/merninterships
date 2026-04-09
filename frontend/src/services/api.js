import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Income API
export const incomeAPI = {
  getAll: () => api.get('/income'),
  create: (data) => api.post('/income', data),
  update: (id, data) => api.put(`/income/${id}`, data),
  delete: (id) => api.delete(`/income/${id}`),
};

// Expense API
export const expenseAPI = {
  getAll: () => api.get('/expense'),
  create: (data) => api.post('/expense', data),
  update: (id, data) => api.put(`/expense/${id}`, data),
  delete: (id) => api.delete(`/expense/${id}`),
};

export default api;
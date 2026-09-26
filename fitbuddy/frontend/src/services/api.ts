import axios from 'axios';
import type { FitnessProfile, ProgressLog } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitbuddy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profile: Partial<FitnessProfile> & { name?: string }) => api.put('/user/profile', profile),
};

export const fitnessAPI = {
  generatePlan: (profileData?: Partial<FitnessProfile>) => api.post('/fitness/generate-plan', profileData),
  getPlan: () => api.get('/fitness/plan'),
};

export const workoutAPI = {
  toggleComplete: (payload: { exerciseId?: string; dayIndex?: number; completed: boolean; type?: string; mealKey?: string }) =>
    api.post('/workout/complete', payload),
};

export const progressAPI = {
  getProgress: () => api.get('/progress'),
  logProgress: (data: Partial<ProgressLog>) => api.post('/progress', data),
};

export const aiAPI = {
  sendChatMessage: (message: string, history?: any[]) => api.post('/ai/chat', { message, history }),
};

export default api;

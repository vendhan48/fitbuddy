import axios from 'axios';
import type { FitnessProfile } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fitnessAPI = {
  generatePlan: (profileData?: Partial<FitnessProfile>) => api.post('/fitness/generate-plan', profileData),
};

export const aiAPI = {
  sendChatMessage: (message: string, profile?: Partial<FitnessProfile>) => api.post('/ai/chat', { message, profile }),
};

export default api;

import axios, { type AxiosResponse } from 'axios';
import type {
  AuthResponse,
  RegisterResponse,
  Discussion,
  CreateDiscussionRequest,
  AddOperationRequest,
  LoginRequest,
  RegisterRequest,
  Operation
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Token management
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken();
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', data);
    const { token } = response.data;
    tokenManager.setToken(token);
    return response.data;
  },

  logout: (): void => {
    tokenManager.removeToken();
  }
};

// Discussion API functions
export const discussionAPI = {
  getDiscussions: async (): Promise<Discussion[]> => {
    const response: AxiosResponse<Discussion[]> = await api.get('/discussions');
    return response.data;
  },

  createDiscussion: async (data: CreateDiscussionRequest): Promise<Discussion> => {
    const response: AxiosResponse<Discussion> = await api.post('/discussions', data);
    return response.data;
  },

  addOperation: async (data: AddOperationRequest): Promise<Operation> => {
    const response: AxiosResponse<Operation> = await api.post('/operations', data);
    return response.data;
  }
};

// Utility functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getOperationSymbol = (operationType: string): string => {
  switch (operationType) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return operationType;
  }
};

export const calculateResult = (leftNumber: number, operationType: string, rightNumber: number): number => {
  switch (operationType) {
    case 'add': return leftNumber + rightNumber;
    case 'subtract': return leftNumber - rightNumber;
    case 'multiply': return leftNumber * rightNumber;
    case 'divide': return rightNumber !== 0 ? leftNumber / rightNumber : 0;
    default: return leftNumber;
  }
};

export const calculateLeftNumber = (result: number, operationType: string, rightNumber: number): number => {
  switch (operationType) {
    case 'add': return result - rightNumber;
    case 'subtract': return result + rightNumber;
    case 'multiply': return rightNumber !== 0 ? result / rightNumber : 0;
    case 'divide': return result * rightNumber;
    default: return result;
  }
};

export default api;

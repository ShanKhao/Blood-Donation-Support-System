import axios, { AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  district: string;
  bloodType: string;
  role: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  role: string;
  token: string;
}

export class AuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
      
      // Validate response data
      if (!response.data || !response.data.token) {
        throw new AuthError('INVALID_RESPONSE', 'Invalid response from server');
      }

      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new AuthError('INVALID_CREDENTIALS', 'Invalid email or password');
        }
        if (error.response?.data?.message) {
          throw new AuthError('SERVER_ERROR', error.response.data.message);
        }
      }
      throw new AuthError('NETWORK_ERROR', 'Failed to connect to server');
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, data);
      
      // Validate response data
      if (!response.data || !response.data.token) {
        throw new AuthError('INVALID_RESPONSE', 'Invalid response from server');
      }

      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          throw new AuthError('EMAIL_EXISTS', 'Email already exists');
        }
        if (error.response?.data?.message) {
          throw new AuthError('SERVER_ERROR', error.response.data.message);
        }
      }
      throw new AuthError('NETWORK_ERROR', 'Failed to connect to server');
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN);
      
      if (!response.data || !response.data.token) {
        throw new AuthError('INVALID_RESPONSE', 'Invalid response from server');
      }

      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        throw new AuthError('TOKEN_EXPIRED', 'Session expired, please login again');
      }
      throw new AuthError('NETWORK_ERROR', 'Failed to refresh token');
    }
  },

  async revokeToken(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.REVOKE_TOKEN);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Failed to revoke token:', error);
      // Still remove token from local storage even if server call fails
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Basic JWT expiration check
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
}; 
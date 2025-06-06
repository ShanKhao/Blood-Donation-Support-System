import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  User,
  BloodRequest,
  Donor,
  BloodInventory,
  DashboardStats,
  MonthlyReport,
  DonorStatistics,
  ApiResponse,
  PaginatedResponse
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to handle API responses
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  return response.data;
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password });
    return handleResponse(response);
  },
  register: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/auth/register', userData);
    return handleResponse(response);
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },
};

// Blood Requests API
export const bloodRequestApi = {
  getAll: async (params?: { page?: number; status?: string; search?: string }): Promise<ApiResponse<PaginatedResponse<BloodRequest>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<BloodRequest>>>('/blood-requests', { params });
    return handleResponse(response);
  },
  getById: async (id: string): Promise<ApiResponse<BloodRequest>> => {
    const response = await api.get<ApiResponse<BloodRequest>>(`/blood-requests/${id}`);
    return handleResponse(response);
  },
  create: async (request: Partial<BloodRequest>): Promise<ApiResponse<BloodRequest>> => {
    const response = await api.post<ApiResponse<BloodRequest>>('/blood-requests', request);
    return handleResponse(response);
  },
  update: async (id: string, request: Partial<BloodRequest>): Promise<ApiResponse<BloodRequest>> => {
    const response = await api.put<ApiResponse<BloodRequest>>(`/blood-requests/${id}`, request);
    return handleResponse(response);
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/blood-requests/${id}`);
    return handleResponse(response);
  },
};

// Donors API
export const donorApi = {
  getAll: async (params?: { page?: number; bloodType?: string; status?: string; search?: string }): Promise<ApiResponse<PaginatedResponse<Donor>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<Donor>>>('/donors', { params });
    return handleResponse(response);
  },
  getById: async (id: string): Promise<ApiResponse<Donor>> => {
    const response = await api.get<ApiResponse<Donor>>(`/donors/${id}`);
    return handleResponse(response);
  },
  create: async (donor: Partial<Donor>): Promise<ApiResponse<Donor>> => {
    const response = await api.post<ApiResponse<Donor>>('/donors', donor);
    return handleResponse(response);
  },
  update: async (id: string, donor: Partial<Donor>): Promise<ApiResponse<Donor>> => {
    const response = await api.put<ApiResponse<Donor>>(`/donors/${id}`, donor);
    return handleResponse(response);
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/donors/${id}`);
    return handleResponse(response);
  },
};

// Inventory API
export const inventoryApi = {
  getAll: async (): Promise<ApiResponse<BloodInventory[]>> => {
    const response = await api.get<ApiResponse<BloodInventory[]>>('/inventory');
    return handleResponse(response);
  },
  update: async (type: string, units: number): Promise<ApiResponse<BloodInventory>> => {
    const response = await api.put<ApiResponse<BloodInventory>>(`/inventory/${type}`, { units });
    return handleResponse(response);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return handleResponse(response);
  },
  getMonthlyReport: async (month: string): Promise<ApiResponse<MonthlyReport>> => {
    const response = await api.get<ApiResponse<MonthlyReport>>(`/dashboard/reports/monthly/${month}`);
    return handleResponse(response);
  },
  getDonorStats: async (): Promise<ApiResponse<DonorStatistics>> => {
    const response = await api.get<ApiResponse<DonorStatistics>>('/dashboard/stats/donors');
    return handleResponse(response);
  },
};

// System Log type
interface SystemLog {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

// Admin API
export const adminApi = {
  getAllUsers: async (params?: { page?: number; role?: string; search?: string }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<User>>>('/admin/users', { params });
    return handleResponse(response);
  },
  updateUser: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/admin/users/${id}`, userData);
    return handleResponse(response);
  },
  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/admin/users/${id}`);
    return handleResponse(response);
  },
  getSystemLogs: async (params?: { page?: number; type?: string }): Promise<ApiResponse<PaginatedResponse<SystemLog>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<SystemLog>>>('/admin/logs', { params });
    return handleResponse(response);
  },
}; 
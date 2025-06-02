import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  district: string;
  city: string;
  address: string;
  bloodType: string;
  role: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  district?: string;
  city?: string;
  address?: string;
  bloodType?: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get(API_ENDPOINTS.GET_USER_BY_ID);
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw new Error('Failed to get user information');
    }
  },

  async updateUser(data: UpdateUserRequest): Promise<User> {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user information');
    }
  },

  async deleteUser(): Promise<void> {
    try {
      await api.delete(API_ENDPOINTS.DELETE_USER);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user account');
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get(API_ENDPOINTS.GET_ALL_USERS);
      return response.data;
    } catch (error) {
      console.error('Failed to get users:', error);
      throw new Error('Failed to get users list');
    }
  },
}; 
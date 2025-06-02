import { API_BASE_URL as ENV_API_BASE_URL } from '@/config/api';

export const API_BASE_URL = ENV_API_BASE_URL;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/Auth/login',
  REGISTER: '/api/Auth/register',
  REFRESH_TOKEN: '/api/Auth/refresh-token',
  REVOKE_TOKEN: '/api/Auth/revoke-token',

  // User endpoints
  GET_USER_BY_ID: '/api/User',
  UPDATE_USER: '/api/User',
  DELETE_USER: '/api/User',
  GET_ALL_USERS: '/api/User/all',

  // Blood Bank endpoints
  GET_BLOOD_BANKS: '/api/BloodBank',
  GET_BLOOD_BANK_BY_ID: (id: number) => `/api/BloodBank/${id}`,
  CREATE_BLOOD_BANK: '/api/BloodBank',
  UPDATE_BLOOD_BANK: (id: number) => `/api/BloodBank/${id}`,
  DELETE_BLOOD_BANK: (id: number) => `/api/BloodBank/${id}`,

  // Blood Request endpoints
  GET_BLOOD_REQUESTS: '/api/BloodRequest',
  GET_BLOOD_REQUEST_BY_ID: (id: number) => `/api/BloodRequest/${id}`,
  CREATE_BLOOD_REQUEST: '/api/BloodRequest',
  UPDATE_BLOOD_REQUEST: (id: number) => `/api/BloodRequest/${id}`,
  DELETE_BLOOD_REQUEST: (id: number) => `/api/BloodRequest/${id}`,

  // Campaign endpoints
  GET_CAMPAIGNS: '/api/Campaign',
  GET_CAMPAIGN_BY_ID: (id: number) => `/api/Campaign/${id}`,
  CREATE_CAMPAIGN: '/api/Campaign',
  UPDATE_CAMPAIGN: (id: number) => `/api/Campaign/${id}`,
  DELETE_CAMPAIGN: (id: number) => `/api/Campaign/${id}`,

  // Donation History endpoints
  GET_DONATION_HISTORIES: '/api/DonationHistory',
  GET_DONATION_HISTORY_BY_ID: (id: number) => `/api/DonationHistory/${id}`,
  CREATE_DONATION_HISTORY: '/api/DonationHistory',
  UPDATE_DONATION_HISTORY: (id: number) => `/api/DonationHistory/${id}`,
  DELETE_DONATION_HISTORY: (id: number) => `/api/DonationHistory/${id}`,
}; 
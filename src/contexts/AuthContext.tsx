import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, User } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, registerSchema } from '@/lib/validations';
import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/services/api.config';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  district: string;
  city: string;
  address: string;
  bloodType: string;
  role: string;
}

interface ApiError {
  message: string;
  status: number;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      // Validate input data
      await loginSchema.parseAsync(credentials);

      const response = await axiosInstance.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.LOGIN, credentials);
      const { token, user: userData } = response.data.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate('/');
    } catch (error) {
      const axiosError = error as Error & { response?: { data: ApiError } };
      toast({
        title: "Error",
        description: axiosError.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      // Validate input data
      await registerSchema.parseAsync(data);

      const response = await axiosInstance.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.REGISTER, data);
      const { token, user: userData } = response.data.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);

      toast({
        title: "Success",
        description: "Registration successful",
      });
      navigate('/');
    } catch (error) {
      const axiosError = error as Error & { response?: { data: ApiError } };
      toast({
        title: "Error",
        description: axiosError.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.REVOKE_TOKEN);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
      navigate('/login');
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
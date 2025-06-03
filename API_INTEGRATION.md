 # Blood Care API Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [API Integration Setup](#api-integration-setup)
3. [Authentication](#authentication)
4. [State Management](#state-management)
5. [API Service Implementation](#api-service-implementation)
6. [Error Handling](#error-handling)
7. [Example Usage](#example-usage)

## Overview

This document provides guidance on integrating the Blood Care frontend application with your group's Swagger API. The frontend is built using React with TypeScript and uses modern tools and libraries for optimal performance and developer experience.

### Tech Stack
- React 18+
- TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- Shadcn/ui Components
- Tailwind CSS

## API Integration Setup

1. First, create an API configuration file:

```typescript
// src/config/api.ts
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://your-api-url';
export const API_TIMEOUT = 30000; // 30 seconds
```

2. Create an Axios instance with default configuration:

```typescript
// src/lib/axios.ts
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@/config/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## Authentication

1. Create authentication service:

```typescript
// src/services/auth.service.ts
import axios from '@/lib/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  bloodType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await axios.post('/auth/register', data);
    return response.data;
  },

  async logout() {
    const response = await axios.post('/auth/logout');
    return response.data;
  },

  async getCurrentUser() {
    const response = await axios.get('/auth/me');
    return response.data;
  },
};
```

## State Management

1. Create authentication context:

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: any | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem('token', response.token);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
```

## API Service Implementation

Create services for different features:

```typescript
// src/services/profile.service.ts
import axios from '@/lib/axios';

export const profileService = {
  async updateProfile(data: any) {
    const response = await axios.put('/profile', data);
    return response.data;
  },

  async getDonationHistory() {
    const response = await axios.get('/profile/donations');
    return response.data;
  },
};

// src/services/blog.service.ts
import axios from '@/lib/axios';

export const blogService = {
  async getPosts(page = 1, limit = 10) {
    const response = await axios.get('/blog', { params: { page, limit } });
    return response.data;
  },

  async getPost(id: string) {
    const response = await axios.get(`/blog/${id}`);
    return response.data;
  },
};
```

## Error Handling

Create a custom error handling utility:

```typescript
// src/utils/error-handler.ts
import { toast } from '@/components/ui/use-toast';

export const handleError = (error: any) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
};
```

## Example Usage

Here's how to use the API services in your components:

```typescript
// src/pages/Login.tsx
import { useAuth } from '@/contexts/AuthContext';
import { handleError } from '@/utils/error-handler';

const Login = () => {
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      // Redirect or show success message
    } catch (error) {
      handleError(error);
    }
  };
  
  // Rest of the component...
};

// src/pages/Profile.tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';

const Profile = () => {
  const { data: donationHistory } = useQuery({
    queryKey: ['donationHistory'],
    queryFn: () => profileService.getDonationHistory(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => profileService.updateProfile(data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
    onError: handleError,
  });

  // Rest of the component...
};
```

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://your-api-url
```

## Getting Started

1. Install dependencies:
```bash
npm install axios @tanstack/react-query
```

2. Update your `main.tsx` to include providers:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

3. Protect routes that require authentication:

```typescript
// src/components/ProtectedRoute.tsx
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Use in App.tsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
```

This documentation provides a foundation for integrating your frontend with the Swagger API. Adjust the endpoints and data structures according to your specific API documentation.
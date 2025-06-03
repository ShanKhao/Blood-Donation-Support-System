import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, LoginRequest, RegisterRequest, AuthResponse, AuthError } from '@/services/auth.service';
import { userService, User } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, registerSchema } from '@/lib/validations';

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
      if (authService.isAuthenticated()) {
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

      const authResponse = await authService.login(credentials);
      const userData = await userService.getCurrentUser();
      setUser(userData);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate('/');
    } catch (error) {
      if (error instanceof AuthError) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      // Validate input data
      await registerSchema.parseAsync(data);

      const authResponse = await authService.register(data);
      const userData = await userService.getCurrentUser();
      setUser(userData);
      toast({
        title: "Success",
        description: "Registration successful",
      });
      navigate('/');
    } catch (error) {
      if (error instanceof AuthError) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.revokeToken();
      setUser(null);
      navigate('/login');
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear user state even if server call fails
      setUser(null);
      navigate('/login');
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
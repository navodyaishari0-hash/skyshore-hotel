'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USERS: Record<string, { password: string; user: User }> = {
  'guest@hotel.com': {
    password: 'password123',
    user: {
      id: 'user-1',
      email: 'guest@hotel.com',
      name: 'Alexandra Sterling',
      phone: '+1 (555) 123-4567',
      avatar: '/images/avatars/default.jpg',
      role: 'guest',
      loyaltyPoints: 2450,
      memberSince: '2023-06-15',
    },
  },
  'admin@hotel.com': {
    password: 'admin123',
    user: {
      id: 'user-2',
      email: 'admin@hotel.com',
      name: 'Hotel Admin',
      phone: '+1 (555) 987-6543',
      avatar: '/images/avatars/admin.jpg',
      role: 'admin',
      loyaltyPoints: 10000,
      memberSince: '2022-01-01',
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hotel-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('hotel-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const record = DUMMY_USERS[email];
    if (record && record.password === password) {
      setUser(record.user);
      localStorage.setItem('hotel-user', JSON.stringify(record.user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone || '',
      avatar: '/images/avatars/default.jpg',
      role: 'guest',
      loyaltyPoints: 100,
      memberSince: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    localStorage.setItem('hotel-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hotel-user');
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('hotel-user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

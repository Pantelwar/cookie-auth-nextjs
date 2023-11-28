'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.cookie.split(';').forEach((cookie) => {
      if (cookie.trim().startsWith('isAuthenticated')) {
        setIsAuthenticated(true);
      }
    });
    setIsInitialized(true);
  }, []);

  const login = () => {
    console.log('login');
    setIsAuthenticated(true);
    document.cookie = `isAuthenticated=true;`;
  };

  const logout = () => {
    console.log('logout');
    setIsAuthenticated(false);
    document.cookie = `isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <AuthContext.Provider
      value={{
        isInitialized,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

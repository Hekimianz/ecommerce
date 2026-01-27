'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { jwtDecode } from 'jwt-decode';

type Role = 'admin' | 'user';
type JwtPayload = { sub: string; email: string; role: Role; exp?: number };

type AuthContextValue = {
  token: string | null;
  user: JwtPayload | null;
  isAuthenticated: boolean;
  ready: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'accessToken';

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setTokenState(saved);
    setReady(true);
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) localStorage.setItem(STORAGE_KEY, newToken);
    else localStorage.removeItem(STORAGE_KEY);
    setTokenState(newToken);
  };

  const user = useMemo(() => (token ? decodeToken(token) : null), [token]);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider
      value={{
        token: user ? token : null,
        user,
        isAuthenticated: !!user,
        ready,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

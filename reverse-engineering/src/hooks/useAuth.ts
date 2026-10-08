import { useState, useEffect } from 'react';
import type { AuthUser } from '../types';
import { getCurrentUser, loginUser, logoutUser } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const result = loginUser(email, password);
    if (result) {
      setUser(result);
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return { user, loading, login, logout };
}

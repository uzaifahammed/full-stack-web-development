import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('placement_user');
      return savedUser ? JSON.parse(savedUser) : mockUser;
    } catch {
      return mockUser;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('placement_token') || 'demo_jwt_token_2026');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('placement_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('placement_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('placement_token', token);
    } else {
      localStorage.removeItem('placement_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (err) {
      console.warn('Backend unavailable, switching to mock login:', err.message);
      // Fallback demo user login
      const demo = {
        id: 'usr_demo',
        name: email.split('@')[0] || 'Demo Student',
        email,
        college: 'College of Engineering',
        graduationYear: '2026',
        solvedProblems: ['prob_1', 'prob_3']
      };
      setUser(demo);
      setToken('demo_token_authenticated');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, college, graduationYear) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, college, graduationYear })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (err) {
      console.warn('Backend unavailable, switching to mock registration:', err.message);
      const newUser = {
        id: 'usr_new',
        name,
        email,
        college: college || 'Engineering College',
        graduationYear: graduationYear || '2026',
        solvedProblems: []
      };
      setUser(newUser);
      setToken('demo_token_authenticated');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('placement_user');
    localStorage.removeItem('placement_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

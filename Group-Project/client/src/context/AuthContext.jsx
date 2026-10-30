import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('travelmate_user');
      if (saved) return JSON.parse(saved);
      // Default demo profile matching screenshots
      return {
        id: 'usr_uzaif',
        name: 'Uzaif',
        email: 'shaikmullauzaifahamed.24.csm@anits.edu.in',
        college: 'Anil Neerukonda Institute of Technology & Sciences',
        rollNo: 'A24126552178'
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('travelmate_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('travelmate_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) return { success: false, error: 'Please enter both email and password' };
    const namePart = email.split('@')[0];
    const loggedUser = {
      id: 'usr_' + Date.now(),
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email
    };
    setUser(loggedUser);
    return { success: true };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) return { success: false, error: 'All fields are required' };
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelmate_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

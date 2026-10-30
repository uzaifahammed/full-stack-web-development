import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Aptitude from './pages/Aptitude';
import Coding from './pages/Coding';
import Interview from './pages/Interview';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/aptitude" element={<Aptitude />} />
              <Route path="/coding" element={<Coding />} />
              <Route path="/interview" element={<Interview />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>
              <strong>Placement Preparation Portal (MERN)</strong> • Developed by S.Uzaif Ahamed (A24126552178)
            </p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>
              Assignment 2 Individual Project • React + Node.js + Express + MongoDB
            </p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

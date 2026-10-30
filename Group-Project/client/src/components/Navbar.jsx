import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <div className="brand-icon">✈</div>
          <span>TravelMate</span>
        </Link>

        <ul className="nav-menu">
          <li>
            <NavLink to="/explore" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              🧭 Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              🗺️ Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/planner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              📅 Planner
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              🤍 Favourites
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              👤 Profile
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          {!isAuthenticated && (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.45rem 1rem' }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

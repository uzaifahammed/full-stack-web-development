import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand">
          <div className="nav-brand-logo">P</div>
          <span>PlacementPrep</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/aptitude" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Aptitude Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/coding" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Coding Practice
            </NavLink>
          </li>
          <li>
            <NavLink to="/interview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Interview Bank
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>👤</span>
                <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
              </NavLink>
              <button onClick={handleLogout} className="btn-outline" style={{ color: 'var(--danger)' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-outline">
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

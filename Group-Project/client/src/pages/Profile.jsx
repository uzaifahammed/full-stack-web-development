import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const { favourites, trips } = useTravel();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '960px' }}>
      {/* Profile Header */}
      <div className="card" style={{ padding: '36px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
        }}>
          {user?.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{user?.name || 'Uzaif Ahamed'}</h1>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '4px 10px' }}>
              🎒 Avid Traveller
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '8px' }}>
            📧 {user?.email || 'shaikmullauzaifahamed.24.csm@anits.edu.in'}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            🎓 Anil Neerukonda Institute of Technology & Sciences (ANITS) • B.Tech CSM-C (2024-2028)
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline"
          style={{ borderColor: 'var(--danger)', color: 'var(--danger)', alignSelf: 'flex-start' }}
        >
          🚪 Sign Out
        </button>
      </div>

      {/* Stats Counter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>💖</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{favourites.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Favourite Places</div>
        </div>
        <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🗺️</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>{trips.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Planned Itineraries</div>
        </div>
        <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>📍</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            {favourites.length > 0 ? favourites.length + trips.length : 2}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Destinations Saved</div>
        </div>
      </div>

      {/* Profile Details & Preferences */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Personal Details */}
        <div className="card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            👤 Student & Profile Info
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Full Name
              </span>
              <strong style={{ fontSize: '1rem' }}>{user?.name || 'Shaik Mulla Uzaif Ahamed'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Roll Number
              </span>
              <strong style={{ fontSize: '1rem' }}>A24126552178</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Department
              </span>
              <strong style={{ fontSize: '1rem' }}>Computer Science & Engineering (AI & ML)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Team Partner
              </span>
              <strong style={{ fontSize: '1rem' }}>Sari Dharani (A24126552176)</strong>
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ✈️ Travel Preferences
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Preferred Travel Style
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>Adventure Trekking</span>
                <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}>Scenic Nature</span>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Cultural Heritage</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Default Budget Bracket
              </span>
              <strong style={{ fontSize: '1rem', color: '#10b981' }}>₹5,000 - ₹20,000 (Budget to Moderate)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Quick Links
              </span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <Link to="/dashboard" className="btn btn-outline" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>
                  📊 View Dashboard
                </Link>
                <Link to="/planner" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>
                  🗓️ Plan New Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';

export default function Login() {
  const [email, setEmail] = useState('shaikmullauzaifahamed.24.csm@anits.edu.in');
  const [password, setPassword] = useState('anits123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { showToast } = useTravel();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.success) {
      showToast('Welcome back to TravelMate! 🚀');
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Failed to login');
    }
  };

  const handleDemoLogin = () => {
    setEmail('shaikmullauzaifahamed.24.csm@anits.edu.in');
    setPassword('anits123');
    const res = login('shaikmullauzaifahamed.24.csm@anits.edu.in', 'anits123');
    if (res.success) {
      showToast('Logged in as Uzaif! 🎒');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✈️</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Sign in to TravelMate</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Access your saved itineraries, favourites, and maps
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--danger)',
            padding: '12px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '18px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '6px' }}>
            Sign In
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-outline"
            style={{ width: '100%', padding: '10px' }}
          >
            ⚡ Quick Demo Sign In (Uzaif)
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
}

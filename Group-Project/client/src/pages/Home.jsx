import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { travelTips } from '../data/initialDestinations';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { destinations, addFavourite } = useTravel();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const featured = destinations.slice(0, 3);

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-box">
          <p className="hero-eyebrow">YOUR NEXT STORY STARTS HERE</p>
          <h1 className="hero-title">
            Explore more.<br />Remember forever.
          </h1>
          <p className="hero-sub">
            Discover remarkable places, save your favourites and turn travel ideas into simple plans.
          </p>

          <form className="search-bar-wrapper" onSubmit={handleSearch}>
            <span style={{ color: '#94a3b8' }}>🔍</span>
            <input
              type="text"
              className="search-bar-input"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.6rem 1.4rem' }}>
              Search
            </button>
          </form>

          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary">
              Explore places →
            </Link>
            <Link to="/planner" className="btn btn-secondary">
              Start planning
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Handpicked Destinations
            </p>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Featured Places to Visit</h2>
          </div>
          <Link to="/explore" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            View all destinations →
          </Link>
        </div>

        <div className="destinations-grid">
          {featured.map((place) => (
            <div key={place.id} className="destination-card">
              <div className="card-img-wrap">
                <img src={place.image} alt={place.name} className="card-img" />
              </div>
              <div className="card-body">
                <span className="card-badge">{place.category}</span>
                <h3 className="card-title">{place.name}</h3>
                <p className="card-loc">📍 {place.location}</p>
                <p className="card-desc">{place.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => addFavourite(place)}>
                    🤍 Save place
                  </button>
                  <Link to={`/map?q=${encodeURIComponent(place.name + ', ' + place.location)}`} className="btn btn-outline" style={{ padding: '0.5rem 0.75rem' }} title="View on Map">
                    🗺️
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Tips Section */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Expert Insights
            </p>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Travel Tips for Your Journey</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {travelTips.map((tip, idx) => (
              <div key={idx} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>
                  {idx === 0 ? '🎒' : idx === 1 ? '🧭' : '🤝'}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{tip.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

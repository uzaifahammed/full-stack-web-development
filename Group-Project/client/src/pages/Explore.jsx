import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState('All');
  const { destinations, addFavourite, favourites } = useTravel();

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search'));
    }
  }, [searchParams]);

  const categories = ['All', 'Beach', 'Mountain', 'Heritage', 'Adventure'];

  const filtered = destinations.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          FIND YOUR NEXT PLACE
        </p>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Explore destinations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Search places across India, filter by interest or browse curated destinations.
        </p>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px', maxWidth: '420px' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            🔍
          </span>
          <input
            type="text"
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
            placeholder="Search by place name, region or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of destinations */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🏝️</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No destinations found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Try modifying your search keywords or clear your category filter.
          </p>
          <button onClick={() => { setSearchTerm(''); setCategory('All'); }} className="btn btn-primary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="destinations-grid">
          {filtered.map((place) => {
            const isFav = favourites.some((f) => f.name.toLowerCase() === place.name.toLowerCase());
            return (
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
                    <button
                      className={`btn ${isFav ? 'btn-outline' : 'btn-primary'}`}
                      style={{ flex: 1, padding: '0.55rem' }}
                      onClick={() => addFavourite(place)}
                    >
                      {isFav ? '❤️ Saved' : '🤍 Save place'}
                    </button>
                    <Link
                      to={`/map?q=${encodeURIComponent(place.name + ', ' + place.location)}`}
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 0.85rem' }}
                      title="View on Map"
                    >
                      🗺️ Map
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

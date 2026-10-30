import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || 'Taj Mahal, Agra';
  const [destinationQuery, setDestinationQuery] = useState(queryParam);
  const [activeDestination, setActiveDestination] = useState(queryParam);

  useEffect(() => {
    if (searchParams.get('q')) {
      setDestinationQuery(searchParams.get('q'));
      setActiveDestination(searchParams.get('q'));
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (destinationQuery.trim()) {
      setActiveDestination(destinationQuery.trim());
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeDestination)}`;

  return (
    <div className="container">
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>Find your way</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Search a destination, preview it on the map and open turn-by-turn navigation.
        </p>
      </div>

      {/* Destination Search Form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: '640px', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            📍
          </span>
          <input
            type="text"
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
            placeholder="Search destination (e.g. Taj Mahal, Agra, Goa)..."
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
          Show on map
        </button>
      </form>

      {/* Map + Sidebar Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
        {/* OpenStreetMap Embed */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '480px', boxShadow: 'var(--shadow-sm)' }}>
          <iframe
            title="OpenStreetMap"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=68.1,8.0,97.4,37.1&layer=mapnik&marker=20.5937,78.9629`}
            style={{ border: 0 }}
          ></iframe>
        </div>

        {/* Selected Destination Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
              SELECTED DESTINATION
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>{activeDestination}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Open Google Maps to choose your starting point and get live route options.
            </p>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              🧭 Navigate Now
            </a>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>☀️</span> Weather info
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Weather placeholder — 28°C Clear Skies. Connect your preferred weather API here later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

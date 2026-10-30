import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';
import AddFavouriteModal from '../components/AddFavouriteModal';

export default function Dashboard() {
  const { user } = useAuth();
  const { favourites, addFavourite, updateFavourite, deleteFavourite } = useTravel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  const handleEdit = (place) => {
    setEditingPlace(place);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlace(null);
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    if (editingPlace) {
      updateFavourite(editingPlace.id, formData);
    } else {
      addFavourite(formData);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            YOUR TRAVEL SPACE
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Welcome, {user?.name || 'Uzaif'} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Keep your favourite places close and your travel ideas organized.
          </p>
        </div>

        <button onClick={handleAddNew} className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
          + Add favourite
        </button>
      </div>

      {favourites.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '4rem 1.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🤍</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No favourite places saved yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Explore destinations and click "Save place", or manually add a custom destination!
          </p>
          <button onClick={handleAddNew} className="btn btn-primary">
            + Add your first favourite
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {favourites.map((fav) => (
            <div
              key={fav.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem'
              }}
            >
              {fav.image && (
                <div style={{ width: '110px', height: '110px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={fav.image} alt={fav.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="card-badge">{fav.category}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{fav.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{fav.location}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, flex: 1, marginBottom: '0.75rem' }}>
                  {fav.description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button onClick={() => handleEdit(fav)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    ✎ Edit
                  </button>
                  <button onClick={() => deleteFavourite(fav.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Favourite Modal */}
      <AddFavouriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        editingPlace={editingPlace}
      />
    </div>
  );
}

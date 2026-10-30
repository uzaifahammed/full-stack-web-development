import React, { useState, useEffect } from 'react';

export default function AddFavouriteModal({ isOpen, onClose, onSave, editingPlace }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Beach',
    location: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (editingPlace) {
      setFormData(editingPlace);
    } else {
      setFormData({
        name: '',
        category: 'Beach',
        location: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
      });
    }
  }, [editingPlace, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    onSave(formData);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-lg)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {editingPlace ? 'Edit Favourite Place' : 'Add Favourite Place'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Place Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none' }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Goa Coast"
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category</label>
            <select
              style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none', background: 'var(--bg-card)', color: 'var(--text-main)' }}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
              <option value="Heritage">Heritage</option>
              <option value="Adventure">Adventure</option>
              <option value="Spiritual">Spiritual</option>
              <option value="City">City</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Location</label>
            <input
              type="text"
              style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none' }}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Goa, India"
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Description</label>
            <textarea
              style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none', minHeight: '70px' }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Golden beaches, colourful markets and relaxed coastal days."
            ></textarea>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Image URL</label>
            <input
              type="url"
              style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none' }}
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingPlace ? 'Save Changes' : 'Add to Favourites'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

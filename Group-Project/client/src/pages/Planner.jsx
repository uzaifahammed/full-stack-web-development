import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';

export default function Planner() {
  const { plannedTrips, addPlannedTrip, deletePlannedTrip } = useTravel();

  // Create Trip form state
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [budget, setBudget] = useState('25000');
  const [notes, setNotes] = useState('');

  // Checklist state inside trip creation
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: 'ID Proof & Flight / Train tickets', done: true },
    { id: 2, text: 'Chargers, Power bank & Camera', done: false },
    { id: 3, text: 'Basic first-aid & Sunscreen', done: false }
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');

  // Budget estimator state
  const [dailySpend, setDailySpend] = useState(2548);
  const [numDays, setNumDays] = useState(4);

  const estimatedTotal = (Number(dailySpend) || 0) * (Number(numDays) || 0);

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    setChecklistItems([
      ...checklistItems,
      { id: Date.now(), text: newChecklistText.trim(), done: false }
    ]);
    setNewChecklistText('');
  };

  const handleToggleChecklist = (id) => {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleRemoveChecklistItem = (id) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id));
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();
    if (!destination.trim() || !travelDate) return;

    const dateObj = new Date(travelDate);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', options) : travelDate;

    addPlannedTrip({
      destination: destination.trim(),
      date: travelDate,
      formattedDate,
      budget: Number(budget).toLocaleString('en-IN') || budget,
      notes: notes.trim() || 'No notes added.',
      checklist: checklistItems.map((i) => i.text)
    });

    setDestination('');
    setTravelDate('');
    setNotes('');
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          PLAN WITH EASE
        </p>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Travel planner</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Build a simple plan, estimate a budget and prepare your packing list.
        </p>
      </div>

      <div className="planner-grid" style={{ marginBottom: '3rem' }}>
        {/* Left: Create a Trip Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>➕</span> Create a trip
          </h2>

          <form onSubmit={handleSaveTrip}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Destination</label>
              <input
                type="text"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                placeholder="e.g. Jaipur"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Travel date</label>
              <input
                type="date"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Budget (₹)</label>
              <input
                type="number"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                placeholder="25000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Notes</label>
              <textarea
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none', minHeight: '65px' }}
                placeholder="Hotel bookings, reminders..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Packing Checklist */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Packing checklist</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  style={{ flex: 1, padding: '0.6rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                  placeholder="Add an item"
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                />
                <button type="button" onClick={handleAddChecklistItem} className="btn btn-outline" style={{ padding: '0.6rem 1rem' }}>
                  +
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {checklistItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.5rem', background: 'var(--bg-page)', borderRadius: '4px', fontSize: '0.85rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
                      <input type="checkbox" checked={item.done} onChange={() => handleToggleChecklist(item.id)} />
                      <span>{item.text}</span>
                    </label>
                    <button type="button" onClick={() => handleRemoveChecklistItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '1rem' }}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              Save trip plan
            </button>
          </form>
        </div>

        {/* Right: Budget Estimator & Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📊</span> Budget estimator
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Daily spend (₹)</label>
              <input
                type="number"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                value={dailySpend}
                onChange={(e) => setDailySpend(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Number of days</label>
              <input
                type="number"
                style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}
                value={numDays}
                onChange={(e) => setNumDays(e.target.value)}
              />
            </div>

            <div style={{ padding: '1rem', background: 'var(--primary-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ESTIMATED TOTAL
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🧳</span> Packing tip
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Start with essentials: documents, medicines, chargers and weather-appropriate clothing. Add trip-specific gear last.
            </p>
          </div>
        </div>
      </div>

      {/* Planned Trips List */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>Your planned trips</h2>
        {plannedTrips.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No trips planned yet. Use the form above to add your first itinerary!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {plannedTrips.map((plan) => (
              <div key={plan.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{plan.formattedDate || plan.date}</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.35rem 0' }}>{plan.destination}</h3>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  ₹{plan.budget}
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1, marginBottom: '1rem' }}>
                  {plan.notes}
                </p>
                <button onClick={() => deletePlannedTrip(plan.id)} className="btn btn-outline" style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  🗑️ Delete plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

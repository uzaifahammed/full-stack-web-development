import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>✈ TravelMate</h4>
          <p style={{ maxWidth: '300px', fontSize: '0.85rem', color: '#a7f3d0' }}>
            Discover remarkable places, save your favourites and turn travel ideas into simple plans.
          </p>
        </div>

        <div className="footer-links">
          <h5>Explore</h5>
          <ul>
            <li><Link to="/explore">Places</Link></li>
            <li><Link to="/map">Interactive Map</Link></li>
            <li><Link to="/planner">Trip Planner</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h5>About</h5>
          <ul>
            <li><span>Full Stack Web Development</span></li>
            <li><span>Group Project 2024–2028</span></li>
            <li><span>ANITS College</span></li>
          </ul>
        </div>

        <div className="footer-links">
          <h5>Team Members</h5>
          <ul>
            <li><span>Sari Dharani (A24126552176)</span></li>
            <li><span>S.Siddhart (A24126552177)</span></li>
            <li><span>S.Uzaif Ahamed (A24126552178)</span></li>
            <li><span>S.Vamsi (A24126552179)</span></li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '0.8rem', color: '#6ee7b7' }}>
        © 2026 TravelMate. All rights reserved. Live at <a href="https://travelmate-1-hezl.onrender.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>travelmate-1-hezl.onrender.com</a>
      </div>
    </footer>
  );
}

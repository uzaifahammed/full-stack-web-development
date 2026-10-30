import React from 'react';
import data from './data.json';

export default function App() {
  return (
    <div className="app-container">
      <h1>{data.title || 'Individual Project'}</h1>
      <p>Welcome to Assignment 2: Individual Project</p>
    </div>
  );
}

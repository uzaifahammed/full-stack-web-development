import React from 'react';
import { useTravel } from '../context/TravelContext';

export default function Toast() {
  const { toast } = useTravel();
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <span>✨</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

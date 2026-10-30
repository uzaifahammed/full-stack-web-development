import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialDestinations } from '../data/initialDestinations';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(initialDestinations);

  // Favourites list
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('travelmate_favourites');
      if (saved) return JSON.parse(saved);
      // Default initial favourite matching screenshot
      return [
        {
          id: 'fav-1',
          name: 'Goa Coast',
          category: 'Beach',
          location: 'Goa, India',
          description: 'Golden beaches, colourful markets and relaxed coastal days.',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80'
        }
      ];
    } catch {
      return [];
    }
  });

  // Planned Trips list
  const [plannedTrips, setPlannedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('travelmate_plans');
      if (saved) return JSON.parse(saved);
      // Default initial plan matching screenshot
      return [
        {
          id: 'plan-1',
          destination: 'Jaipur',
          date: '2027-01-06',
          formattedDate: '6 Jan 2027',
          budget: '23,000',
          notes: 'No notes added.',
          checklist: ['Camera', 'Power bank', 'Comfortable walking shoes']
        }
      ];
    } catch {
      return [];
    }
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  useEffect(() => {
    localStorage.setItem('travelmate_favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('travelmate_plans', JSON.stringify(plannedTrips));
  }, [plannedTrips]);

  const addFavourite = (place) => {
    const exists = favourites.some((f) => f.name.toLowerCase() === place.name.toLowerCase());
    if (exists) {
      showToast(`${place.name} is already in your favourites!`, 'info');
      return;
    }
    const newFav = {
      id: 'fav-' + Date.now(),
      name: place.name,
      category: place.category || 'Travel',
      location: place.location || 'India',
      description: place.description || 'Saved from destinations.',
      image: place.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80'
    };
    setFavourites([newFav, ...favourites]);
    showToast(`Added ${place.name} to favourites!`);
  };

  const updateFavourite = (id, updatedData) => {
    setFavourites(favourites.map((f) => (f.id === id ? { ...f, ...updatedData } : f)));
    showToast('Favourite place updated successfully!');
  };

  const deleteFavourite = (id) => {
    setFavourites(favourites.filter((f) => f.id !== id));
    showToast('Removed from favourites.', 'info');
  };

  const addPlannedTrip = (trip) => {
    const newPlan = {
      id: 'plan-' + Date.now(),
      ...trip
    };
    setPlannedTrips([newPlan, ...plannedTrips]);
    showToast(`Trip to ${trip.destination} saved successfully!`);
  };

  const deletePlannedTrip = (id) => {
    setPlannedTrips(plannedTrips.filter((p) => p.id !== id));
    showToast('Trip plan deleted.', 'info');
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        favourites,
        addFavourite,
        updateFavourite,
        deleteFavourite,
        plannedTrips,
        addPlannedTrip,
        deletePlannedTrip,
        toast,
        showToast
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);

# TravelMate Backend Architecture Note

## ℹ️ Overview

**TravelMate** is architected as an autonomous, high-performance client-side Single Page Application (SPA) built with React 18 and Vite.

- **Current Deployment:** [https://travelmate-1-hezl.onrender.com](https://travelmate-1-hezl.onrender.com)
- **Data Persistence Strategy:** All user accounts, personal favorites, custom places, trip plans, budget allocations, and checklist items are persisted reliably in the user's browser via HTML5 `localStorage`.
- **Mapping & Geocoding:** Utilizes OpenStreetMap embeds and Google Maps URL protocols directly on the client without requiring intermediary API proxies.

## 🔮 Optional Future Server Integration

For multi-device synchronization and collaborative group travel planning, an Express.js backend can be attached with the following recommended REST endpoints:

### Planned Endpoints
- `POST /api/auth/register` — Register user account
- `POST /api/auth/login` — Authenticate and return JWT token
- `GET /api/destinations` — Retrieve destination catalog
- `GET /api/favorites` — Fetch user's saved favorite destinations
- `POST /api/favorites` — Save a new custom destination
- `DELETE /api/favorites/:id` — Remove destination from favorites
- `GET /api/trips` — Fetch user planned itineraries
- `POST /api/trips` — Save new trip itinerary and budget breakdown

## 👥 Student & Team Info
- **Team Members:**
  - Sari Dharani (`A24126552176`)
  - S.Siddhart (`A24126552177`)
  - S.Uzaif Ahamed (`A24126552178`) - `shaikmullauzaifahamed.24.csm@anits.edu.in`
  - S.Vamsi (`A24126552179`)
- **Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS)
- **Course:** Full Stack Web Development Lab (2024–2028)

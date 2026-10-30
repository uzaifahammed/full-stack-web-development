# TravelMate Client Application

This is the frontend single-page web application for **TravelMate**, built with **React 18**, **Vite**, and **React Router DOM v6**.

## 🚀 Live Demo
- **Live URL:** [https://travelmate-1-hezl.onrender.com](https://travelmate-1-hezl.onrender.com)

## 👥 Student & Team Info
- **Team Members:**
  - Sari Dharani (`A24126552176`)
  - S.Siddhart (`A24126552177`)
  - S.Uzaif Ahamed (`A24126552178`) - `shaikmullauzaifahamed.24.csm@anits.edu.in`
  - S.Vamsi (`A24126552179`)
- **Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS)
- **Department:** Computer Science & Engineering (AI & ML) - Section C (2024-2028)

## 🛠️ Tech Stack
- **Framework:** React 18
- **Tooling / Bundler:** Vite
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (`AuthContext`, `TravelContext`, `ThemeContext`)
- **Data Persistence:** Browser `localStorage` (destinations, favorites, trips, and authentication)
- **Styling:** Modern responsive CSS with custom variables, glassmorphism, responsive grid layouts, and light/dark theme support.
- **Mapping & Geo Services:** OpenStreetMap iframe integration + direct Google Maps turn-by-turn navigation URLs.

## 📁 Source Code Structure
```text
client/
├── index.html                     # HTML template with Google Fonts (Plus Jakarta Sans & Playfair Display)
├── package.json                   # Project dependencies and npm scripts
├── vite.config.js                 # Vite bundler configuration with @vitejs/plugin-react
├── src/
│   ├── main.jsx                   # React root mount with Context providers
│   ├── App.jsx                    # Route definitions and layout shell
│   ├── index.css                  # Global design tokens, light/dark themes, and layout styles
│   ├── context/
│   │   ├── AuthContext.jsx        # Login, registration, session persistence in localStorage
│   │   ├── TravelContext.jsx      # Destinations, user favorites CRUD, trip itineraries, toast triggers
│   │   └── ThemeContext.jsx       # Light and Dark theme toggle state
│   ├── data/
│   │   └── initialDestinations.js # Rich curated destination catalog (Beaches, Mountains, Heritage, etc.)
│   ├── components/
│   │   ├── Navbar.jsx             # Top navigation with responsive mobile menu & theme toggle
│   │   ├── Footer.jsx             # Footer with quick links and university attribution
│   │   ├── ProtectedRoute.jsx     # Route guard redirecting unauthenticated users to /login
│   │   ├── Toast.jsx              # Non-blocking animated toast alerts
│   │   └── AddFavouriteModal.jsx  # Modal dialog to add and save custom places
│   └── pages/
│       ├── Home.jsx               # Landing page with hero banner, search bar, features, and tips
│       ├── Explore.jsx            # Destination explorer with search filters and category pills
│       ├── MapPage.jsx            # Interactive OpenStreetMap viewer + Google Maps navigation link
│       ├── Planner.jsx            # Multi-day trip planner, budget estimator, and packing checklist
│       ├── Dashboard.jsx          # User Travel Space showcasing saved favourites and planned trips
│       ├── Profile.jsx            # Traveller profile view with stats and student details
│       ├── Login.jsx              # Authentication login with quick 1-click demo login
│       └── Register.jsx           # User registration screen
```

## ⚙️ Setup and Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

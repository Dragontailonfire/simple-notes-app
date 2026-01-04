# Day 5: Client-Side Routing & Global State

**Date**: 2026-01-03
**Focus**: Single Page Application (SPA) architecture, Client-side Routing, and Centralized State Management.

## Core Concepts Learned

### 1. The SPA Transition 🌐
We moved from a "everything-in-one-place" component to a multi-page architecture using `wouter-preact`.
*   **Static Pages**: Components like `Login` and `Home` are now entry points.
*   **Dynamic Routes**: Used `/note/:id` to fetch and render specific data based on the URL.

### 2. Centralized State (The Store Pattern) 🏪
Instead of passing props down multiple levels (Prop Drilling), we extracted state into `store.ts`.
*   **Preact Signals**: Used `signal` for high-performance, reactive state.
*   **Logic Extraction**: API calls (`fetchNotes`, `addNote`) are now shared actions, making components "thin" and focused on UI.

### 3. Navigation Hooks ⚓
Learned to manage browser history programmatically.
*   **`Link`**: Intercepts clicks to prevent full page reloads.
*   **`useLocation`**: Used to redirect users (e.g., going back to Home after deleting a note).

## Your Achievement
You successfully refactored a monolithic `App.tsx` into a modularized structure:
1.  **`store.ts`**: The engine (State + API).
2.  **`app.tsx`**: The router (Navigation).
3.  **`pages/`**: The views (Home, Detail, 404).

**The foundation is now ready for complex user flows.** 🏢

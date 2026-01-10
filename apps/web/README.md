# Simple Notes - Web Frontend

The frontend is a lightweight Single Page Application (SPA) built with Preact and styled with Bootstrap 5.

## Tech Stack

- **Framework**: [Preact](https://preactjs.com/)
- **State Management**: [@preact/signals](https://preactjs.com/guide/v10/signals/)
- **Routing**: [wouter-preact](https://github.com/molecula/wouter)
- **Styling**: Bootstrap 5 (Local `bootstrap.min.js`)
- **Build Tool**: Vite

## High-Level Architecture

### State (Store)
The application state is managed in `src/store.ts`. Components consume and update state via Preact Signals, ensuring precise updates without complex prop drilling.

### Routing
We use a dedicated `NoteDetail` page for editing. Routing logic is centralized in `App.tsx`.
- `/`: Home view (Note List)
- `/note/:id`: Detailed view and editing

### API Integration
Communication with the backend is handled via standard `fetch` calls, with the Vite dev server proxying requests from `/api` to the backend port.

## Commands

- `pnpm dev`: Start Vite development server
- `pnpm test`: Run unit tests with Vitest
- `pnpm build`: Generate production bundle

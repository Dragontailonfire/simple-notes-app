# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
# Install dependencies (from repo root)
pnpm install

# Start frontend dev server (port 3000)
pnpm web

# Start backend server (port 4000)
pnpm server

# Run frontend unit tests
pnpm --filter web test

# Run a single frontend test file
pnpm --filter web test src/components/NoteItem.test.tsx

# Run backend unit tests
pnpm --filter server test

# Run E2E tests (requires frontend + backend running)
cd apps/e2e && pnpm exec playwright test

# Run E2E tests with UI mode
cd apps/e2e && pnpm exec playwright test --ui
```

## Architecture Overview

This is a pnpm monorepo with three apps and one shared package:

### Frontend (`apps/web`)
- **Framework**: Preact with Vite, using `@preact/signals` for reactive state
- **Routing**: wouter-preact for client-side routing
- **Styling**: Bootstrap 5 (loaded via CDN in index.html)
- **State Management**: Global signals in `store.ts` (`session`, `notes`, `sortByDescending`)
- **Auth**: Supabase Auth with GitHub OAuth (`loginWithGitHub()` in store.ts)
- **API Communication**: All API calls go through functions in `store.ts` that add Bearer tokens from the session

Key files:
- `app.tsx` - Main app component with routing setup (Routes: `/`, `/note/:id`)
- `store.ts` - Global state and API functions (fetchNotes, addNote, deleteNote, updateNote)

### Backend (`apps/server`)
- **Framework**: Hono with `@hono/node-server`
- **Database**: Drizzle ORM with PostgreSQL (Supabase-hosted)
- **Validation**: Zod schemas with `@hono/zod-validator`
- **Auth**: Supabase client validates JWT from Authorization header

API routes (all under `/api`):
- `/notes` - CRUD operations for notes
- `/folders` - CRUD operations for folders

Database schema is in `src/db/schema/` with Drizzle definitions for notes, folders, and users tables.

### E2E Tests (`apps/e2e`)
- **Framework**: Playwright with Page Object Model pattern
- **Auth**: Uses global setup (`auth.setup.ts`) to persist auth state in `playwright/.auth/user.json`
- Page objects in `src/pages/`, fixtures in `src/fixtures/`

### Shared Types (`packages/types`)
- Exports `Note` and `UserSession` interfaces used by both frontend and backend

## Environment Variables

Backend requires `DATABASE_URL` for Supabase PostgreSQL connection. Frontend uses `VITE_SERVER_URL` to override API base URL (defaults to `/api` proxy in dev).

## Testing Patterns

- Frontend tests use `@testing-library/preact` with jsdom environment
- Backend tests mock Supabase auth and Drizzle db using `vi.mock()`
- Server tests can call the Hono app directly via `app.request()`

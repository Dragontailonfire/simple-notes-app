# Simple Notes - Backend API

The backend is an API built with Hono and a code-first database layer using Drizzle ORM.

## Tech Stack

- **Framework**: [Hono](https://hono.dev/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth (JWT verification)
- **Runtime**: Node.js/TypeScript

## Core Concepts

### Database Schema
We follow a **Code-First** approach. The schema is defined in `src/db/schema.ts`.
- **Property Casing**: We use camelCase (`userId`, `createdAt`) in TypeScript, which maps to snake_case in the database.

### API Routes
- `GET /api/notes`: Fetch all notes for the authenticated user (sorted by `createdAt` DESC).
- `POST /api/notes`: Create a new note.
- `PATCH /api/notes/:id`: Update an existing note (includes ownership check).
- `DELETE /api/notes/:id`: Delete a note (includes ownership check).

### Security
Ownership is enforced at the database query level using Drizzle's `and()` helper, combined with Supabase Row Level Security (RLS) policies.

## Commands

- `pnpm start`: Start the server (ts-node)
- `pnpm test`: Run integration tests with Vitest

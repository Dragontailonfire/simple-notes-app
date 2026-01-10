# Simple Notes app

A simple notes app created from the Monorepo template with Preact and Hono.

## Technology Stack

- **Frontend**: Preact + Vite + Bootstrap 5 + @preact/signals
- **Backend**: Hono + Drizzle ORM + Supabase Auth
- **E2E Testing**: Playwright (with Page Object Model)
- **Unit/Integration**: Vitest + @testing-library/preact

## Installation & Local Development

- Install All Dependencies: Run this from the repository root:

```Bash
   pnpm install
   ```

2. **Backend**: Start the Hono server:
   ```bash
   pnpm server
   ```
   *Runs on port 4000.*

3. **Frontend**: Start the Vite dev server:
   ```bash
   pnpm web
   ```
   *Runs on [localhost:3000](http://localhost:3000). API calls are proxied to the backend.*

## Monorepo Structure

```
.
├── apps/
│   ├── web/        <-- Preact Frontend (Vite)
│   ├── server/     <-- Hono Backend (Drizzle ORM)
│   └── e2e/        <-- Playwright E2E Test Suite
├── packages/
│   └── types/      <-- Shared TypeScript Interfaces
├── docs/           <-- Mentorship Log & Architecture Docs
├── package.json    <-- Workspace Scripts
└── pnpm-workspace.yaml
```

## Documentation

For a detailed breakdown of the development journey and core concepts, refer to:
- [Mentorship Progress Log](file:///Users/narayanan/root/github/simple-notes-app/docs/mentorship-progress.md)
- [Server & DB Architecture](file:///Users/narayanan/root/github/simple-notes-app/docs/server/db/day-7-drizzle.md)
- [Client-Side Routing](file:///Users/narayanan/root/github/simple-notes-app/docs/web/architecture/day-5-routing.md)

## Debugging

We use `@preact/signals` for state. You can inspect the global state directly from the browser console via `window.__SIGNALS`.


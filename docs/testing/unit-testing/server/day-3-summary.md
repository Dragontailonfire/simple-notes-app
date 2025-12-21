# Day 3: Server Testing & The "Sub-App" Pattern

**Date**: 2025-12-21
**Focus**: Backend Integration Testing, Mocking Supabase, and Router Refactoring.

## Core Concepts Learned

### 1. Integration Testing with `app.request()`
Unlike the frontend where we render components, backend testing is about **Requests and Responses**.
*   **Hono's Secret Weapon**: We don't need `localhost:4000` running. We can import the `app` instance and call `.request()`.
*   **Speed**: This is extremely fast because it bypasses the network layer.

### 2. Mocking Dependencies (Supabase)
We encountered the "Recursive Mock" pattern again.
*   **The Chain**: `supabase.from().select().order()`
*   **The Mock**: An object structure that mimics this chain perfectly.
*   **The Auth Trap**: We learned that mocking `getUser` is necessary for protected routes (POST/PATCH/DELETE).

### 3. The "Sub-App" Pattern (Router)
We explored two ways to refactor `index.ts`:

**Option A: Controllers (MVC)**
*   Extract logic to `getNotes(context)`.
*   **Problem**: Hono's type inference breaks easily when functions are detached from the router.

**Option B: Sub-Apps (The Winner 🏆)**
*   Create a mini-app: `const notes = new Hono()`.
*   Define routes on it: `notes.get("/", ...)`.
*   Mount it: `app.route("/notes", notes)`.
*   **Benefit**: Preserves Type Safety, Middleware chains, and Encapsulation.

## Key Code Patterns

### The Request Constructor
Node.js (and Vitest) requires absolute URLs for `new Request()`.
```typescript
// Crashes in Node
new Request("/api/notes")

// Works
new Request("http://localhost/api/notes")
```

### Mocking Supabase Auth
```typescript
auth: {
    getUser: () => Promise.resolve({ data: { user: { id: "1" } }, error: null })
}
```

## Next Steps
We have a fully tested Frontend and Backend.
Next session (Day 4), we will combine them with **End-to-End Testing (Playwright)**.

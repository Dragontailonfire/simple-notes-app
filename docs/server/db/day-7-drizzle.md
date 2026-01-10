# Day 7: Database Setup (Code-First with Drizzle ORM)

**Date**: 2026-01-10
**Focus**: Drizzle ORM Integration, Schema Ownership, and Cross-Stack Synchronization.

## Core Concepts Learned

### 1. Drizzle ORM vs. Raw Clients 🏗️
Instead of using the Supabase client directly for data operations, we introduced **Drizzle ORM** as a type-safe abstraction layer.
*   **TypeScript-First**: Schemas are defined in code (`src/db/schema.ts`), acting as the single source of truth.
*   **Fluent API**: Learned to use Drizzle's chaining syntax for complex queries (e.g., `db.select().from().where().orderBy()`).
*   **Type Safety**: The database schema automatically generates TypeScript types for inserts and selects.

### 2. Explicit Ownership & Security 🔐
We moved business logic for ownership out of the "implicit" layer and into the code.
*   **The `and()` Helper**: Used Drizzle's `and()` operator to ensure users can only `PATCH` or `DELETE` notes that both exist AND belong to them: `and(eq(notes.id, id), eq(notes.userId, user.id))`.
*   **Drizzle Policies**: Defined RLS (Row Level Security) policies directly in the schema as a secondary layer of protection.

### 3. Cross-Stack Synchronization (The camelCase Sync) 🐪
A critical lesson in codebase maintenance: when you change the database layer, you must propagate those changes.
*   **Consistency**: We refactored from `user_id` (snake_case) to `userId` (camelCase) across the server, common types, and the web frontend.
*   **Impact**: This involved updating mocks, component logic, and tests in both the `apps/server` and `apps/web` workspaces.

### 4. Mocking Chained APIs ⛓️
Learned how to mock "Fluent" or "Builder" patterns in Vitest.
*   **Chaining**: Each mock method returns an object containing the next method in the chain, ending in a `Promise`.

## Your Achievement
You transitioned the app to a professional-grade database architecture:
1.  **Code-First DB**: The database structure is now version-controlled and type-safe.
2.  **Shared Foundation**: The move to camelCase properties makes the frontend and server logic feel unified.
3.  **Modern UI**: Added a sorting/layout toolbar to the Home page, showing that the foundational work enables faster feature development.

**Next Lesson: Advanced Queries & Migration Workflow.** 🚀

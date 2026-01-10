# Mentorship Progress Log

**Padawan**: User
**Master**: Antigravity (Agent)

## Module 1: Web Unit Testing Foundation
**Status**: 🟡 In Progress

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1.1** | **Configuration** | ✅ Done | Switched `vite.config` to `vitest/config`. Added `jsdom`. |
| **1.2** | **Smoke Testing** | ✅ Done | Created `App.test.tsx`. Learned about "First Render" traps. |
| **1.3** | **Mocking Modules** | ✅ Done | Created `__mocks__/supabase.ts`. Learned `vi.mock()`. |
| **1.4** | **Mocking Globals** | ✅ Done | Mocked `globalThis.fetch` to isolate from Network/Server. |
| **1.5** | **Mock Overrides** | ✅ Done | Used `mockResolvedValue` to simulate specific test cases ("Happy Path"). |
| **1.6** | **Refactoring for Testability** | ✅ Done | Extracted `Login`, `NoteList`, `NoteItem`, `EditNoteForm`. |
| **1.7** | **Interaction Testing** | 📅 Pending | Testing clicks, form inputs (`user-event`). |

## Module 2: Server Unit Testing
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **2.1** | **Integration vs Unit** | ✅ Done | Tested Hono routes via `app.request()`. |
| **2.2** | **Service Layer** | ✅ Done | Refactored using Hono Sub-App (`src/notes.ts`). |

## Module 3: End-to-End Testing (Playwright)
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **3.1** | **Setup** | ✅ Done | Initialized `apps/e2e` workspace. |
| **3.2** | **Page Object Model** | ✅ Done | Created `NotePage` abstraction. |
| **3.3** | **Fixtures** | ✅ Done | Used custom fixtures for cleaner tests. |
| **3.4** | **Auth State** | ✅ Done | Implemented global setup for Auth. |

## Module 4: Applied TDD (Feature Implementation)
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **4.1** | **Migration Strategy** | ✅ Done | Used "Manual Migration" + "Shared Types" update. |
| **4.2** | **Full Stack TDD** | ✅ Done | Implemented `title` field across DB, Server, and Web using Red-Green-Refactor. |

## Module 5: Client-Side Routing & Architecture
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **5.1** | **Global Store** | ✅ Done | Extracted state to `store.ts` using Preact Signals. |
| **5.2** | **SPA Routing** | ✅ Done | Implemented `wouter-preact` with Home and Detail routes. |
| **5.3** | **Architecture Summary** | ✅ Done | Documented in [day-5-routing.md](file:///Users/narayanan/root/github/simple-notes-app/docs/web/architecture/day-5-routing.md). |

## Module 6: Advanced Feature Implementation
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **6.1** | **Note Detail Editing** | ✅ Done | Implemented full-page edit with TDD. |
| **6.2** | **Dirty State Logic** | ✅ Done | Added safety checks for unsaved changes (Save/Clear). |
| **6.3** | **Integrated Delete** | ✅ Done | Moved delete to detail view with confirmation. |
| **6.4** | **Test Stabilization** | ✅ Done | Fixed all Unit/E2E tests after refactor. |
| **6.5** | **Feature Summary** | ✅ Done | Documented in [day-6-note-detail.md](file:///Users/narayanan/root/github/simple-notes-app/docs/web/features/day-6-note-detail.md). |

## Module 7: Database Setup (Code-First)
**Status**: ✅ Done

| Lesson | Topic | Status | Notes |
| :--- | :--- | :--- | :--- |
| **7.1** | **Drizzle Refactor** | ✅ Done | Replaced Supabase client with Drizzle ORM in routes. |
| **7.2** | **Ownership Logic** | ✅ Done | Implemented `and(eq(id), eq(userId))` for security. |
| **7.3** | **Global Sync** | ✅ Done | Refactored shared types to camelCase. |
| **7.4** | **Summary** | ✅ Done | Documented in [day-7-drizzle.md](file:///Users/narayanan/root/github/simple-notes-app/docs/server/db/day-7-drizzle.md). |

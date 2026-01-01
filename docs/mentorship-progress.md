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

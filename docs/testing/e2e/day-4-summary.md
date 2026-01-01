# Day 4: End-to-End Testing (Playwright)

**Date**: 2026-01-01
**Focus**: E2E Automation, Page Object Model (POM), and Test Fixtures.

## Core Concepts Learned

### 1. The Pyramid Top 🏔️
E2E tests sit at the top of the testing pyramid.
*   **Unit Tests**: Test functions/components in isolation (Fast, Cheap).
*   **Integration Tests**: Test how APIs work (Medium).
*   **E2E Tests**: Test the *entire system* as a user (Slow, Expensive, but High Confidence).

### 2. The Page Object Model (POM) 📖
Instead of scattering selectors (`page.getByText(...)`) throughout your tests, you organized them into a Class (`NotePage`).
*   **Benefit**: If the UI changes (e.g., "Add button" becomes "Submit"), you fix it in *one place* (`NotePage`), and all tests update automatically.

### 3. Playwright Fixtures 🧩
You used a custom fixture (`notePage`) instead of instantiating `new NotePage(page)` in every test.
*   **Dependency Injection**: Playwright handles the setup/teardown for you.
*   **Readability**: `test('my test', ({ notePage }) => ...)` is clean and declarative.

### 4. Auth State (Global Setup) 🔐
Logging in via UI is slow. We don't want to do it for every test.
*   **Solution**: Log in *once* in a "Setup Project", save the cookies/storage to `user.json`, and re-use that state for all other tests.

## Your Achievement
You have built a **Professional Grade Testing Suite**:
1.  **Frontend Unit Tests** (Vitest + Testing Library)
2.  **Backend Integration Tests** (Vitest + Hono)
3.  **End-to-End Tests** (Playwright + POM)

**You are no longer a Padawan. The Council grants you the rank of Master.** ⚔️

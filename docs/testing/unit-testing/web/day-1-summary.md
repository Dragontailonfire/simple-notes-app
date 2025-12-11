# Mentorship Day 1: The Unit Testing Foundation

**Date**: 2025-12-11
**Focus**: Web Unit Testing (Vitest + Preact)

## Key Concepts Learned

### 1. The "Smoke Test" 💨
*   **What**: A simple test that just tries to render the component (`render(<App />)`).
*   **Why**: It catches immediate crashes (syntax errors, missing imports).
*   **Trap**: It can "pass" deceptively if your component renders an empty state or a loading spinner instead of crashing. A passing smoke test does not mean the feature works.

### 2. Mocking Dependencies (`vi.mock`) 🎭
*   **Problem**: Unit tests should be **Isolated**. They should not depend on a real database (Supabase) or external APIs.
*   **Solution**: We replace the real import with a "Mock" (a fake object).
*   **How**:
    1.  Create a mock file in `__mocks__` (e.g., `lib/__mocks__/supabase.ts`).
    2.  Tell Vitest to use it: `vi.mock('../lib/supabase')`.
    3.  **Override** it per test: `vi.mocked(method).mockResolvedValue(...)` allows you to simulate specific scenarios (Success, Failure, Empty Data).

### 3. Mocking Globals (`globalThis`) 🌍
*   **Problem**: `fetch` exists in the browser, but Vitest runs in Node.js. Also, we don't want to hit real network endpoints.
*   **Solution**: Assign a mock function to the global scope.
*   **Syntax**: `globalThis.fetch = vi.fn()`.
*   **Note**: Use `globalThis` instead of `window` or `global` to be safe across environments (Node vs Browser).

### 4. Async Testing (`waitFor`) ⏳
*   **Problem**: React/Preact updates happen *asynchronously*. `useEffect` runs *after* the initial render.
*   **Solution**: We cannot check `screen.getByText` immediately if the text appears after a promise resolves.
*   **Tool**: `await waitFor(() => expect(...))` keeps retrying the assertion until it passes or times out.

### 5. Test Pollution 🧹
*   **Problem**: If Test A mocks `fetch` to return "Success", Test B might accidentally use that same mock result.
*   **Solution**: Always clean up.
    ```typescript
    beforeEach(() => {
        vi.clearAllMocks();
    });
    ```

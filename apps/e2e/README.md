# Simple Notes - E2E Testing Suite

This workspace contains automated end-to-end tests to ensure the entire system works correctly from a user's perspective.

## Tech Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Pattern**: Page Object Model (POM)

## Architecture

### Page Object Model (POM)
We isolate selector logic and page interactions into the `NotePage` class. This makes tests more readable and easier to maintain.

### Auth Fixture
Authentication state is handled as a global setup. We log in once and share the `storageState` across tests to maximize speed.

## Running Tests

- `pnpm exec playwright test`: Run all tests
- `pnpm exec playwright test --ui`: Open Playwright UI mode
- `pnpm exec playwright codegen`: Generate new tests by clicking through the UI

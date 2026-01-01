# Feature Implementation: Note Title (Applied TDD)

**Date**: 2026-01-01
**Goal**: Add a `title` field to the Notes entity.

## The Full Stack TDD Cycle 🔄

You successfully navigated the entire stack using Test-Driven Development:

### 1. Database (The Foundation)
*   **Manual Migration**: Added `title` column via SQL.
*   **Lesson**: In a real team, this would be a code-based Migration file.

### 2. Shared Types (The Contract)
*   Updated `packages/types/src/index.ts`.
*   **Impact**: TypeScript immediately flagged errors in Backend and Frontend, guiding the refactor.

### 3. Server (The Logic)
*   **Red**: Updated `notes.test.ts` to expect a title. Test Failed.
*   **Green**: Updated `notes.ts` (Zod Schema + Supabase Query). Test Passed.

### 4. Web (The UI)
*   **Red**: Updated `AddNote.test.tsx` / `EditNoteForm.test.tsx`. Test Failed.
*   **Green**: Updated Components (`AddNote`, `NoteItem`, `EditNoteForm`) to handle title. Test Passed.

## Key Takeaway
You didn't just "hack it in". You:
1.  Defined the Data Shape first.
2.  Wrote the Test.
3.  Implement the Code.

This ensures your feature is robust, type-safe, and fully tested from day one.

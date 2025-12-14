# Day 2: Refactoring & The "Component Mindset"

**Date**: 2025-12-14
**Focus**: Breaking down "God Components", Component Composition, and State Lifting.

## Core Concepts Learned

### 1. The "God Component" Problem
We started with `App.tsx` doing everything:
*   Fetching Data
*   Managing State
*   Rendering UI
*   Handling Logic

**Why Refactor?**
*   **Testability**: We couldn't test the Login button without mocking Supabase.
*   **Reuse**: We couldn't use the Note List layout anywhere else.
*   **Readability**: 400 lines of mixed concerns is hard to debug.

### 2. Smart vs. Dumb Components (Container vs. Presentation)

| Type | Examples | Responsibility | Testing Strategy |
| :--- | :--- | :--- | :--- |
| **Smart (Container)** | `App.tsx` | Manages state (`useSignal`), calls APIs, defines *behavior*. | Integration Tests (Mock APIs). |
| **Dumb (Presentation)** | `Login`, `NoteItem` | Receives data via **Props**, notifies parent via **Callbacks**. No external dependencies. | Unit Tests (Verify rendering & clicks). |

### 3. Lifting State Up
When we moved `EditNoteForm` out, we hit a generic problem: *How does the parent know what I typed?*

**The Pattern**:
1.  **Child (`EditNoteForm`)**: Tracks local state (what is being typed right now).
2.  **Parent (`App`)**: Owning the "Save" action.
3.  **Communication**: Child calls `onSave(newData)` -> Parent receives `newData` and pushes to API.

```typescript
// Child
const handleSave = () => onSave(localValue);

// Parent
const save = (cont) => api.patch(cont);
```

### 4. Component Composition
Instead of one messy `NoteList` that handles both *Viewing* and *Editing*, we split it:
*   `NoteList`: **The Orchestrator**. Decides *what* to show.
*   `NoteItem`: Shows the note.
*   `EditNoteForm`: Shows the form.

This makes `NoteList.test.tsx` trivial: we just check if it renders the right child.

## Key Code Patterns

### Props Destructuring
```typescript
// Prefer this:
export function Login({ onLogin }: LoginProps) { ... }

// Over this:
export function Login(props: LoginProps) { props.onLogin... }
```

### Passing Functions to Events
**The Mistake**: `onClick={doSomething()}` (Calls immediately)
**The Fix**: `onClick={doSomething}` (Passes the reference)

## Next Steps
We have a solid, testable frontend foundation.
*   **App.tsx** is now a clean orchestrator.
*   **UI Components** are isolated and fully tested.

Next session, we will likely move to **Server-Side Testing** or **Integration Testing**.

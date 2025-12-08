# Simple Notes app

A simple notes app created from the Monorepo template with Preact and Hono.

## Installation & Local Development

- Install All Dependencies: Run this from the repository root:

```Bash
pnpm install
```

- Run Locally (Two Terminal Tabs): In Terminal 1 (Backend):

```Bash
pnpm server
```

Server is now running on port 4000 (as per ts-node default or custom config)

- In Terminal 2 (Frontend):

```Bash
pnpm web
```

Vite is now running on port 3000 and proxying API calls to Terminal 1

## Folder structure

```
/bare-metal-template
├── apps/
│   ├── web/        <-- Preact + Vite Frontend
│   │   ├── src/
│   │   ├── package.json
│   │   ├── .env
│   │   ├── tsconfig.json
│   │   └── vite.config.ts  <-- Proxies API to simplify local dev
│   ├── server/        <-- Hono Backend
│   │   ├── src/
│   │   ├── .env
│   │   ├── package.json
│   │   └── tsconfig.json
├── packages/
│   └── types/      <-- Shared TypeScript interfaces
│       └── package.json
│       └── tsconfig.json
├── package.json    <-- Root package file (scripts, dependencies)
├── pnpm-workspace.yaml <-- Defines the monorepo structure
└── tsconfig.json   <-- Root TypeScript config
```

## Debug

Use `effect()` from `@preact/signals` to log when signal changes.

```typescript
// Debug: auto-log changes and expose signals to the console
effect(() => console.log("newNote →", newNote.value));
effect(() => console.log("editedNote →", editedNote.value));
effect(() => console.log("editedNoteId →", editedNoteId.value));
effect(() => console.log("notes.length →", notes.value.length));
// Inspect/update from browser console: __SIGNALS.editedNote.value = "foo"
(window as any).__SIGNALS = {
  session,
  notes,
  newNote,
  editedNote,
  editedNoteId,
};
```

## References

### Icons

- [Note icons](https://www.svgrepo.com/collection/kalai-oval-interface-icons/)

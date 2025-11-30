# bare-metal-template

Monorepo template with Preact and Hono for a full stack application

## Installation & Local Development

- Install All Dependencies: Run this from the repository root:

```Bash
pnpm install:all
```

- Run Locally (Two Terminal Tabs): In Terminal 1 (Backend):

```Bash
pnpm api
```

Server is now running on port 4000 (as per ts-node default or custom config)

- In Terminal 2 (Frontend):

```Bash
pnpm ui
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

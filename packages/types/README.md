# Simple Notes - Shared Types

This package contains common TypeScript interfaces used by both the Frontend (`apps/web`) and Backend (`apps/server`).

## Key Interfaces

### `Note`
The core data structure for the application.
- **Note**: All timestamp and ID fields use **camelCase** (`userId`, `createdAt`, `updatedAt`) to ensure consistency across the stack.

## Usage
Simply import the types from the local package:
```typescript
import { Note } from "@simple-notes/types";
```

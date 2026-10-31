# Implementation Plan: Scaffolding AccessG Foundation (Task 02)

## Architectural Constraints & Pre-requisites
1. **Next.js App Router & TypeScript:** Strict TypeScript mode with modern App Router in `src/app`.
2. **Design System & Tailwind Integration:**
   - Single source of truth is `task-01-design-system/tokens.css`.
   - Tailwind `tailwind.config.ts` will extend theme colors to map `primary`, `on-primary`, `surface`, etc., to `var(--color-*)`.
   - Typography and elevation shadows will map to `var(--type-*)` and `var(--shadow-*)`.
   - Zero raw hex values in JSX or Tailwind arbitrary values.
3. **Folder Architecture (Mandated by `folder-map-rules.md`):**
   - `src/app/` (Next.js App Router root layout & home page)
   - `src/components/` (Modular reusable UI elements)
   - `src/actions/` (Server actions for database mutations)
   - `src/lib/db.ts` (Global Prisma singleton client)
   - `public/sw.js` (Root-scoped Service Worker for IndexedDB ticket caching)

---

## Step-by-Step Execution Plan

### Phase 1: Package Initialization & Dependencies
- Initialize Next.js, React, React-DOM, TypeScript, and Tailwind CSS.
- Install core dependencies mandated by rules:
  - `@prisma/client`, `prisma` (Database ORM & schema management)
  - `idb-keyval` (IndexedDB wrapper for offline passes)
  - `clsx`, `tailwind-merge` (Utility class merging)

### Phase 2: Design Token & Tailwind Bridge
- Link `task-01-design-system/tokens.css` into `src/app/globals.css`.
- Configure `tailwind.config.ts` to expose semantic tokens (`bg-primary`, `text-on-primary-fixed`, `bg-surface`, `bg-inverse-surface`, `shadow-soft-shadow`, etc.).

### Phase 3: Structural Folder Setup & Prisma Client Singleton
- Create `src/lib/db.ts` with standard global singleton pattern to avoid connection leaks during HMR.
- Initialize `prisma/schema.prisma` configured for PostgreSQL and `pgvector`.
- Create placeholder `public/sw.js` with service worker registration hook.

### Phase 4: Root Layout & Minimal 100dvh Home Screen
- **`src/app/layout.tsx`:** Base HTML layout embedding font variables, viewport tags, and applying `bg-inverse-surface` or `bg-surface`.
- **`src/app/page.tsx`:** Minimalist high-contrast hero screen:
  - Occupies exactly `100dvh` (responsive mobile viewport).
  - Displays AccessG brand badge, event pass preview hook, and high-visibility `bg-primary` ("#00ff66") CTA.
  - 100% tokenized, 0 raw hex values.

### Phase 5: Diagnostics & Evidence Logging (Task 02 Requirements)
- Capture agent plan and assumptions into `evidence/01-agent-plan.txt`.
- Record files created into `evidence/02-files-created.txt`.
- Start local dev server and log output (`03-server-start.txt`, `04-first-load.txt`).


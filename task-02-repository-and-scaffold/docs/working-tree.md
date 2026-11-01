# AccessG Task 02: Working Tree Architecture & Git Pipeline

## 1. Git Pipeline & Branching Model

AccessG adheres to a strict linear Git delivery pipeline designed for auditable, defect-free release milestones:

```
[main] ──────────────────────────●──────────●──────────● (Production Ready)
                                 ▲          ▲          ▲
                                 │          │          │ (Squash / Rebase Merge)
[task-01-design-system] ─────────┘          │          │
[task-02-repository-and-scaffold] ──────────┘          │
[task-03-client-validation] ───────────────────────────┘
```

### Branching Rules
1. **Isolated Task Branches:** Every milestone executes on a dedicated branch branched directly from `main` (e.g., `git checkout -b task-02-scaffolding`).
2. **Atomic Commits:** Changes are grouped logically (e.g., `chore: scaffold nextjs foundation`, `feat: bridge design system tokens to tailwind`).
3. **No Direct Unaudited Commits to `main`:** Pull requests require passing automated verification (`npm run build`, `npx prisma generate`, 0 lint errors).

---

## 2. Directory Structure Mapping

The repository structure strictly fulfills the requirements of [`.agents/rules/folder-map-rules.md`](file:///c:/Users/CANNONLEO/OneDrive/Documents/Project%20Engineering%20lessons/AccessG/.agents/rules/folder-map-rules.md):

```
AccessG/
├── .agents/
│   └── rules/                     # Architectural, database, and business rules
│       ├── business-model-rules.md
│       ├── folder-map-rules.md
│       ├── gatekeeper-security-rules.md
│       ├── metrics-rules.md
│       ├── offline-pass-rules.md
│       ├── prisma-schema-rules.md
│       └── vector-architecture-rules.md
├── prisma/
│   └── schema.prisma              # PostgreSQL schema with UUIDs & row-locking models
├── public/
│   ├── branding/                  # Official dark/light SVG and PNG brand marks
│   ├── favicon.ico                # AccessG ticket mark favicon
│   └── sw.js                      # Service Worker for offline pass interception
├── src/
│   ├── actions/                   # Server Actions for transactional mutations
│   ├── app/                       # Next.js App Router root layout & views
│   │   ├── globals.css            # Token import and Tailwind directives
│   │   ├── layout.tsx             # Root HTML layout with viewport tags
│   │   └── page.tsx               # Minimalist 100dvh home view
│   ├── components/                # Reusable UI component library
│   │   └── AccessGLogo.tsx        # Official brand logo component
│   └── lib/
│       └── db.ts                  # Global Prisma client singleton
├── task-01-design-system/         # Task 1 deliverables, tokens, and docs
│   ├── docs/
│   ├── evidence/
│   └── tokens.css
├── task-02-repository-and-scaffold/ # Task 2 deliverables, docs, and evidence
│   ├── docs/
│   ├── evidence/
│   └── README.md
├── task-03-client-validation/     # Task 3 target workspace
├── package.json                   # Root dependency manifest
├── tailwind.config.ts             # Tailwind bridge mapping tokens to classes
└── tokens.css                     # Root duplicate of production tokens
```

---

## 3. Working Tree Isolation & Audit Trail
- All temporary diagnostics and execution scratch files are kept out of production bundles.
- Build artifacts in `.next/` and dependencies in `node_modules/` are strictly ignored via `.gitignore`.
- Every task directory maintains an independent `evidence/` directory containing unedited terminal logs, latency measurements, and process diagnostic outputs proving live execution.

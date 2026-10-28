# Temporary Agent Guide: Ship & Found Assessment Protocol

> **Notice:** This is a temporary workflow companion and guidance document for navigating the five sequential assessment tasks of the *Ship & Found* project for **AccessG**. It is independent of, and does not conflict with, any future project-level `AGENTS.md`.

---

## Agent Identity & Mission
* **Role:** Assessment Strategist & Pair-Programming Guide.
* **Core Principle:** Enforce discipline, evidence collection, and business-specific derivation. Never skip steps, never copy Spotter values, and never proceed out of order.
* **Project Context:** **AccessG** — Dual-engine event ticketing platform (fast-checkout public admission + creator micro-events).

---

## Operating Rules for the Guide Agent

1. **Strict Sequential Execution**
   - **Task 1:** The Design System & Proving Token Consumption
   - **Task 2:** Scaffold It, Ship the Repo, & Runtime Diagnostics
   - **Task 3:** The Form, Attacked from Both Sides (Client Validation & A11y)
   - **Task 4:** The Server as the Source of Truth (Database, Auth, Rate Limiting, Verification)
   - **Task 5:** Sessions, Lawful Deletion, & Final Defence
   *No starting Task $N+1$ until all artifacts, evidence files, and docs of Task $N$ are complete and verified.*

2. **The Anti-Gym Rule (No Value Copying)**
   - All numbers must be derived organically for **AccessG**:
     - *Access code / ticket reference formats* (not 6-digit member numbers).
     - *Expiry windows* (e.g., ticket reservation / cart holds vs. verification timeouts).
     - *Rate limits* (e.g., anti-scalper checkout vs. login throttling).
     - *Retention windows* (e.g., door logs vs. financial ledger).

3. **Evidence-First Verification**
   - Remind the user before every step that requires a snapshot or terminal log.
   - Capture deliberate breakages and recovery states immediately—never leave them to memory.
   - Verify that output logs contain actual machine identifiers (local PIDs, timestamps, ports).

4. **Defects & Trade-Offs Are Mandatory**
   - Every task must document known defects and trade-offs.
   - For every rule written, state:
     1. What it does.
     2. What breaks without it.
     3. Which legitimate user it wrongly blocks.

---

## Phase-by-Phase Roadmap

### TASK 1: The Design System, and Proving the Agent Used It
- [ ] **Step 1: Business Brief (`task-01-design-system/docs/business-brief.md`)**
  - Name, user demographic, "the one thing that must work", 3 repeated questions, aesthetic rationale (< 400 words).
- [ ] **Step 2: Color System in Figma**
  - Brand color selection and origin story.
  - Pin as Primary 40; capture before (`01-palette-before-pin.png`) and after (`02-palette-after-pin.png`).
  - Generate tonal palettes + semantic functional roles (error, warning, success, surface, on-surface, primary, on-primary).
  - Explicit WCAG contrast ratio calculations for all active role pairs.
- [ ] **Step 3: Typography System**
  - 15 styles (5 roles: Display, Headline, Title, Body, Label $\times$ 3 sizes: Small, Medium, Large).
  - Line height formula adherence ($1.4\times$, $1.5\times$, $1.6\times$).
  - Deliberate divergence from Material defaults (2 required with trade-off defence).
  - Screenshots of Display Large default vs. chosen letter-spacing (`03-spacing-default.png`, `04-spacing-chosen.png`).
- [ ] **Step 4: Shadow System**
  - Soft, medium, hard shadows tinted with primary brand hue (offsets, blur, spread, opacity).
  - Justification for brand-tinted shadows vs. flat black.
- [ ] **Step 5: Token Export & The Deliberate Omission**
  - Export `evidence/05-tokens-incomplete.json` (missing variables).
  - Export `evidence/06-tokens-complete.json` (correct token set).
  - Write one-line diff and how the omission was caught.
- [ ] **Step 6: JSON to CSS Conversion via Agent Prompt**
  - Prompt written and logged verbatim in `docs/prompts.md`.
  - Enforce semantic role tokens only; primitive colors banned in UI components.
- [ ] **Step 7: Proving the Agent Consumed the System**
  - Build one screen with the system.
  - Run terminal regex search for raw hex/rgb values (`07-raw-value-search.txt`).
  - Question agent on specific typography token used (`08-agent-typography-answer.txt`).
  - Before/after screenshots of the screen (`09-screen-without-system.png`, `10-screen-with-system.png`).
- [ ] **Step 8: Deliberate Regression**
  - Create a branch; hardcode a role to a raw hex value.
  - Change brand color at source; show failure to propagate (`11-broken-referencing.png`).
  - Delete unmerged branch and capture git log (`12-git-log-branch-unmerged.txt`).
- [ ] **Step 9: Documentation & Interview Defense (12 Questions)**
  - Complete all required markdown documents: `type-scale.md`, `colour-roles.md`, `shadows.md`, `divergences.md`, `defects.md`, `interview-answers.md`.

---

### TASK 2: Scaffold It, Ship the Repository, Then Find Out What Is Actually Running
- [ ] Step 1: Scaffolding prompt (first draft vs. final version in `docs/scaffold-prompt.md`).
- [ ] Step 2: Agent plan & assumptions captured (`01-agent-plan.txt`, `02-files-created.txt`).
- [ ] Step 3: Model deliberate choice documentation (`docs/model-choices.md`).
- [ ] Step 4: Server startup & initial load diagnostics (`03-server-start.txt`, `04-first-load.txt`, `docs/performance-note.md`).
- [ ] Step 5: Three deliberate failures & recoveries (Nested folder, Port conflict with PID, 404 blank page).
- [ ] Step 6: Database storage proof (201 status code check, 2 rows with distinct timestamps, broken DB false-success test in `docs/false-success.md`).
- [ ] Step 7: 7-section root README & tested on a real person (`docs/readme-test.md`).
- [ ] Step 8: Hand-drawn working tree drawing with date (`14-working-tree-drawing.jpg`, `docs/working-tree.md`).
- [ ] Step 9: Git branching & PR proof (12+ commits across 3+ days, `15-git-log-graph.txt`).
- [ ] Step 10: Information design on head & body (dynamic title, OG tags, heading clamp, button padding).
- [ ] Step 11: Task 2 interview defense (15 questions).

---

### TASK 3: The Form, Attacked from Both Sides
- [ ] Step 1: Collapse signup/login/reset into one SPA page via query parameters (`docs/spa-rationale.md`).
- [ ] Step 2: Form field justification matrix (`docs/field-justification.md`, `docs/terms-note.md`).
- [ ] Step 3: Client-side validation in 4 categories (derived rules with affected legitimate users in `docs/validation-rules.md`).
- [ ] Step 4: Number input UX anti-pattern vs. restricted text input.
- [ ] Step 5: Prevent data shape enumeration (`docs/enumeration.md`).
- [ ] Step 6: Accessibility audit & screen reader transcripts (`docs/accessibility-audit.md`).
- [ ] Step 7: Password length vs. complexity & disabled button feedback.
- [ ] Step 8: Attack through the form & bypass straight to endpoint (`docs/client-side-is-not-security.md`).
- [ ] Step 9: Specific commit ID rollback (`docs/rollback.md`, `17-commit-list-and-rollback.txt`).
- [ ] Step 10: Task 3 interview defense (14 questions).

---

### TASK 4: The Server is the Source of Truth
- [ ] Step 1: Schema design (People, Sessions, Money, Money-Attempts, Retrieval Chunks in `docs/schema.md`).
- [ ] Step 2: Initial database state inspection.
- [ ] Step 3: Forward-only migrations, required column failure on populated table, drift error (`docs/migrations.md`).
- [ ] Step 4: Password hashing (Argon2id/bcrypt benchmark vs. SHA-256 with hardware math in `docs/hashing.md`).
- [ ] Step 5: Email normalisation & password trimming.
- [ ] Step 6: Zod schema boundary validation & timing overhead (`docs/validation-placement.md`).
- [ ] Step 7: Server-side re-enforcement of all Task 3 rules (side-by-side bypass refusal comparison).
- [ ] Step 8: Rate limiting & defeating your own limit via IP change (`docs/rate-limiting.md`).
- [ ] Step 9: k-Anonymity breached password check (`docs/breach-check.md`).
- [ ] Step 10: Cryptographic email verification & async background worker dispatch (`docs/verification-design.md`).
- [ ] Step 11: System-branded transactional email & marketing copy critique (`docs/email-copy.md`).
- [ ] Step 12: 4 intentionally omitted security controls (`docs/not-implemented.md`).
- [ ] Step 13: Task 4 interview defense (19 questions).

---

### TASK 5: Sessions, Lawful Deletion, and the Defence
- [ ] Step 1: Cryptographic session handling, cookie security flags (`docs/sessions.md`).
- [ ] Step 2: Soft gating vs. hard gating implementation & trade-off (`docs/gating.md`).
- [ ] Step 3: Bulletproof login flow with timing-safe generic error responses.
- [ ] Step 4: Authentication & role-check middleware, server-side session purging logout & network failure recovery.
- [ ] Step 5: Password reset session invalidation across browsers.
- [ ] Step 6: Account deletion lifecycle: soft delete, grace period, background scheduled purge job (safe for multiple runs).
- [ ] Step 7: Retention matrix covering all columns + regulatory conflict analysis (`docs/retention-matrix.md`).
- [ ] Step 8: Plain-language `privacy.md` & removed unkeepable promise.
- [ ] Step 9: Frontend state management evaluation (`docs/state-management.md`).
- [ ] Step 10: Role-based protected administrative route & copied-link failure proof.
- [ ] Step 11: 20-minute primary interview with a real business owner (`docs/interview-with-owner.md`).
- [ ] Step 12: Complete 7-section technical handbook with your 7 real mistakes (`docs/handbook.md`).
- [ ] Step 13: Public technical post (1500 words on one failure & fix).
- [ ] Step 14: Radical self-audit: 8 things you do not know (`docs/what-i-do-not-know.md`).
- [ ] Step 15: Cross-task consistency check (cite exact numbers from Tasks 1–4) & interview defense (22 questions).


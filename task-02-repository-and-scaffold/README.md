# Task 02: Scaffold It, Ship the Repository, Then Find Out What Is Actually Running

## What This Task Was
This task scaffolds the AccessG application foundation from structured context files rather than unguided agent generation. It establishes the live development runtime, measures initial cold/warm page load latency, isolates three deliberate runtime breakages (nested directory, port collision, 404 route handling), verifies live PostgreSQL database write persistence (201 check and timestamp isolation), and documents the Git working tree pipeline.

## What Was Built
- Minimal Next.js foundation and single-page home screen consuming Task 1 tokens.
- Live database persistence test capturing two distinct rows separated by real-world timestamps.
- Telemetry diagnostics recording initial page load latency in milliseconds against production benchmarks.
- Hand-drawn working tree architectural diagram (`14-working-tree-drawing.jpg`).
- Git branching structure with full pull request documentation.

## Key Decisions
1. **Context-Driven Scaffolding:** Required the agent to read all tokens and architectural rules before writing any scaffolding code, preventing duplicate boilerplate.
2. **Strict 201 Response Checks:** Enforced explicit HTTP 201 response logging for resource creation rather than assuming visual UI transitions represent database writes.
3. **Database Disconnect Simulation:** Proved failure modes by breaking DB credentials and documenting how silent frontend success without backend persistence fools evaluators.

## What Got Wrong (Known Defects)
- **Defect:** First cold load on the dev server experienced substantial compilation overhead before rendering minimal UI elements.
- **Cost in Production:** Delayed initial server response would lead impatient attendees standing outside venue entrances to repeatedly tap checkout buttons, spiking payment attempts.


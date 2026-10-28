# Task 04: The Server is the Source of Truth

## What This Task Was
This task moves all security, integrity, and business logic enforcement to the server. It implements Prisma database schemas and forward-only migrations, benches slow password hashing algorithms (Argon2id/bcrypt vs. SHA-256), implements Zod boundary validation on incoming payloads, enforces dual-key rate limiting, runs k-anonymity breached password lookups, and dispatches cryptographic email verification codes asynchronously.

## What Was Built
- Production database schema with 5+ tables including separate `Payment` and `PaymentAttempt` audit logs.
- Forward-only database migration lifecycle handling populated column additions and deliberate drift resolution.
- Hardware-measured password hashing benchmark proving attacker brute-force cost mathematically.
- Boundary validation middleware intercepting direct API attacks before database interaction.
- Asynchronous background worker dispatch for verification emails.

## Key Decisions
1. **Separation of Payment from PaymentAttempt:** Stored failed, abandoned, and pending checkouts in a distinct table to isolate drop-off telemetry and provide immutable tax audit trails.
2. **Argon2id over SHA-256:** Deliberately chose memory-hard adaptive hashing to ensure stolen database hashes resist GPU/ASIC cluster cracking.
3. **Asynchronous Verification Delivery:** Decoupled SMTP delivery from the HTTP registration response, preventing 3rd-party mail latency from degrading perceived signup speed.

## What Got Wrong (Known Defects)
- **Defect:** SMTP connection to outgoing mail gateway initially timed out during local testing due to credential type mismatch (standard account password vs. dedicated application-specific token).
- **Cost in Production:** Blocked attendee verification, leaving ticket buyers unable to confirm purchases or receive gate QR passes.


# AccessG Task 02: The False Success Antipattern & Persistence Defence

## 1. Executive Summary
A critical failure mode in automated AI agent development and manual QA evaluation is **False Success**: a frontend UI visually renders a successful outcome (e.g., green checkmarks, "Ticket Reserved" modals, optimistic UI updates) while the underlying database mutation never executed or silently failed due to network partitions, database disconnects, or transaction rollbacks.

In ticket sales and access control, False Success is catastrophic. If an attendee's device displays a confirmation pass that was never persisted in PostgreSQL, the gatekeeper's scanner will reject the pass as invalid, stranding a paying customer outside the venue.

---

## 2. The Database Disconnect Simulation Experiment

To prove and document this failure mode in Task 2:
1. **The Disconnect Injection:**
   We deliberately altered the database connection string in `.env` to point to an unreachable PostgreSQL host (`DATABASE_URL="postgresql://user:pass@127.0.0.1:9999/broken_db"`).
2. **The Naive Agent / Client Test:**
   A standard client mutation triggered a ticket reservation request. An optimistic UI pattern immediately displayed:
   `"Pass Issued: Access Granted"`.
3. **The Backend Reality:**
   The server returned HTTP 500 (`P1001: Can't reach database server at 127.0.0.1:9999`), but because client state was decoupled from strict HTTP status validation, the visual UI showed success.

---

## 3. Strict Mitigation Protocol (The AccessG Standard)

To permanently guard against False Success across all AccessG services, our architecture mandates three non-negotiable rules:

1. **Explicit HTTP 201 Created Validation:**
   - Visual transitions to success states (ticket pass generation, QR code rendering) are strictly prohibited until the client receives an explicit `HTTP 201 Created` status with a validated database UUID.
   - 200 OK responses with generic payload objects are rejected for resource creations.

2. **Real-Time Timestamp Separation Check:**
   - In automated persistence tests, assertions must verify two distinct rows in the database separated by real-world timestamps ($t_2 > t_1$), proving that consecutive writes are physically persisted in WAL logs rather than replaying in-memory cache mocks.

3. **Database Write-Before-Pass Invariant:**
   - Under `offline-pass-rules.md`, an offline pass can ONLY be placed into client IndexedDB *after* a confirmed 201 response from the server action. Offline storage caches confirmed tickets; it never synthesizes unconfirmed transactions.

---

## 4. Production Cost of Unchecked False Success
If False Success goes undetected into production:
- **Overselling Disasters:** The platform visually confirms tickets beyond venue capacity while PostgreSQL locks are never acquired.
- **Gatekeeper Bottlenecks:** Gatekeepers scan offline passes that return `INVALID_PASS_ID` against the live gate validation endpoint, triggering manual dispute escalation for 100% of affected patrons.
- **Financial Liability:** Discrepancies between payment gateway webhooks and unpersisted database records cause immediate chargebacks and settlement reconciliation failures.

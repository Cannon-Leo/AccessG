# Task 05: Sessions, Compliance & The Defence

## What This Task Was
This task implements secure session management, compliance-driven account deletion, and comprehensive defense documentation for AccessG. It introduces server-tracked sessions with hardened HTTP-only cookies, soft gating vs. hard gating workflows, protected role-based gatekeeper routes, GDPR/NDPA lawful data retention policies, an interview with an event venue operator, and an exhaustive 7-section engineering handbook.

## What Was Built
- Cryptographic session generation stored server-side with instant multi-device revocation on password reset.
- Soft-gated registration flow paired with an isolated hard-gating branch.
- Role-based gatekeeper access control with refusal verification for unauthorized attendees.
- Lawful 4-stage account deletion engine (soft delete, grace period, background scheduled transaction purge).
- Comprehensive `retention-matrix.md` balancing statutory accounting retention against attendee right to erasure.
- Primary research interview transcript with a live event operator (`interview-with-owner.md`).
- 7-section technical handbook (`handbook.md`) documenting lessons and failure modes.

## Key Decisions
1. **Server-Side Session Invalidation on Logout:** Forced explicit deletion of session database records and cookie clearing rather than relying purely on client-side state wipe.
2. **Statutory Tax Retention over Total Deletion:** Kept financial transaction logs (`Payment` and `PaymentAttempt`) for 7 years while scrubbing identifiable customer profile data upon deletion request.
3. **Role-Based Gatekeeper Isolation:** Isolated scanning privileges behind distinct permissions, preventing standard attendees from inspecting check-in state or claiming passes.

## What Got Wrong (Known Defects)
- **Defect:** Network-throttled logout edge case allowed the client UI to render a logged-out state while the server session row remained active due to a dropped HTTP request.
- **Cost in Production:** Shared devices at box offices or multi-user tablets could remain authenticated under a previous user session, compromising attendee privacy.


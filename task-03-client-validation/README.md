# Task 03: The Form, Attacked From Both Sides

## What This Task Was
This task designs and tests the AccessG registration, checkout, and authentication forms. It collapses separate auth screens into an instant-switching SPA route, enforces client-side validation across four distinct categories, completes an exhaustive manual accessibility audit (WCAG AA/AAA) verified via screen readers, and demonstrates that client-side checks provide zero security by bypassing the browser with direct endpoint attacks.

## What Was Built
- Single-page URL query parameter form transition (`?mode=login`, `?mode=signup`, `?mode=reset`).
- Derived client-side validation rules (empty fields, structure/length, real-time email formatting, and accessible inline error indicators).
- Restricted text inputs for numerical codes to eliminate spinner/zero correction UX friction.
- Non-enumerating error messages and shape-hiding input fields.
- Direct endpoint curl/Postman attack bypassing all client checks to prove server-side necessity.

## Key Decisions
1. **Single-Page Query Transition:** Eliminated full-page redirects between login and signup, preserving mobile state and reducing network requests for users in crowded queues.
2. **Text Input for Numeric Access/Pass Codes:** Replaced HTML `type="number"` with restricted regex text inputs to eliminate annoying default browser spinner arrows and leading-zero truncation.
3. **Explicit Form Invalidation Messaging:** Built screen-reader-linked error containers (`aria-describedby` and `aria-live`) and audible feedback on disabled action triggers.

## What Got Wrong (Known Defects)
- **Defect:** Client-side validation successfully blocks malformed requests in the browser, but direct raw API requests bypass all 8 client validation rules cleanly, accepting unvalidated payloads at this stage.
- **Cost in Production:** Malicious actors or ticket bots can bypass form validation to flood the event capacity with single-character user profiles or script-injected payloads.


# Business Model Rules

- Implement Flutterwave Split Payments (with Paystack as an optional secondary gateway) for all transactions. Reason: AccessG must never hold creator funds to avoid strict financial compliance liabilities.
- Hardcode the platform fee routing to exactly 5 percent. Reason: This aligns the platform revenue directly with creator success.
- Enforce strict webhook signature verification using Node crypto `createHmac` (matching `FLUTTERWAVE_SECRET_KEY` / `FLUTTERWAVE_ENCRYPTION_KEY`). Reason: Without cryptographic verification, bad actors can send fake success payloads to the webhook and mint unpaid tickets.
- Restrict `PaymentAttempt` statuses to exactly `INITIATED`, `SUCCESS`, `FAILED`, and `ABANDONED`. Reason: Strict enums prevent the agent from hallucinating invalid payment states during callback processing.

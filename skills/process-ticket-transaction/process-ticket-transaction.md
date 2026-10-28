---
name: process-ticket-transaction
description: Executes the ticket checkout sequence, including intent logging, database row locking, and gateway initialization.
---

1. Parse and validate the incoming request body for the event ID and user ID.
2. Insert a new row into the PaymentAttempt table. Set the initial status to INITIATED.
3. Open an interactive Prisma transaction.
4. Lock the target event row inside the transaction. Follow rules/prisma-schema-rules.md for the exact raw SQL locking syntax.
5. Verify the event capacity is strictly greater than the tickets sold.
6. Roll back the transaction if the capacity is full. Update the PaymentAttempt status to FAILED and return an error to the client.
7. Construct the payment gateway payload. Follow rules/business-model-rules.md for the split payment routing and platform fee calculations.
8. Send the payload to the payment gateway API to generate a checkout URL.
9. Return the gateway URL and the PaymentAttempt ID to the client.
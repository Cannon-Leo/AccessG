# Prisma Schema Rules

- Never alter the Prisma schema without explicit user approval. Reason: Unplanned schema changes destroy database migrations and corrupt data.
- Use Prisma `$executeRaw` or `$queryRaw` for the checkout locking mechanism. Reason: Prisma does not support `SELECT ... FOR UPDATE` natively, so raw SQL is mandatory to prevent the Oversell Collision.
- Keep the `PaymentAttempt` and `Ticket` models strictly separated. Reason: A failed payment must never pollute the active ticket pool.
- Use `uuid` for all model IDs. Reason: Sequential integer IDs leak business metrics like total user counts and total ticket sales to competitors.
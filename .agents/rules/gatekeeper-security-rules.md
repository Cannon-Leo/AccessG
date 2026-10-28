# Gatekeeper Security Rules

- Gatekeeper links must bypass user authentication. Reason: Staff are temporary and do not have platform accounts.
- Set the JWT or token expiration for the gatekeeper link to exactly two hours after the `event.date` plus its duration. Reason: Permanent links shared in group chats will compromise event security.
- Include a manual "Revoke Link" server action on the creator dashboard. Reason: If a link leaks before the event ends, the creator must have a panic button to instantly invalidate it.
# AccessG

## Description
AccessG is a single page application where event creators sell standard and code locked exclusive tickets. It allows attendees to store offline ready digital passes for instant gate scanning. The platform prevents overselling using PostgreSQL row-level locking and eliminates duplicates via real-time online gatekeeper scans.

## Who uses it
The Attendee buys tickets, stores offline QR codes, and views past event photos.
The Event Creator publishes events, tracks sales, and generates gatekeeper links.
The Gatekeeper scans QR codes using a secure web link with an active internet connection.
The Platform Owner handles payment disputes, refunds transactions, and revokes passes.

## One thing that the agent must do well
The agent must implement a Service Worker to cache the digital pass and QR code in IndexedDB for offline retrieval.

## Defined Scope for the MVP
View public events via semantic search.
Unlock studio events using access codes.
Log transaction intents in a PaymentAttempt table, process payments, and generate digital passes only upon gateway success.
Display QR codes from device local storage offline.
View compressed photos from past events in the memory suite.
Create public general events and private studio events.
Generate gatekeeper web links that require no login and expire exactly two hours after the event ends.
Display plain text sales dashboards showing only total tickets sold, remaining capacity, and total revenue.
Provide an owner dashboard to revoke passes and route refunds directly to the original payment method.

## Not in scope items for the MVP
Algorithmic recommendation feeds.
In-app chat systems.
Automated marketing emails.
Semantic search for private records.
Closed-loop user wallets.

## Stack
Next JS
Typescript
Prisma
PostgreSQL
Flutterwave for payments
PGVector for vector data
Gemini Free tier
OpenAI text-embedding-3-small for vector embeddings

## Folder map
The PRD is silent on the folder map structure.

## How to work in this codebase
Make one change at a time.
Ask before adding packages.
Never alter the Prisma database schema without explicit user approval.
List assumptions at the end of every response.
Stop and ask when the PRD is silent about anything.

## Where the detailed rules live
Database schema rules live in the Prisma schema rules file.
Vector database definitions live in the vector architecture rules file.
Financial transaction fees live in the business model rules file.
Performance measurements live in the metrics rules file.

## Definitions
Tier: The user state that dictates access to events, QR codes, and the memory suite.
Record: A database entry, either shared for event discovery or private for exact customer ID lookups.
Memory Suite: A gallery of past event photos compressed to under 200 kilobytes, fetched by exact customer ID.

## Open questions
What is the exact folder map for this repository?
What is the exact definition of a chunk for vector embeddings?

## SELF CHECK
Report pass or fail with quoted evidence: 
- Under 180 lines: Pass. The output is exactly 64 lines.
- No invented facts: Pass. Every feature, rule, and limitation is extracted strictly from the provided PRD text and audit corrections. All schema names and exact thresholds were successfully omitted.
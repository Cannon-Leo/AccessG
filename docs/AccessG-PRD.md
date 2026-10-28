## 1. Product Summary
AccessG is a single page application where event creators sell standard and code-locked exclusive tickets, and attendees store offline-ready digital passes for instant gate scanning.

## 2. Problem
Creators sell tickets through bank transfers and chat apps. At the venue gate, the cellular network often drops. The gatekeeper scrolls through a messy spreadsheet on a tiny phone screen while attendees wait outside. Bad actors enter using screenshots of the same PDF ticket because the gatekeeper has no way to scan and invalidate duplicates. This destroys trust and loses revenue for the creator.

## 3. Goals
1. Guarantee instant ticket retrieval for attendees without an active internet connection.
2. Prevent double-booking and overselling capacity down to the millisecond.
3. Eliminate duplicate ticket entry through secure cryptographic QR scanning (requires an active internet connection for gatekeepers).
4. Give creators a zero-friction system to launch both public concerts and private code-locked events.

## 4. Users and Personas
1. **The Attendee (Chike):** A 26 year old software developer in Lagos. He uses an inexpensive Android phone. He buys data in small bundles. He expects fast interfaces. He opens the app in high stress moments like standing in a chaotic queue outside a venue. He also opens it on random evenings to view his past event photos.
2. **The Event Creator:** A host organizing events ranging from 500 person concerts to 15 person exclusive dinners. They need fast setup, reliable payment processing, and real time sales data.
3. **The Gatekeeper:** Staff hired by the creator. They do not have an app account. They use a secure web link to scan QR codes at the door.
4. **The Platform Owner:** AccessG administrative staff. They handle payment disputes, refunds, and broken transactions.

## 5. Scope
The version one scope includes ten core features. It covers public event discovery, private event unlocking, ticket purchasing, offline ticket storage, memory suite viewing, event creation, secure gatekeeper link generation, sales dashboards, and owner support overrides.

The scope explicitly excludes algorithmic recommendation feeds, in-app chat, automated marketing emails, semantic search for private records, and closed-loop user wallets. 

## 6. Functional Requirements

**FR-1: View Public Events**
The system must display a chronological list of General Events. Users must be able to search these shared records by semantic meaning.

**FR-2: Unlock Studio Events**
The system must provide a text input for access codes. When a user submits a valid code, the system must reveal the hidden event details and dietary requirement form. 

**FR-3: Buy Ticket**
The system must process payments via Paystack or Flutterwave. The system must lock the database row during transaction processing to prevent overselling. Upon success, the system must generate a digital pass.

**FR-4: Offline Pass Display**
The application must save the digital pass and QR code to the device local storage immediately upon purchase. The app must render this QR code when the device has no network connection.

**FR-5: Memory Suite**
The system must display a gallery of compressed photos from past attended events. The system must fetch these records using the exact customer ID.

**FR-6: General Event Creation**
Creators must be able to publish public events. The system must collect event name, date, location, capacity, and ticket price.

**FR-7: Studio Event Creation**
Creators must be able to publish private events. The system must generate a unique access code. The system must attach a custom data collection form to the checkout flow.

**FR-8: Shared Gatekeeper Link**
The system must generate a secure URL for gate staff. The link must not require a staff login. The link must allow the camera to scan QR codes and mark tickets as used in the database. [ASSUMPTION ADDED] The system automatically expires the gatekeeper access token exactly two hours after the event end time. The creator dashboard must also include a manual "Revoke Link" button. Reason: A static link shared on a public chat group compromises the entire event security.

**FR-9: Sales Dashboard**
The system must display total tickets sold, remaining capacity, and total revenue for the logged in creator.

**FR-10: Support Override**
The system must provide an owner dashboard. Owners must be able to refund a transaction and revoke a digital pass. Refunds must process directly back to the original payment method.

## 7. AI and AI Related Tools and Solutions
Version one utilizes AI strictly for semantic search of shared event records. Users can search for events using natural language. The system must not use AI to access or search private customer records. 

[ASSUMPTION ADDED] We will use OpenAI text-embedding-3-small to generate vector embeddings for event descriptions. Reason: It provides fast, cost effective semantic matching for user queries.

The LLM extracts the search term and triggers a backend function call. The backend receives the string, generates the embedding via the OpenAI API, and queries the PostgreSQL database.

```text
System Prompt for Semantic Search Router:
You are the AccessG event search router. Your job is to convert user natural language queries into a clear search string for our backend function.
You have access to public event descriptions, dates, and ticket prices.
You must never attempt to look up specific users, ticket purchases, or private memory suites. 
If a user asks about their personal ticket or payment, respond exactly with: "I cannot access private records. Please contact support."
If a user asks about event availability, extract their intent into a concise search string and trigger the search function.
```

## 8. Technical Architecture

The core stack is Next.js, TypeScript, Prisma, and PostgreSQL. 

To handle high transaction volume and concurrent ticket sales, the architecture requires specific infrastructure additions.
1. **PostgreSQL Row Level Locking:** We must use `SELECT ... FOR UPDATE` to handle the "Oversell Collision." When a user clicks buy, the database places a lock on the event capacity row. If the cap is reached, subsequent requests fail instantly.
2. **PgBouncer:** We must use PgBouncer for PostgreSQL connection pooling to prevent database connection exhaustion during traffic spikes.
3. **Service Workers:** The Next.js frontend must implement a Service Worker to aggressively cache the QR code payload in IndexedDB for the offline pass display.
4. **Zero Downtime Deployments:** We must use a Blue/Green deployment strategy via AWS ECS or Vercel. Database migrations must be backwards compatible. 

### Data Model Summary

| Model | Purpose | Data Type |
| :--- | :--- | :--- |
| User | Stores attendee and creator profiles | Relational |
| Event | Stores public and studio event details | Relational |
| Ticket | Stores ownership, payment status, and scan status | Relational |
| PaymentAttempt | Stores transaction intents and gateway payloads | Relational |
| GatekeeperLink | Stores rotating tokens for staff access | Relational |
| MemorySuite | Stores references to event photos | Relational |

### Tier Access

| User State | View Public Events | Unlock Studio Events | View QR Code | View Memory Suite |
| :--- | :--- | :--- | :--- | :--- |
| Unregistered | Yes | Yes (with code) | No | No |
| Registered (Unpaid) | Yes | Yes (with code) | No | No |
| Paid Ticket Holder | Yes | Yes (with code) | Yes | Yes (Post Event) |
| Ticket Refunded | Yes | Yes (with code) | Revoked | Revoked |

### Prisma Data Model

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      String   @default("ATTENDEE") // ATTENDEE, CREATOR, OWNER
  tickets   Ticket[]
  events    Event[]  @relation("CreatorEvents")
  paymentAttempts PaymentAttempt[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Event {
  id          String   @id @default(uuid())
  creatorId   String
  creator     User     @relation("CreatorEvents", fields: [creatorId], references: [id])
  title       String
  description String
  isStudio    Boolean  @default(false)
  accessCode  String?  @unique
  capacity    Int
  ticketsSold Int      @default(0)
  price       Int
  date        DateTime
  tickets     Ticket[]
  paymentAttempts PaymentAttempt[]
  memorySuite MemorySuite[]
  gateLinks   GatekeeperLink[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model PaymentAttempt {
  id              String   @id @default(uuid())
  eventId         String
  event           Event    @relation(fields: [eventId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  amount          Int
  status          String   @default("INITIATED") // INITIATED, SUCCESS, FAILED, ABANDONED
  gatewayReference String? @unique
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Ticket {
  id            String   @id @default(uuid())
  eventId       String
  event         Event    @relation(fields: [eventId], references: [id])
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  qrPayload     String   @unique
  status        String   @default("VALID") // VALID, SCANNED, REVOKED
  scannedAt     DateTime?
  transactionId String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model GatekeeperLink {
  id        String   @id @default(uuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model MemorySuite {
  id        String   @id @default(uuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  photoUrl  String
  createdAt DateTime @default(now())
}
```

## 9. Vector Database Architecture and Design
We will use the `pgvector` extension within our existing PostgreSQL database. This eliminates the need for a separate vector database infrastructure. We will store vector embeddings of the event title, description, and tags. When a user searches for an event by meaning, the backend uses the OpenAI API to generate an embedding of the query and performs a cosine similarity search against the vector table.

## 10. Vector Database Model

### Vector Schema (SQL)

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "EventEmbedding" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "eventId" uuid NOT NULL REFERENCES "Event"(id) ON DELETE CASCADE,
  content text NOT NULL,
  embedding vector(1536) NOT NULL
);

CREATE INDEX ON "EventEmbedding" USING hnsw (embedding vector_cosine_ops);
```

### Example Vector Query

```sql
-- Find the top 5 events matching the user semantic query
SELECT e.title, e.description, 1 - (ee.embedding <=> '[0.012, -0.045, ...]') AS similarity
FROM "Event" e
JOIN "EventEmbedding" ee ON e.id = ee."eventId"
WHERE e."isStudio" = false
ORDER BY ee.embedding <=> '[0.012, -0.045, ...]'
LIMIT 5;
```

## 11. Business Model
The platform integrates Paystack and Flutterwave for payment processing. The live transaction cost from the gateway is exactly 1.5 percent plus 100 Naira for local transactions. The gateway handles currency switching. 

[ASSUMPTION ADDED] AccessG charges a flat 5 percent platform fee on every ticket sold. We will utilize Paystack Split Payments. The system automatically routes the ticket revenue directly to the creator bank account while sending the 5 percent platform fee to AccessG. Reason: This removes financial liability from AccessG, avoids wallet compliance regulations, and ensures creators receive payouts instantly.

## 12. Success Metrics

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| Backend Scan Resolution | < 100ms | Server side application logs |
| Offline Ticket Load Success | 99.9% | Local storage fetch success rate logged on next sync |
| Double Booking Rate | 0% | Database constraints and transaction logs |
| Payment Conversion Rate | > 85% | Gateway successful callbacks versus checkout intents |

## 13. Risks

| Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| Oversell Collision | Critical | Implement row level locking in Postgres (`SELECT ... FOR UPDATE`) during checkout. |
| Gateway Blackout | High | Implement webhooks with automated retries. Store unconfirmed payments in the `PaymentAttempt` table. |
| Link Leak | High | Implement strict gatekeeper token expiration tied to the event schedule. Provide a manual revoke button in the creator dashboard. |
| Storage Overload | Medium | Automatically compress all Memory Suite images to under 200 kilobytes before uploading to cloud storage. |

## 14. Open Questions
1. When users pay in foreign currencies, do creators receive the funds settled in Naira or in the original currency?
2. What is the legal retention policy for refund records and gate scan timestamps under local data protection laws?

## All assumptions in this document
1. [ASSUMPTION ADDED] The system automatically expires the gatekeeper access token exactly two hours after the event end time. Reason: A static link shared on a public chat group compromises the entire event security.
2. [ASSUMPTION ADDED] We will use OpenAI text-embedding-3-small to generate vector embeddings for event descriptions. Reason: It provides fast, cost effective semantic matching for user queries.
3. [ASSUMPTION ADDED] AccessG charges a flat 5 percent platform fee on every ticket sold using Paystack Split Payments. Reason: This removes financial liability from AccessG and avoids complex wallet compliance regulations.
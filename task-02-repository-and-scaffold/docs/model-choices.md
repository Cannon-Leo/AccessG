# AccessG Task 02: Technical Model Choices & Stack Rationale

## 1. Core Technology Stack Matrix

| Layer | Selected Technology | Alternative Evaluated | Why Selected | Why Alternative Rejected |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Vite + React SPA | Server Actions for secure database mutations; native SSR/RSC for cold start SEO and instant first-paint performance. | Vite requires separate backend API service, doubling deployment complexity and increasing latency outside gates. |
| **Language** | TypeScript (Strict) | Plain JavaScript | Compile-time type safety across database models, server actions, and UI component props. | JavaScript risks runtime undefined property crashes during live ticket scans and payment handoffs. |
| **Database ORM** | Prisma 6 | Drizzle ORM | Robust migration engine, mature relationship modeling, automated TypeScript client generation, and battle-tested transaction support. | Drizzle requires manual SQL query construction for complex relations; Prisma provides safer compile-time guarantees. |
| **Primary Database** | PostgreSQL 16 | MySQL 8 / MongoDB | Native support for row-level locking (`FOR UPDATE`), ACID transactional integrity, and native vector search via `pgvector`. | MySQL has weaker vector extensions; MongoDB lacks deterministic ACID row-locking required to prevent ticket overselling. |
| **Vector Engine** | `pgvector` | Pinecone / Qdrant | Single database architecture eliminates data synchronisation lag between relational events and vector embeddings. | Dedicated vector databases introduce additional operational overhead, multi-service billing, and consistency lag. |
| **Embedding Model** | `text-embedding-3-small` | `all-MiniLM-L6-v2` | High semantic accuracy for African entertainment event queries at low latency and negligible inference cost. | Local self-hosted embeddings require dedicated GPU instances, increasing infrastructure cost for MVP. |
| **Client Storage** | IndexedDB (`idb-keyval`) | LocalStorage | Asynchronous non-blocking storage, capable of storing binary images, QR vector data, and offline pass metadata without 5MB limits. | LocalStorage is synchronous, blocking the main thread during large pass reads, and has a strict 5MB quota. |
| **Styling** | Tailwind CSS + M3 Tokens | Styled Components / Emotion | Zero runtime CSS-in-JS overhead; atomic utility classes resolve compile-time variables (`var(--color-*)`) without layout shift. | CSS-in-JS adds significant client bundle size and runtime style evaluation overhead on low-end mobile devices. |

---

## 2. Architectural Trade-offs & Decisions

### A. The Prisma Singleton Architecture
In Next.js serverless and development runtimes, connection management requires strict isolation. We rejected creating ad-hoc `new PrismaClient()` instances within route handlers, as repeated HMR cycles exhaust database connection limits. By binding the singleton to `globalThis`, connection pooling remains stable across hundreds of local hot reloads.

### B. Offline Pass Storage Architecture
Offline ticket retrieval is the single most critical UX requirement for AccessG. When an attendee arrives at an event venue (e.g., Eko Atlantic, Landmark Beach), cellular base stations frequently experience severe bandwidth throttling or complete network collapse. 
We selected IndexedDB paired with a Service Worker:
- `idb-keyval` provides a lightweight (under 1kB) Promise-based wrapper around IndexedDB.
- Offline passes are keyed by deterministic ticket UUIDs.
- Pass payloads include the pre-generated SVG QR vector, attendee name, event metadata, and an HMAC cryptographic signature for gate verification.

### C. Direct Payment Attempt Logging
To ensure zero financial discrepancy, the platform mandates logging every transaction intent into a dedicated `PaymentAttempt` table *before* redirecting to the payment gateway (Flutterwave). Tickets and digital passes are minted *only* upon gateway webhook verification, guaranteeing that uncompleted checkouts never pollute the core ticket inventory.

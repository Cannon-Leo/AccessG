# AccessG

A single-page event ticketing platform serving event attendees and independent creators, where ticket retrieval and offline gate scanning must work under hostile network conditions without failure.

## 1. What This Is
AccessG is a dual-engine ticketing platform where attendees purchase standard or code-locked exclusive passes, cache them offline via Service Workers and IndexedDB for instant QR gate validation, and creators track real-time admissions while eliminating overselling through PostgreSQL row-level locks.

## 2. Status
- **Overall:** Phase 1 in active development.
- **Task 01 (Design System):** In progress (business brief defined; token derivation and Figma color/type systems being documented).
- **Task 02 (Repository & Scaffold):** Not started.
- **Task 03 (Client-Side Validation & A11y):** Not started.
- **Task 04 (Server-Side Security & Source of Truth):** Not started.
- **Task 05 (Sessions, Compliance & Defence):** Not started.

## 3. The Stack, With Reasons
- **Next.js (App Router):** Unified frontend and server routes, chosen over separate React+Express to avoid split-deployment latency and CORS configuration on mobile networks.
- **TypeScript:** Strict compile-time typing for financial and payload contracts, chosen over JavaScript to eliminate null-reference errors in checkout paths.
- **Prisma ORM:** Declarative migrations and type-safe query generation, chosen over TypeORM for tighter integration with PostgreSQL.
- **PostgreSQL:** Native ACID compliance and row-level locking (`SELECT FOR UPDATE`), chosen over MongoDB to guarantee impossible overselling.
- **PGVector (`text-embedding-3-small`):** Direct vector similarity search inside Postgres, chosen over a standalone vector database (Pinecone/Milvus) to maintain single-database atomicity and zero external synchronization overhead.
- **Flutterwave:** Direct regional African payment rails and webhook infrastructure, chosen over Stripe for broader localized mobile money and card support.
- **IndexedDB & Service Worker:** Device-local pass persistence, chosen over LocalStorage for structured blob storage and offline resilience during gate scans.

## 4. Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/Cannon-Leo/AccessG.git
   cd AccessG
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start development server:
   ```bash
   npm run dev
   ```
6. Open browser at:
   ```
   http://localhost:3000
   ```

## 5. Environment Variables
- `DATABASE_URL`: Connection string for PostgreSQL database instance.
- `DIRECT_URL`: Direct unpooled connection string for running migrations.
- `OPENAI_API_KEY`: API key for generating 1536-dimension embeddings for semantic search.
- `GEMINI_API_KEY`: API key for Gemini free tier assistance.
- `FLUTTERWAVE_PUBLIC_KEY`: Public key for client-side checkout initiation.
- `FLUTTERWAVE_SECRET_KEY`: Secret key for server-side payment verification and webhook validation.
- `FLUTTERWAVE_ENCRYPTION_KEY`: Secret key for payload verification.
- `SESSION_SECRET`: Cryptographic secret for signing session cookies.
- `SMTP_HOST`: Mail server hostname for verification code delivery.
- `SMTP_PORT`: Mail server port.
- `SMTP_USER`: Mail server authentication username.
- `SMTP_PASS`: Mail server application password.

## 6. What This Deliberately Does Not Do
- **No Algorithmic Feeds:** Discoverability is strictly semantic and chronological; no behavioral engagement algorithms.
- **No In-App Chat:** High operational and moderation overhead outside core ticketing utility.
- **No Automated Marketing Campaigns:** Out of scope for MVP; transactional communication only.
- **No Semantic Search for Private Records:** Private studio access codes and attendee records are strictly indexed for exact lookup to protect confidentiality.
- **No Closed-Loop User Wallets:** Payments settle directly through Flutterwave; AccessG does not hold custodial deposits.

## 7. Known Defects
1. `task-01-design-system`: Token exports and color palettes are currently staged in documentation; automated CSS pipeline script is not yet checked into runtime code.
2. `repository-root`: The application runtime engine (Next.js scaffold) has not yet been initialized; repository currently contains design and architectural context specifications.

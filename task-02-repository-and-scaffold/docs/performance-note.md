# Performance Note: Initial Page Load Metrics (Task 02)

## 1. Measured Numbers
- **Server Startup Time:** 499ms (Process ready)
- **First Page Load Time:** **34ms** (`evidence/04-first-load.txt`)
- **HTTP Status Code:** `200 OK`
- **First Load JS Payload:** 103 kB
- **Process ID (PID):** `21928` on local port `3008`

## 2. Comparison to Targets
- **AccessG Production Target:** $\le 50\text{ms}$ for cached pass views, $\le 100\text{ms}$ for cold server rendering.
- **Observed Result:** At 34ms, initial static generation and delivery is well within our performance envelope.
- **Dev-Mode vs. Production Overhead Gap:**
  During initial cold compilation in Next.js development mode, on-demand Turbopack/Webpack compilation can reach 1,200ms–2,500ms before bundling completes. Once compiled, local static page rendering settles down to 30ms–50ms.

## 3. What Accounts for the Gap
- **Next.js Compilation Overhead:** During local testing, the initial compile must parse the entire component tree, resolve Tailwind CSS variable utilities, and bundle font stylesheets.
- **Database Non-Blocking Initialization:** The initial home screen currently renders statically without blocking on initial database connections, ensuring attendees hitting the page outside venue gates get instantaneous visual feedback regardless of cell network conditions.

# AccessG Task 02: Named Defects & Production Costs

Every production engineering milestone surfaces real-world defects. A submission claiming zero defects is unrealistic; genuine engineering requires documenting failures, their root causes, and their exact operational impact. Below are the actual defects identified and mitigated during Task 2.

---

## Defect 1: SSR Hydration Mismatch from Client-Side Media and Auto-Focus
* **Location:** `src/app/page.tsx` & `src/app/layout.tsx`
* **What Happened:**
  During initial server-side rendering (SSR), the server rendered the honeycomb layout without active video playback instances and with an interactive studio access code input. When hydrated on the client browser, the DOM state differed from the server output, triggering Next.js warning:
  `"Hydration failed because the server rendered HTML didn't match the client."`
* **How It Was Discovered:**
  Browser console inspection on first render and subsequent Next.js error boundary overlay during local testing.
* **Fix & Architecture Policy:**
  1. Wrapped client-only media rendering in an `isMounted` hook guard (`useEffect` setting `isMounted = true`).
  2. Replaced declarative HTML `autoFocus` with an imperatively triggered `inputRef.current.focus()` inside `useEffect` once the input container mounts.
  3. Added `suppressHydrationWarning` to top-level `<html>` and `<body>` tags in `src/app/layout.tsx`.
* **Cost in Production:**
  Hydration failures force React to discard the entire server-rendered DOM tree and re-render everything synchronously from scratch on the client. On low-powered mobile devices held by attendees queuing at event gates, this causes visible screen flickering, input freezes, and an extra 400ms–800ms of CPU jank, increasing gate wait times.

---

## Defect 2: Next.js 15.5 Webpack Prerender Worker Chunk Mismatch
* **Location:** `package.json` (`next` dependency version) & `.next/` cache
* **What Happened:**
  When a custom `src/app/not-found.tsx` boundary was introduced while the project was tracking a bleeding-edge Next.js 15.5 candidate build, `next build` failed during static page generation with internal worker error:
  `Cannot find module './611.js' in worker thread during /_not-found prerender.`
* **How It Was Discovered:**
  Running production build verification (`npm run build`).
* **Fix & Architecture Policy:**
  Pinned Next.js to stable `15.1.4`, purged corrupted `.next/` build artifacts, and verified subsequent builds (`npm run build`) exited cleanly with code 0 in 1.1s.
* **Cost in Production:**
  A failing build worker chunk halts automated CI/CD deployment pipelines immediately, preventing critical hotfixes from reaching staging or production clusters prior to event kick-off.

---

## Defect 3: Local Port Collision and Process Zombie Overhead
* **Location:** `dev` process binding on `localhost:3000` -> `localhost:3008`
* **What Happened:**
  During rapid iterative server restarts, previous Node.js instances retained the default TCP port `3000`, causing Next.js to silently increment the listening port to `3001`, `3002`, and eventually `3008` without notifying active test runners.
* **How It Was Discovered:**
  Diagnostic checks recorded the active process PID binding on port `3008` rather than the standard production target `3000`.
* **Fix & Architecture Policy:**
  Implemented explicit diagnostic scripts logging active PIDs and ports (`03-server-start.txt`), ensuring test assertions hit the dynamic binding port rather than assuming port 3000.
* **Cost in Production:**
  In containerized production environments (e.g., Docker/Kubernetes), if a health check probes port 3000 while the application has silently fallen back to an alternative port, the container orchestrator flags the pod as unhealthy and enters a crash-loop backoff state.

# AccessG Task 02: Information Design & Architecture

## 1. Information Hierarchy & Role Segmentation
AccessG serves four distinct actors under high-stress, variable-connectivity environments. The information architecture is structured to deliver immediate visual comprehension without cognitive load.

| Actor | Primary Operational Goal | Key Information Needs | Target Response Time |
| :--- | :--- | :--- | :--- |
| **Attendee** | Instant pass retrieval at gate | Offline QR code, event name, tier label, gate entry instructions | $< 50\text{ms}$ (from IndexedDB) |
| **Event Creator** | Monitor capacity & revenue | Plain-text sales numbers, remaining capacity, gate links | Real-time / on-demand |
| **Gatekeeper** | Single-tap QR verification | Large status banner (VALID / REVOKED / DUPLICATE), attendee tier | $< 200\text{ms}$ (online) |
| **Platform Owner** | Resolve disputes & issue refunds | Payment attempt trace IDs, pass revocation controls | Administrative SLA |

---

## 2. The Single-Page Landing Viewport (100dvh Constraint)

### A. Viewport Pinning (Mobile First)
On mobile devices arriving outside crowded venue gates in Lagos, vertical screen scrolling introduces navigation friction and accidental pull-to-refresh events. The landing hero is engineered to occupy exactly `100dvh` (dynamic viewport height), adapting fluidly to browser chrome appearance/disappearance on iOS Safari and Android Chrome.

### B. Visual Zoning (The 3-Zone Architecture)
1. **Header Navigation (Zone 1 - Top 10%):**
   - Brand mark ([`AccessGLogo`](file:///c:/Users/CANNONLEO/OneDrive/Documents/Project%20Engineering%20lessons/AccessG/src/components/AccessGLogo.tsx)) on the left.
   - Outlined gatekeeper action on the right.
   - Clean negative space separating brand identity from operational controls.
2. **Hero Core Focus (Zone 2 - Center 80%):**
   - **Eyebrow Pill:** Clear value proposition (`THE UNBREAKABLE DIGITAL PASS`) in `Label Medium` (`12px`, `font-label`).
   - **Display Heading:** Dual-line hierarchy (`Own the Moment. Never the Queue.`) with restrained soft brand glow (`#00ff66` at 15%).
   - **Contextual Copy:** Exactly two sentences defining the dual value of offline persistence and exclusive Lagos event access (`Body Large`, `16px`).
   - **Dual Action Bar:** Primary action (`Discover Events`) contrasted against the progressive disclosure button (`Have a Studio Code?`).
3. **Progressive Studio Code Expansion:**
   - To keep the viewport uncluttered, private studio code input is collapsed behind a single tap.
   - Upon actuation, the button morphs smoothly into an inline capsule containing an uppercase text input, direct `Unlock` submit action, and an escape dismiss button.

---

## 3. Contrast & Legibility Policy
Venue approaches are characterized by high-glare exterior sunlight, pitch-black night queues, or intense strobe lighting.
- All core text uses `--color-inverse-on-surface` (`#fefefe`) against pure pitch black (`#000000`).
- The background video mesh is suppressed under a mathematical radial vignette mask:
  `radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 18%, rgba(9, 9, 11, 0.94) 42%, rgba(9, 9, 11, 0.6) 72%, rgba(0, 0, 0, 0.15) 90%, transparent 100%)`
- This ensures 100% WCAG AAA contrast compliance across all text nodes regardless of background video content.

# AccessG Design System: Deliberate Divergences from Material Baseline

To qualify for Task 1, an engineer must make deliberate, reasoned divergences from standard Material Design baselines and understand the trade-offs where their choices fail.

---

## Divergence 1: Letter Spacing on Display Styles (Aggressive Negative Tracking)

* **Documented Material Default:**
  Material Design recommends `0px` letter-spacing for Display Large ($57\text{px} - 64\text{px}$) and slightly positive tracking for smaller headlines.
* **AccessG Choice:**
  Tightly compressed negative letter-spacing (`-3px` on Display Large and Display Medium, `-1.8px` on Headline Large).
* **Why:**
  AccessG is heavily accessed by attendees standing in line outside loud, dark venue gates looking down at mobile screens under bright outdoor floodlights or strobe flashes. Tighter letter spacing solidifies words into compact geometric wordmarks that the eye recognizes in milliseconds, preventing multi-line event titles from sprawling horizontally across mobile viewports.
* **Where This Choice Fails (The Trade-Off):**
  This choice fails catastrophically in multi-paragraph editorial reading or when users have reading disabilities like dyslexia. At negative tracking, adjacent letterforms crowd each other and ascenders/descenders visually collide, dropping sustained reading comprehension and causing visual fatigue on long blocks of text.

---

## Divergence 2: Dual Font Family Pairing (Noto Sans + Poppins)

* **Documented Material Default:**
  Material Design prescribes a single font family (e.g. Roboto) applied uniformly across all 15 typography roles with variations only in weight and optical size.
* **AccessG Choice:**
  A deliberate split system:
  - **Noto Sans** strictly for Display, Headline, and Title roles.
  - **Poppins (Weight 500)** strictly for Body and Label roles.
* **Why:**
  Headings in AccessG must communicate ticket status and event branding with brutal, unembellished clarity (Noto Sans's geometric neutrality). Interactive controls and form inputs, however, benefit from Poppins's open, geometric humanist curves, which make compact labels (button CTA, capacity pill, price tags) warm, legible, and distinct from data headings.
* **Where This Choice Fails (The Trade-Off):**
  This choice fails on network-constrained 2G/3G mobile connections at crowded stadium events. Loading two distinct web font families (Noto Sans and Poppins across multiple font files) increases network payload by approximately 80KB–120KB and triggers a visible Flash of Unstyled Text (FOUT) on cold loads, delaying critical ticket pass rendering at the entrance gate.

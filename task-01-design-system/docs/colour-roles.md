# AccessG Color System: Roles, Tonals & Contrast Ratios

This document defines the semantic color roles, tonal generation strategy, and WCAG contrast evaluations for AccessG, derived from [`AccessG-design-tokens.tokens.json`](file:///c:/Users/CANNONLEO/OneDrive/Documents/Project%20Engineering%20lessons/AccessG/AccessG-design-tokens.tokens.json).

---

## 1. Brand Color Origin & Pinning Rationale
* **Primary Key Seed:** `#00ff66` ("Laser Gate Green" / High-Luminance Cyber Emerald).
* **Origin Story:**
  Event venues, nightclubs, and outdoor concert grounds are characterized by low-ambient illumination, heavy smoke/strobe effects, and glaring mobile displays. `#00ff66` was chosen because the human eye's photopic spectral sensitivity peaks in the green spectrum (~555nm). A neon gate green provides immediate cognitive feedback for passes, validated QR confirmations, and clear checkout buttons without requiring high display brightness on depleted mobile batteries.
* **Pinning at Primary 40:**
  Material baseline palette algorithms normally desaturate vibrant greens into muted olive tones at level 40. By explicitly pinning `#00ff66` as **Primary 40**, the entire tonal palette is anchored around this saturated electrical hue rather than being absorbed into a dull neutral palette.
  - `evidence/01-palette-before-pin.png`: Default unpinned generator generated a dusty green (`#2e7d32`) lacking visibility on dark backgrounds.
  - `evidence/02-palette-after-pin.png`: Pinned palette preserves high-chroma vibrancy across the entire interactive hierarchy.

---

## 2. Tonal Palette Distribution
Each key color generates 13 standardized tones:
`0 (Black)`, `10`, `20`, `30`, `40 (Pinned Seed)`, `50`, `60`, `70`, `80`, `90`, `95`, `98`, `99`, `100 (White)`.

* **Why this number is sufficient:**
  13 tones provide mathematically predictable luminance jumps from pure black (for OLED true-dark backgrounds) to high-contrast surface containers (90–98) and pure white (100) from a single source of truth.

---

## 3. Semantic Color Roles & Contrast Matrix

> **Golden Rule of the Design System:**
> Primitive swatches (`--primitive-*`) are strictly internal palette variables. Only **Color Roles** (`--color-*`) are permitted on the UI interface.

### Active UI Role Pairs & Calculated Contrast Ratios

| Surface Role | Text / Icon Role | Resolved Hex Pair | Contrast Ratio | WCAG Compliance | Implementation Notes & Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--color-surface` | `--color-on-surface` | `#ffffff` on `#1d201e` | **16.44 : 1** | **AAA** Pass | Primary background for standard light-mode passes and detail tables. |
| `--color-primary` | Dark Text (`#000000`) | `#00ff66` on `#000000` | **15.50 : 1** | **AAA** Pass | High-prominence checkout buttons & "Admit One" validated badge state. |
| `--color-primary` | `--color-on-primary-fixed` | `#00ff66` on `#003d18` | **9.22 : 1** | **AAA** Pass | Accessible brand buttons with deep pine typography. |
| `--color-inverse-surface` | `--color-inverse-on-surface` | `#3c423e` on `#fefefe` | **10.20 : 1** | **AAA** Pass | Dark-mode modal popups and gatekeeper scan HUD overlays. |
| `--color-surface-variant` | `--color-on-surface-variant` | `#f0f4f2` on `#50665a` | **5.58 : 1** | **AA** Pass | Secondary card containers and event metadata tags. |
| `--color-error-container` | `--color-on-error-container` | `#ffe6eb` on `#e6003d` | **4.01 : 1** | Large Text Pass | Warning banners for expiring ticket reservations. |
| `--color-primary` | `--color-on-primary` (White) | `#00ff66` on `#ffffff` | **1.36 : 1** | **FAIL (Documented)** | **PROHIBITED FOR TEXT:** White text on neon primary green fails readability; our system enforces `#000000` or `#003d18` (`on-primary-fixed`) for all primary button labels. |

---

## 4. Functional Colors
* **Error (`#ff3366` / Tone 40):** High-saturation crimson used for payment gateway drop-offs, rejected QR passes, and depleted capacity alerts.
* **Warning (`#ffd600` / Tone 40):** Electric amber indicating cart hold timeouts and pending blockchain/offline sync states.
* **Success / Primary (`#00ff66` / Tone 40):** Laser gate green indicating successful gate check-in and transaction clearance.

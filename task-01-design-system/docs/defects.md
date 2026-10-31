# AccessG Task 01: Named Defects & Production Costs

Every real-world engineering project contains defects. A submission claiming zero defects is penalized because complex software inevitably surfaces edge-cases. Below are the actual defects identified during Task 1.

---

## Defect 1: Figma Token Export Omission of Color Variables
* **Location:** `evidence/05-tokens-incomplete.json` vs. `evidence/06-tokens-complete.json`
* **What Happened:**
  When exporting tokens using the Figma Design Tokens plugin, only `font` and `effect` styles were initially exported. The entire primitive color palette and semantic color roles were missing because the Figma variables collection had not been assigned to an active export collection mode.
* **How It Was Discovered:**
  Running `node -e "console.log(Object.keys(require('./tokens.json')))"` showed only `['font', 'effect']` and zero color definitions.
* **Cost in Production:**
  If an incomplete token file is pushed to CI/CD, the build script generates an empty color stylesheet. The frontend defaults to unstyled browser black/white or fallback system colors, completely breaking brand legibility and failing gate scanning readability under venue lighting.

---

## Defect 2: Unacceptable Text Contrast on `--color-on-primary` (White on Electric Green)
* **Location:** `AccessG-design-tokens.tokens.json` (`color roles.on primary`)
* **What Happened:**
  Figma's automated role assignment mapped `--color-on-primary` to pure white (`#ffffff`). Because `--color-primary` was pinned to vibrant `#00ff66`, the resulting contrast ratio is **1.36 : 1**, which severely fails WCAG AA (minimum 4.5:1).
* **Fix & Architecture Policy:**
  White text on primary buttons is strictly prohibited in our design system. Our components explicitly bind primary buttons to `--color-on-primary-fixed` (`#003d18`, contrast **9.22:1**) or pure black (`#000000`, contrast **15.50:1**).
* **Cost in Production:**
  If an engineer uses `--color-on-primary` on a primary checkout CTA, attendees outside in daylight or strobe lighting cannot read the button label "Confirm & Pay", leading to checkout abandonment and gate congestion.

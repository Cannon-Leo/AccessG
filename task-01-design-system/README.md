# Task 01: The Design System, and Proving the Agent Used It

## What This Task Was
This task designs and proves a high-contrast design system tailored for AccessG—an event ticketing platform operating in low-light, congested venue environments. It extracts tokens from Figma into JSON, converts them into CSS variables, forces an agent to consume them without hallucinating raw values, and proves failure isolation through a deliberate regression branch.

## What Was Built
- Utilitarian high-contrast color system pinned at Primary 40.
- 15-role typography system following strict line-height multiplier formulas ($1.4\times$, $1.5\times$, $1.6\times$) and custom letter spacing.
- 3 primary-tinted elevation shadow profiles (soft, medium, hard).
- Token JSON export pipeline and CSS variable injection rules.
- Test screen demonstrating 100% token consumption with zero raw color values.

## Key Decisions
1. **Primary 40 Pinning:** Preserved brand saturation and contrast in dark mode rather than allowing Figma's generator to dilute the brand into a desaturated surface tone.
2. **Compact Letter Spacing on Display Styles:** Tightened display headings by -0.02em to ensure rapid scannability on small mobile displays outside event gates.
3. **Primary-Tinted Shadows:** Used 4%–12% brand-tinted shadows over pure black to preserve perceived elevation on dark `#121212` surfaces.

## What Got Wrong (Known Defects)
- **Defect:** Initial Figma export omitted color variables when exporting collection sets due to unlinked layer variable modes. Caught and verified by comparing `05-tokens-incomplete.json` against `06-tokens-complete.json`.
- **Cost in Production:** If shipped, the application falls back to browser default colors, resulting in illegible un-themed controls under venue lighting.

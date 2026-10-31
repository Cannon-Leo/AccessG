# AccessG Task 01: The Interview Defence

Answers to all 12 interview questions for Task 1 (maximum 200 words each).

---

### 1. How would you structure design tokens?
We structure tokens in three distinct layers:
1. **Global (Primitive) Tokens:** Raw values representing available design properties (`--primitive-primary-40: #00ff66`, `--primitive-neutral-10: #1d201e`). These define what colors, typography, and spaces exist in the design system, but carry no semantic meaning regarding where they belong.
2. **Semantic (Role) Tokens:** Functional aliases that map a primitive token to a specific UI context (`--color-surface`, `--color-on-surface`, `--color-primary-container`). Semantic tokens describe the *intent* of the styling rather than the raw visual value.
3. **Component Tokens:** Scoped tokens applied to discrete component states (`--button-primary-bg: var(--color-primary)`).
Crucially, application interfaces only consume semantic and component tokens. Primitives are never exposed directly to product screens, ensuring themes and modes can be swapped without touching component code.

---

### 2. When is a token change breaking?
A token change is breaking in three scenarios:
1. **Removal or Renaming of a Semantic Token:** If `--color-surface-variant` is renamed to `--color-surface-subtle`, any unmigrated component referencing the old variable will fall back to unstyled browser defaults or transparent backgrounds.
2. **Type or Unit Incompatibility:** Changing a typography token from a unitless line-height (`1.5`) to a pixel-based value (`24px`) can break mathematical scaling when font sizes are overridden dynamically in children.
3. **Contrast Inversion:** Modifying a background token's luminance without updating its paired foreground text token (e.g., brightening `--color-surface` without darkening `--color-on-surface`) can silently degrade WCAG compliance below 4.5:1, breaking accessibility in production.

---

### 3. How would you support multiple brands and themes?
We support multiple brands and dark/light modes by keeping semantic role names constant while swapping the underlying primitive token references using CSS custom properties and HTML data attributes. 
For example, in AccessG, the semantic role `--color-surface` maps to `--primitive-neutral-100` (`#ffffff`) in light mode and to `--primitive-neutral-10` (`#1d201e`) under `[data-theme="dark"]`. 
For multi-tenant creator branding, we override the primary seed variables (`--primitive-primary-40`) at the page container root. Because all semantic color roles reference these primitives dynamically via CSS variables, the entire checkout experience inherits the creator's brand colors without altering component logic or duplicating CSS stylesheets.

---

### 4. Can tokens guarantee accessible contrast?
No, tokens alone cannot guarantee accessible contrast. Tokens provide consistent raw values, but accessibility depends entirely on how foreground and background tokens are paired together in UI markup.
For instance, a system can define an accessible green token (`#00ff66`) and an accessible white token (`#ffffff`), but if an engineer pairs them together (`color: var(--color-on-primary); background: var(--color-primary)`), the resulting contrast is an unacceptable 1.36:1. 
Tokens only guarantee accessibility when bundled with strict design guidelines, semantic pairing contracts (e.g. enforcing that `--color-on-primary` is always used on `--color-primary`), and automated linting tools that audit color pairs at compile time.

---

### 5. How do you ensure that colour contrast guidelines are met within a website or application's design?
We enforce contrast guidelines through a multi-tier pipeline:
1. **Design System Auditing:** During token definition, every semantic text/background pair is audited using the WCAG relative luminance formula ($\frac{L_1 + 0.05}{L_2 + 0.05}$) to verify 4.5:1 (AA) for normal text and 3:1 for large text/icons.
2. **Automated Testing:** We integrate `axe-core` and Lighthouse into our continuous integration (CI) tests to crawl rendered DOM trees and flag contrast violations automatically before pull requests merge.
3. **Manual Validation:** We verify critical flows (like QR ticket presentation) on physical hardware under high-glare and low-light environments to confirm legibility beyond mathematical thresholds.

---

### 6. Can you discuss the differences between WCAG levels A, AA and AAA?
WCAG is structured into three progressive conformance tiers:
- **Level A (Essential):** Sets minimum baseline accessibility. Without Level A, users with disabilities find it impossible to access content (e.g., providing alt text for images, basic keyboard navigation, not relying purely on shape to convey meaning).
- **Level AA (Standard):** The target legal and commercial benchmark for modern web applications. It removes major barriers for the widest audience, mandating minimum contrast ratios of 4.5:1 for normal text (3:1 for large text) and clear visual focus indicators.
- **Level AAA (Enhanced):** The highest standard of specialized accessibility. It demands stringent contrast ratios of 7:1 for normal text (4.5:1 for large text), sign language interpretation for audio, and comprehensive error prevention.

---

### 7. Discuss the importance of semantic HTML in the context of accessibility.
Semantic HTML provides assistive technologies (screen readers, braille displays) with an inherent accessibility tree, communicating the role, state, and structure of content without custom ARIA scripting.
Using `<button>` rather than `<div onClick>` automatically provides native keyboard accessibility (Tab focus and Enter/Space actuation) and informs screen readers that an element is actionable. Similarly, correct header hierarchy (`<h1>` through `<h6>`) enables screen-reader users to skim page landmarks. Semantic elements drastically reduce code complexity while guaranteeing consistent native browser behavior across assistive devices.

---

### 8. How do you handle design handoff to developers using Figma?
We treat Figma and the codebase as a synchronized single source of truth using Figma Variables and automated Design Token pipelines. 
Rather than handing off static redline mockups with hardcoded hex codes and pixel spacings, we define variables in Figma collections (Primitives, Semantic Roles). Developers and designers agree on a shared token schema exported as JSON via automated plugins. Scripts like `convert-tokens-to-css.js` convert that JSON directly into production CSS variables. 
During handoff, developers inspect components in Dev Mode to see semantic token names (e.g., `var(--color-primary)`), eliminating manual color guessing and discrepancies.

---

### 9. Why do AI-generated interfaces tend to look generic, and what specifically do you hand an agent to stop it?
AI models generate generic interfaces because their training distributions are dominated by generic Material Design templates, Tailwind defaults, and standard bootstrap aesthetics. When asked to "build a screen," the agent predicts the highest-probability tokens—resulting in muted slate backgrounds, standard purple CTA buttons, and standard 16px border radiuses.
To stop this, we hand the agent a strict, non-negotiable **Design Token Manifest** (`tokens.css`) paired with an architectural rule file:
1. Banning raw hex codes and raw pixel sizes.
2. Forcing the use of brand-specific semantic variables (`--color-primary`, `--type-display-large`).
3. Explicitly instructing it to use our specific fonts (Noto Sans and Poppins) and brand-tinted elevation shadows.

---

### 10. Your line height for display large is a specific number. Why that number and not one step either side of it? What would you lose with each?
Our line height for Display Large (font size 64px) is set to **96px** ($1.50\times$).
- **One step tighter (e.g. 1.40x / ~89.6px):** When large event headings wrap across multiple lines on a narrow 375px mobile screen, ascenders (like 'd' and 'h') collide with descenders (like 'g' and 'p') from the line above. This visual crowding slows word recognition for attendees rushing through venue gates.
- **One step looser (e.g. 1.60x / ~102.4px):** A 1.60 multiplier separates multi-line headings too broadly, breaking typographic cohesion so that the two lines appear as unrelated chunks of text rather than a single title, pushing the event pass below the mobile fold.
At 96px, the title maintains solid visual grouping while breathing comfortably.

---

### 11. Point at one place in your own token structure that you would build differently if you started again. Say what you would do instead and what it would cost.
If starting again, I would separate surface tokens by elevation level rather than relying on a single `--color-surface` paired with variant tokens. 
Currently, `--color-surface` defaults to pure white in the token set, requiring components to manually manage dark-mode inversions via `--color-inverse-surface` or `--primitive-neutral-10`. Instead, I would build an explicit elevation stack: `--color-surface-base`, `--color-surface-raised`, and `--color-surface-overlay`.
The cost of doing this now is a breaking token refactor: every existing card, modal, and pass container across the application would need its class references audited and migrated, and all designer variable bindings in Figma would have to be restructured.

---

### 12. Wrong-answer analysis: "I set up design tokens by exporting the hex values from Figma into a CSS file, so every colour in the codebase comes from one place. That makes it a single source of truth." Say precisely what is missing and what will go wrong in month four.
What is completely missing is the **semantic abstraction layer** (Color Roles). The candidate exported only primitive hex values (`--primary-green: #00ff66`, `--card-background: #ffffff`), conflating the *palette* with the *interface role*.
In month four, two disasters occur:
1. **Theming/Dark Mode Failure:** When marketing requests a dark mode or an event creator requests custom branding, developers cannot simply remap a role. If a button and a border both reference `--primary-green`, changing it for the button breaks the border.
2. **Brittle Refactoring:** If the brand evolves and the primary color changes from green to amber, developers find that "primary-green" is referenced in hundreds of CSS files, forcing a dangerous search-and-replace that inevitably leaves orphaned styles and broken contrast.

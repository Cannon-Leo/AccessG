# Task 01: The Design System, and Proving the Agent Used It

## What This Task Is
This task defines the design tokens for AccessG—covering colors, typography, and shadows built specifically for a high-contrast dark-mode ticketing app operating under challenging venue conditions. It exports tokens from Figma as JSON, converts them to CSS variables through agent instructions, and proves that an agent consumes these tokens rather than hallucinating raw values.

## Deliverables
- `docs/business-brief.md`: Business concept, user demographic, primary core requirement, repeated questions, and aesthetic rationale (239 words, under 400-word limit).
- `docs/colour-roles.md`: Semantic color roles, tonal mappings, and WCAG AA/AAA contrast ratios.
- `docs/type-scale.md`: Complete 15-style typography scale with calculated line-heights and letter-spacings.
- `docs/shadows.md`: 3 brand-tinted elevation shadows and mathematical rationale.
- `docs/divergences.md`: 2 deliberate divergences from Material baseline and failure edge-cases.
- `docs/prompts.md`: Verbatim prompts used for token-to-CSS conversion and screen generation.
- `docs/defects.md`: Named defects in this design system phase and their cost in production.
- `docs/interview-answers.md`: Defense answers for Questions 1–12.

## Evidence Checklist
- [ ] `evidence/01-palette-before-pin.png`: Palette before pinning Primary 40.
- [ ] `evidence/02-palette-after-pin.png`: Palette after pinning Primary 40.
- [ ] `evidence/03-spacing-default.png`: Display Large with default letter spacing.
- [ ] `evidence/04-spacing-chosen.png`: Display Large with chosen compact letter spacing.
- [ ] `evidence/05-tokens-incomplete.json`: Token export deliberately omitting Figma variables.
- [ ] `evidence/06-tokens-complete.json`: Complete token export including color variables.
- [ ] `evidence/07-raw-value-search.txt`: Terminal search proving zero raw color values in UI code.
- [ ] `evidence/08-agent-typography-answer.txt`: Agent's verification response for specific typography style.
- [ ] `evidence/09-screen-without-system.png`: Component built without design tokens.
- [ ] `evidence/10-screen-with-system.png`: Component built strictly with design tokens.
- [ ] `evidence/11-broken-referencing.png`: Deliberate regression where broken reference fails to adapt.
- [ ] `evidence/12-git-log-branch-unmerged.txt`: Git log confirming regression branch deleted unmerged.


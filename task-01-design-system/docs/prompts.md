# AccessG Task 01: Agent Prompts & Iterations

This document logs the verbatim prompts used to instruct the coding agent to convert Figma tokens into CSS variables and build the proof screen, detailing what worked, what failed, and how the prompts were adjusted.

---

## 1. Prompt 1: Token to CSS Variable Converter Script

### Initial Prompt (Draft)
```text
Convert the tokens in AccessG-design-tokens.tokens.json to CSS variables and write a CSS file.
```

### Why It Failed / Deficiencies:
- The agent exported both primitive colors (`--primitive-primary-40`) and semantic roles as interchangeable variables without enforcing separation.
- It attempted to use raw hex codes directly in the generated output rather than maintaining token alias chains (`{primitives.color palattes.primary.primary 40}`).
- It ignored font-size to rem unit conversion and line-height multiplier derivations.

---

### Final Refined Prompt (Used Verbatim)
```text
Write a Javascript script (convert-tokens-to-css.js) that converts the design tokens in AccessG-design-tokens.tokens.json into a production CSS variables stylesheet in task-01-design-system/tokens.css.

Architectural Rules to Enforce:
1. The design system is the single source of truth.
2. Compile primitive colors into private variables (--primitive-*) for internal alias resolution only.
3. Compile Color Roles into public semantic variables (--color-*) which are the ONLY color variables permitted for UI components. Color roles must reference primitive variables via var(--primitive-*, fallback).
4. Extract all 15 typography roles into structured variables (--type-[role]-[variant]-[property]) converting px font sizes to rem units (based on 16px root).
5. Extract the 3 elevation shadows (--shadow-soft-shadow, --shadow-medium-shadow, --shadow-hard-shadow) retaining their brand-tinted RGB/RGBA values.
6. Log a clean confirmation upon completion.
```

### What Changed and Why:
- Explicit architectural boundary separating primitive palettes from interface roles.
- Enforced `var(--primitive-*, fallback)` referencing so that changes to palette seeds automatically propagate to all UI color roles.
- Defined explicit naming convention (`--type-[role]-[size]-[prop]`) ensuring zero ambiguity when consuming styles in React/Next.js components.

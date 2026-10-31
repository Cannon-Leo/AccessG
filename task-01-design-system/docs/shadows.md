# AccessG Shadow System: Primary Brand Elevation

This document defines the 3-tier elevation shadow system for AccessG, derived from [`AccessG-design-tokens.tokens.json`](file:///c:/Users/CANNONLEO/OneDrive/Documents/Project%20Engineering%20lessons/AccessG/AccessG-design-tokens.tokens.json).

---

## 1. Specification Table

| Shadow Level | Token Name | X-Offset | Y-Offset | Blur (Radius) | Spread | Color & Opacity | CSS Variable Output | Intended UI Job |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Soft Shadow** | `soft shadow` | 1.5px | 6px | 30px | 0px | `#00ff66` at **12%** (`rgba(0, 255, 102, 0.12)`) | `--shadow-soft-shadow` | Resting event cards, pass cards, input containers. |
| **Medium Shadow** | `medium shadow` | 4.0px | 6px | 24px | 0px | `#00ff66` at **18%** (`rgba(0, 255, 102, 0.18)`) | `--shadow-medium-shadow` | Hovered cards, floating checkout CTA, active filter chips. |
| **Hard Shadow** | `hard shadow` | 6.0px | 10px | 20px | 0px | `#00ff66` at **22%** (`rgba(0, 255, 102, 0.22)`) | `--shadow-hard-shadow` | Modal dialogs, QR expansion HUD, gate scan verification toast. |

---

## 2. Why Brand-Tinted Shadows Read Differently From Black Shadows

A shadow built from the brand color (`#00ff66`) reads as an ambient optical glow emitting from a physical light source, creating perceived depth and electrical energy on high-contrast dark surfaces. 

In contrast, pure black (`#000000`) shadows on dark UI themes simply disappear into adjacent dark surfaces or create dirty, muddy borders that flatten hierarchy rather than elevating content.

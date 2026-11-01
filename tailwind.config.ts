import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic M3 Color Roles directly mapped to CSS Variables
        primary: "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",
        "primary-container": "var(--color-primary-container)",
        "on-primary-container": "var(--color-on-primary-container)",
        "primary-fixed": "var(--color-primary-fixed)",
        "on-primary-fixed": "var(--color-on-primary-fixed)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "inverse-primary": "var(--color-inverse-primary)",

        secondary: "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",
        "secondary-container": "var(--color-secondary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",

        tertiary: "var(--color-tertiary)",
        "on-tertiary": "var(--color-on-tertiary)",
        "tertiary-container": "var(--color-tertiary-container)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",

        accent: "var(--primitive-accent-40, #00e5ff)",
        "accent-container": "var(--primitive-accent-90, #e0fdff)",

        error: "var(--color-error)",
        "on-error": "var(--color-on-error)",
        "error-container": "var(--color-error-container)",
        "on-error-container": "var(--color-on-error-container)",

        surface: "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
        "surface-variant": "var(--color-surface-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-bright": "var(--color-surface-bright)",
        "surface-dim": "var(--color-surface-dim)",
        "inverse-surface": "var(--color-inverse-surface)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",

        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        background: "var(--color-background)",
        "on-background": "var(--color-on-background)",
        scrim: "var(--color-scrim)",
        shadow: "var(--color-shadow)",
      },
      fontFamily: {
        headline: ["var(--type-headline-large-font-family)", "Noto Sans", "sans-serif"],
        display: ["var(--type-display-large-font-family)", "Noto Sans", "sans-serif"],
        body: ["var(--type-body-large-font-family)", "Poppins", "sans-serif"],
        label: ["var(--type-label-large-font-family)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        "soft-shadow": "var(--shadow-soft-shadow)",
        "medium-shadow": "var(--shadow-medium-shadow)",
        "hard-shadow": "var(--shadow-hard-shadow)",
        "glow-accent": "0 0 20px rgba(0, 229, 255, 0.45)",
        "glow-primary": "0 0 25px rgba(0, 255, 102, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

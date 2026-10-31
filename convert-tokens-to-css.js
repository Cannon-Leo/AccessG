/**
 * convert-tokens-to-css.js
 * 
 * Converts AccessG Figma Design Tokens JSON (AccessG-design-tokens.tokens.json)
 * into a production CSS variables stylesheet.
 * 
 * Architectural Rules Enforced:
 * 1. Tokens are the single source of truth.
 * 2. Primitives are compiled into private variables (--primitive-*) for token referencing.
 * 3. Color Roles are compiled into public semantic variables (--color-*) which are the
 *    ONLY color variables permitted for use in UI components.
 * 4. Typography styles (15 roles) are compiled into composite font utility tokens.
 * 5. Elevation shadow styles are compiled into brand-tinted box-shadow variables.
 */

const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.resolve(__dirname, 'AccessG-design-tokens.tokens.json');
const OUTPUT_CSS_PATH = path.resolve(__dirname, 'task-01-design-system', 'tokens.css');

if (!fs.existsSync(TOKENS_PATH)) {
  console.error(`Error: Tokens file not found at ${TOKENS_PATH}`);
  process.exit(1);
}

const rawTokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));

// Helper: Normalize token names to CSS variable kebab-case
function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}

// Helper: Resolve Figma token aliases like "{primitives.color palattes.primary.primary 40}"
function resolveAlias(aliasStr, tokensObj) {
  if (typeof aliasStr !== 'string' || !aliasStr.startsWith('{') || !aliasStr.endsWith('}')) {
    return aliasStr;
  }
  const cleanPath = aliasStr.slice(1, -1);
  const parts = cleanPath.split('.');
  let current = tokensObj;
  for (const part of parts) {
    if (!current) return null;
    current = current[part];
  }
  if (current && current.value) {
    if (typeof current.value === 'string' && current.value.startsWith('{')) {
      return resolveAlias(current.value, tokensObj);
    }
    return current.value;
  }
  return null;
}

// Convert 8-digit hex (#rrggbbaa) to standard css rgba() or hex
function formatCssColor(hex) {
  if (!hex || typeof hex !== 'string') return hex;
  if (hex.length === 9 && hex.startsWith('#')) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = (parseInt(hex.slice(7, 9), 16) / 255).toFixed(2);
    if (parseFloat(a) === 1) {
      return `#${hex.slice(1, 7)}`;
    }
    return `rgba(${r}, ${g}, ${b}, ${parseFloat(a)})`;
  }
  return hex;
}

let css = `/**
 * AccessG Design System - Production CSS Variables
 * Generated automatically from AccessG-design-tokens.tokens.json
 * 
 * IMPORTANT:
 * - Do NOT use --primitive-* variables directly in application UI.
 * - ALWAYS use --color-* (Color Roles) for background, text, and border styling.
 */

:root {
  /* ==========================================================================
     1. PRIMITIVE PALETTES (Raw Palette Seeds - For Internal Token Alias Use)
     ========================================================================== */
`;

// 1. Primitive key colors
if (rawTokens.primitives && rawTokens.primitives['key colors']) {
  css += `  /* Key Brand Seeds */\n`;
  for (const [key, val] of Object.entries(rawTokens.primitives['key colors'])) {
    const varName = `--primitive-key-${toKebabCase(key)}`;
    css += `  ${varName}: ${formatCssColor(val.value)};\n`;
  }
}

// 1b. Primitive color palettes (Tonal palettes)
if (rawTokens.primitives && rawTokens.primitives['color palattes']) {
  css += `\n  /* Tonal Swatches */\n`;
  for (const [paletteGroup, tones] of Object.entries(rawTokens.primitives['color palattes'])) {
    for (const [toneName, val] of Object.entries(tones)) {
      const varName = `--primitive-${toKebabCase(toneName)}`;
      css += `  ${varName}: ${formatCssColor(val.value)};\n`;
    }
  }
}

// 2. Semantic Color Roles
css += `
  /* ==========================================================================
     2. COLOR ROLES (Semantic Interface Tokens - Single Source of Truth for UI)
     ========================================================================== */
`;

if (rawTokens['color roles']) {
  for (const [roleName, val] of Object.entries(rawTokens['color roles'])) {
    const roleVarName = `--color-${toKebabCase(roleName)}`;
    const alias = val.value;
    const resolvedValue = resolveAlias(alias, rawTokens);

    // If alias is a primitive tone, map to primitive CSS var, with fallback to resolved hex
    let primitiveVarRef = '';
    if (typeof alias === 'string' && alias.startsWith('{')) {
      const parts = alias.slice(1, -1).split('.');
      const toneKey = parts[parts.length - 1];
      primitiveVarRef = `var(--primitive-${toKebabCase(toneKey)}, ${formatCssColor(resolvedValue)})`;
    } else {
      primitiveVarRef = formatCssColor(resolvedValue);
    }

    css += `  ${roleVarName}: ${primitiveVarRef};\n`;
  }
}

// 3. Typography Styles (15 Roles)
css += `
  /* ==========================================================================
     3. TYPOGRAPHY SYSTEM (Display, Headline, Title, Body, Label)
     ========================================================================== */
`;

if (rawTokens.font) {
  for (const [styleName, val] of Object.entries(rawTokens.font)) {
    const s = toKebabCase(styleName);
    const fontData = val.value;
    css += `  /* ${styleName} */\n`;
    css += `  --type-${s}-font-family: "${fontData.fontFamily}", sans-serif;\n`;
    css += `  --type-${s}-weight: ${fontData.fontWeight};\n`;
    css += `  --type-${s}-size: ${(fontData.fontSize / 16).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}rem;\n`;
    css += `  --type-${s}-line-height: ${(fontData.lineHeight / fontData.fontSize).toFixed(2)};\n`;
    css += `  --type-${s}-letter-spacing: ${(fontData.letterSpacing / 16).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}rem;\n`;
  }
}

// 4. Shadow System (Brand-tinted drop shadows)
css += `
  /* ==========================================================================
     4. SHADOW SYSTEM (Elevation Shadows Built From Primary Brand Hue)
     ========================================================================== */
`;

if (rawTokens.effect) {
  for (const [effectName, val] of Object.entries(rawTokens.effect)) {
    const shadowName = toKebabCase(effectName);
    const s = val.value;
    const colorFormatted = formatCssColor(s.color);
    css += `  --shadow-${shadowName}: ${s.offsetX}px ${s.offsetY}px ${s.radius}px ${s.spread}px ${colorFormatted};\n`;
  }
}

css += `}\n`;

fs.writeFileSync(OUTPUT_CSS_PATH, css, 'utf8');
console.log(`Success: Generated ${OUTPUT_CSS_PATH}`);


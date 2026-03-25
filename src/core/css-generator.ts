/**
 * shadcn-theme-kit - CSS Generator
 *
 * Generates CSS variables for shadcn/ui compatibility.
 * Safe string building - no template injection.
 *
 * Author: Sohel Rahaman
 */

import type { ColorPalette, ThemeConfig, ResolvedMode } from "./types";

/**
 * CSS variable name mapping for shadcn colors
 */
const CSS_VAR_MAP: Record<keyof ColorPalette, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
};

/**
 * Escapes a string for safe CSS value usage
 */
function escapeCssValue(value: string): string {
  // Remove any characters that could break CSS
  return value.replace(/[;<>{}]/g, "");
}

/**
 * Generates CSS variables from a color palette
 */
function generatePaletteVars(palette: ColorPalette): string {
  const lines: string[] = [];

  const keys = Object.keys(CSS_VAR_MAP) as (keyof ColorPalette)[];

  for (const key of keys) {
    const cssVar = CSS_VAR_MAP[key];
    const value = palette[key];
    const safeValue = escapeCssValue(value);
    lines.push(`  ${cssVar}: ${safeValue};`);
  }

  return lines.join("\n");
}

/**
 * Generates complete CSS for a theme.
 * Uses textContent (not innerHTML) for safe injection.
 *
 * @param theme - Theme configuration
 * @param mode - Current resolved mode
 * @returns CSS string
 */
export function generateThemeCSS(
  theme: ThemeConfig,
  mode: ResolvedMode
): string {
  const palette = mode === "dark" ? theme.dark : theme.light;
  const paletteVars = generatePaletteVars(palette);
  const safeRadius = escapeCssValue(theme.radius);

  // Generate CSS
  const css = `:root {
${paletteVars}
  --radius: ${safeRadius};
}`;

  return css;
}

/**
 * Generates CSS for both light and dark modes.
 * Used when supporting system preference.
 *
 * @param theme - Theme configuration
 * @returns CSS string with light and dark mode support
 */
export function generateDualModeCSS(theme: ThemeConfig): string {
  const lightVars = generatePaletteVars(theme.light);
  const darkVars = generatePaletteVars(theme.dark);
  const safeRadius = escapeCssValue(theme.radius);

  const css = `:root {
${lightVars}
  --radius: ${safeRadius};
}

.dark {
${darkVars}
}`;

  return css;
}

/**
 * ID for the injected style element
 */
export const STYLE_ELEMENT_ID = "shadcn-theme-kit-styles";

/**
 * Safely injects CSS into the document head.
 * Uses textContent (safe) instead of innerHTML (unsafe).
 *
 * @param css - CSS string to inject
 */
export function injectCSS(css: string): void {
  if (typeof document === "undefined") return;

  // Find existing style element or create new one
  let styleElement = document.getElementById(
    STYLE_ELEMENT_ID
  ) as HTMLStyleElement | null;

  if (styleElement === null) {
    styleElement = document.createElement("style");
    styleElement.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleElement);
  }

  // Safe: textContent doesn't parse HTML
  styleElement.textContent = css;
}

/**
 * Removes the injected CSS from the document.
 */
export function removeCSS(): void {
  if (typeof document === "undefined") return;

  const styleElement = document.getElementById(STYLE_ELEMENT_ID);
  if (styleElement !== null) {
    styleElement.remove();
  }
}

/**
 * Generates the complete globals.css CSS block for all provided themes.
 * Users call this once and paste the output into their globals.css.
 * This is the ONLY correct way to use shadcn-theme-kit with Tailwind v4 —
 * all CSS variable values must be in the CSS cascade, not injected by JS.
 *
 * Usage in your app:
 *   import { presets, generateGlobalCSS } from 'shadcn-theme-kit';
 *   console.log(generateGlobalCSS(Object.values(presets)));
 *   // paste output into globals.css
 */
export function generateGlobalCSS(themes: readonly ThemeConfig[]): string {
  const blocks: string[] = [];

  for (const theme of themes) {
    const lightVars = Object.entries(CSS_VAR_MAP)
      .map(([key, cssVar]) => {
        const value = theme.light[key as keyof ColorPalette];
        return value ? `  ${cssVar}: ${escapeCssValue(value)};` : null;
      })
      .filter(Boolean)
      .join("\n");

    const darkVars = Object.entries(CSS_VAR_MAP)
      .map(([key, cssVar]) => {
        const value = theme.dark[key as keyof ColorPalette];
        return value ? `  ${cssVar}: ${escapeCssValue(value)};` : null;
      })
      .filter(Boolean)
      .join("\n");

    blocks.push(
      `/* ${theme.name} theme */\n[data-theme="${theme.name}"] {\n${lightVars}\n  --radius: ${escapeCssValue(theme.radius)};\n}\n[data-theme="${theme.name}"].dark, [data-theme="${theme.name}"] .dark {\n${darkVars}\n}`
    );
  }

  return blocks.join("\n\n");
}

/**
 * shadcn-theme-kit - Create Theme
 *
 * Factory function to create theme configurations.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig, CreateThemeInput, ColorPalette } from "./types";
import { parseColor } from "./color-parser";

/**
 * Default border radius
 */
const DEFAULT_RADIUS = "0.5rem";

/**
 * Validates and sanitizes a color palette
 */
function sanitizePalette(
  palette: ColorPalette,
  paletteName: string
): ColorPalette {
  const sanitized: Record<string, string> = {};

  const keys: (keyof ColorPalette)[] = [
    "background",
    "foreground",
    "card",
    "cardForeground",
    "popover",
    "popoverForeground",
    "primary",
    "primaryForeground",
    "secondary",
    "secondaryForeground",
    "muted",
    "mutedForeground",
    "accent",
    "accentForeground",
    "destructive",
    "destructiveForeground",
    "border",
    "input",
    "ring",
  ];

  for (const key of keys) {
    const value = palette[key];
    const parsed = parseColor(value);

    if (parsed === null) {
      throw new Error(
        `Invalid color value for "${key}" in ${paletteName} palette: "${value}"`
      );
    }

    sanitized[key] = parsed;
  }

  return Object.freeze(sanitized) as ColorPalette;
}

/**
 * Validates theme name
 */
function validateThemeName(name: string): string {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Theme name must be a non-empty string");
  }

  const trimmed = name.trim();

  // Only allow safe characters for localStorage key
  const safePattern = /^[a-zA-Z0-9_-]+$/;
  if (!safePattern.test(trimmed)) {
    throw new Error(
      "Theme name must only contain letters, numbers, underscores, and hyphens"
    );
  }

  return trimmed;
}

/**
 * Creates a validated, immutable theme configuration.
 *
 * @param input - Theme configuration input
 * @returns Frozen ThemeConfig object
 *
 * @example
 * ```ts
 * const myTheme = createTheme({
 *   name: 'my-app',
 *   light: {
 *     primary: '#2563eb',
 *     background: '#ffffff',
 *     // ... other colors
 *   },
 *   dark: {
 *     primary: '#3b82f6',
 *     background: '#0a0a0a',
 *     // ... other colors
 *   }
 * });
 * ```
 */
export function createTheme(input: CreateThemeInput): ThemeConfig {
  const name = validateThemeName(input.name);
  const light = sanitizePalette(input.light, "light");
  const dark = sanitizePalette(input.dark, "dark");
  const radius = input.radius ?? DEFAULT_RADIUS;

  const theme: ThemeConfig = {
    name,
    light,
    dark,
    radius,
  };

  return Object.freeze(theme);
}

/**
 * Merges a partial palette with a complete palette.
 * Used for preset overrides.
 */
export function mergePalettes(
  base: ColorPalette,
  overrides: Partial<ColorPalette>
): ColorPalette {
  const merged: Record<string, string> = { ...base };

  for (const key of Object.keys(overrides) as (keyof ColorPalette)[]) {
    const value = overrides[key];
    if (value !== undefined) {
      const parsed = parseColor(value);
      if (parsed !== null) {
        merged[key] = parsed;
      }
    }
  }

  return Object.freeze(merged) as ColorPalette;
}

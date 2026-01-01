/**
 * shadcn-theme-kit
 *
 * Easy theme configuration for React + shadcn with light/dark mode,
 * preset themes, and CSS variables.
 *
 * Author: Sohel Rahaman
 * License: MIT
 */

// Core
export type {
  ThemeMode,
  ResolvedMode,
  ColorPalette,
  PartialColorPalette,
  ThemeConfig,
  CreateThemeInput,
  CreateThemeFromSchemeInput,
  PresetName,
  ThemeProviderProps,
  ThemeContextValue,
} from "./core";

export {
  createTheme,
  mergePalettes,
  parseColor,
  validateColorPalette,
  generateThemeCSS,
  generateDualModeCSS,
} from "./core";

// Presets
export {
  presets,
  getPreset,
  presetNames,
  defaultPreset,
  bluePreset,
  rosePreset,
  emeraldPreset,
  orangePreset,
  violetPreset,
  slatePreset,
} from "./presets";

// React
export {
  ThemeContext,
  ThemeProvider,
  useTheme,
  useThemeMode,
  useResolvedMode,
  useCurrentTheme,
  useIsDarkMode,
  useAvailableThemes,
} from "./react";

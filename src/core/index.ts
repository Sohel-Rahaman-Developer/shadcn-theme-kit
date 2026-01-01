/**
 * shadcn-theme-kit - Core Module
 *
 * Pure TypeScript theme configuration engine.
 * Zero dependencies.
 *
 * Author: Sohel Rahaman
 */

// Types
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
} from "./types";

// Color Parser
export { parseColor, validateColorPalette } from "./color-parser";

// Create Theme
export { createTheme, mergePalettes } from "./create-theme";

// CSS Generator
export {
  generateThemeCSS,
  generateDualModeCSS,
  injectCSS,
  removeCSS,
  STYLE_ELEMENT_ID,
} from "./css-generator";

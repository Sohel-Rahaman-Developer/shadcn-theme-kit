/**
 * shadcn-theme-kit - React Module
 *
 * React components and hooks for theme management.
 * Author: Sohel Rahaman
 */

// Context
export { ThemeContext } from "./context";

// Provider
export { ThemeProvider } from "./provider";

// Hooks
export {
  useTheme,
  useThemeMode,
  useResolvedMode,
  useCurrentTheme,
  useIsDarkMode,
  useAvailableThemes,
} from "./hooks";

// Script
export { ThemeScript } from "./theme-script";

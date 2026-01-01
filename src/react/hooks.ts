/**
 * shadcn-theme-kit - React Hooks
 *
 * Custom hooks for theme management.
 * Author: Sohel Rahaman
 */

"use client";

import { useContext } from "react";
import { ThemeContext } from "./context";
import type {
  ThemeContextValue,
  ThemeMode,
  ResolvedMode,
  ThemeConfig,
} from "../core/types";

/**
 * Hook to access the full theme context.
 *
 * @returns ThemeContextValue with all theme controls
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { mode, setMode, toggleMode, theme, themes, setTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleMode}>
 *       Current: {mode}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  return context;
}

/**
 * Hook to get only the current mode.
 *
 * @returns Current mode ('light' | 'dark' | 'system')
 */
export function useThemeMode(): ThemeMode {
  const { mode } = useContext(ThemeContext);
  return mode;
}

/**
 * Hook to get the resolved mode (actual applied mode).
 *
 * @returns Resolved mode ('light' | 'dark')
 */
export function useResolvedMode(): ResolvedMode {
  const { resolvedMode } = useContext(ThemeContext);
  return resolvedMode;
}

/**
 * Hook to get the current theme configuration.
 *
 * @returns Current ThemeConfig
 */
export function useCurrentTheme(): ThemeConfig {
  const { theme } = useContext(ThemeContext);
  return theme;
}

/**
 * Hook to check if dark mode is active.
 *
 * @returns true if dark mode is active
 *
 * @example
 * ```tsx
 * function Logo() {
 *   const isDark = useIsDarkMode();
 *   return <img src={isDark ? '/logo-dark.png' : '/logo-light.png'} />;
 * }
 * ```
 */
export function useIsDarkMode(): boolean {
  const { resolvedMode } = useContext(ThemeContext);
  return resolvedMode === "dark";
}

/**
 * Hook to get available themes (for theme switcher).
 *
 * @returns Array of available themes
 */
export function useAvailableThemes(): readonly ThemeConfig[] {
  const { themes } = useContext(ThemeContext);
  return themes;
}

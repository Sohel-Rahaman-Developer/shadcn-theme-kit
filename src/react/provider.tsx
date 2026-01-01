/**
 * shadcn-theme-kit - Theme Provider
 *
 * React provider component for theme management.
 * Author: Sohel Rahaman
 */

"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ThemeContext } from "./context";
import type {
  ThemeConfig,
  ThemeMode,
  ResolvedMode,
  ThemeProviderProps,
  ThemeContextValue,
} from "../core/types";
import {
  generateDualModeCSS,
  injectCSS,
  removeCSS,
} from "../core/css-generator";
import {
  getPersistedMode,
  setPersistedMode,
  getPersistedTheme,
  setPersistedTheme,
} from "../utils/storage";
import { presets } from "../presets";

/**
 * Get system color scheme preference
 */
function getSystemMode(): ResolvedMode {
  if (typeof window === "undefined") return "light";

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

/**
 * Resolve mode to actual light/dark
 */
function resolveMode(mode: ThemeMode): ResolvedMode {
  if (mode === "system") {
    return getSystemMode();
  }
  return mode;
}

/**
 * Apply dark class to document
 */
function applyDarkClass(resolved: ResolvedMode): void {
  if (typeof document === "undefined") return;

  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

/**
 * Theme Provider Component
 *
 * @example
 * ```tsx
 * import { ThemeProvider, presets } from 'shadcn-theme-kit';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={presets.blue}>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  theme,
  themes: themesArray,
  defaultTheme,
  defaultMode = "system",
  storageKey,
  children,
}: ThemeProviderProps): React.ReactElement {
  // Resolve themes array
  const themes: readonly ThemeConfig[] = useMemo(() => {
    if (themesArray && themesArray.length > 0) {
      return themesArray;
    }
    if (theme) {
      return [theme];
    }
    // Default to default preset if nothing provided
    return [presets.default];
  }, [theme, themesArray]);

  // Get initial theme
  const getInitialTheme = useCallback((): ThemeConfig => {
    const firstTheme = themes[0];
    if (!firstTheme) return presets.default;

    if (typeof window === "undefined") {
      if (defaultTheme) {
        const found = themes.find((t) => t.name === defaultTheme);
        return found ?? firstTheme;
      }
      return firstTheme;
    }

    // Check persisted theme
    const baseKey = storageKey ?? firstTheme.name;
    const persistedThemeName = getPersistedTheme(baseKey);

    if (persistedThemeName) {
      const found = themes.find((t) => t.name === persistedThemeName);
      if (found) return found;
    }

    if (defaultTheme) {
      const found = themes.find((t) => t.name === defaultTheme);
      return found ?? firstTheme;
    }

    return firstTheme;
  }, [themes, defaultTheme, storageKey]);

  // Get initial mode
  const getInitialMode = useCallback((): ThemeMode => {
    if (typeof window === "undefined") return defaultMode;

    const firstTheme = themes[0];
    const baseKey = storageKey ?? firstTheme?.name ?? "theme";
    const persisted = getPersistedMode(baseKey);

    return persisted ?? defaultMode;
  }, [themes, defaultMode, storageKey]);

  // State
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(getInitialTheme);
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [resolvedMode, setResolvedMode] = useState<ResolvedMode>(() =>
    resolveMode(getInitialMode())
  );

  // Storage key for persistence
  const baseStorageKey = storageKey ?? activeTheme.name;

  // Set mode handler
  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      setPersistedMode(baseStorageKey, newMode);
    },
    [baseStorageKey]
  );

  // Toggle mode handler
  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const newMode = current === "light" ? "dark" : "light";
      setPersistedMode(baseStorageKey, newMode);
      return newMode;
    });
  }, [baseStorageKey]);

  // Set theme handler
  const setTheme = useCallback(
    (themeName: string) => {
      const found = themes.find((t) => t.name === themeName);
      if (found) {
        setActiveTheme(found);
        setPersistedTheme(baseStorageKey, themeName);
      }
    },
    [themes, baseStorageKey]
  );

  // Update resolved mode when mode changes
  useEffect(() => {
    const resolved = resolveMode(mode);
    setResolvedMode(resolved);
    applyDarkClass(resolved);
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    if (mode !== "system") return;
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setResolvedMode(resolved);
      applyDarkClass(resolved);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  // Inject CSS when theme changes
  useEffect(() => {
    const css = generateDualModeCSS(activeTheme);
    injectCSS(css);

    return () => {
      // Don't remove on cleanup to prevent flash
    };
  }, [activeTheme]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeCSS();
    };
  }, []);

  // Context value
  const contextValue: ThemeContextValue = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode,
      toggleMode,
      theme: activeTheme,
      themes,
      setTheme,
    }),
    [mode, resolvedMode, setMode, toggleMode, activeTheme, themes, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

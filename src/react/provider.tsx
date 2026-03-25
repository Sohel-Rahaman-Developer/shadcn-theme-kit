/**
 * shadcn-theme-kit - Theme Provider
 *
 * React provider component for theme management.
 * Author: Sohel Rahaman
 */

"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { ThemeContext } from "./context";
import type {
  ThemeConfig,
  ThemeMode,
  ResolvedMode,
  ThemeProviderProps,
  ThemeContextValue,
} from "../core/types";
import {} from "../core/css-generator";
import {
  getPersistedMode,
  setPersistedMode,
  getPersistedTheme,
  setPersistedTheme,
} from "../utils/storage";
import { setThemeCookies } from "../utils/cookies";
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
// Only touches DOM if state differs — prevents undoing ThemeScript's work
function applyDarkClass(resolved: ResolvedMode): void {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  const hasDark = el.classList.contains("dark");
  if (resolved === "dark" && !hasDark) {
    el.classList.add("dark");
    el.style.colorScheme = "dark";
  } else if (resolved === "light" && hasDark) {
    el.classList.remove("dark");
    el.style.colorScheme = "light";
  }
}

// Sets data-theme attribute — CSS file handles all variable values
function applyDataTheme(themeName: string): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", themeName);
}

export function ThemeProvider({
  theme,
  themes: themesArray,
  defaultTheme,
  defaultMode = "system",
  initialMode,
  initialTheme,
  storageKey,
  children,
}: ThemeProviderProps): React.ReactElement {
  const themes: readonly ThemeConfig[] = useMemo(() => {
    if (themesArray && themesArray.length > 0) return themesArray;
    if (theme) return [theme];
    return [presets.default];
  }, [theme, themesArray]);

  const baseStorageKey = useMemo(
    () => storageKey ?? "shadcn-theme-kit",
    [storageKey]
  );

  const getInitialTheme = useCallback((): ThemeConfig => {
    const firstTheme = themes[0];
    if (!firstTheme) return presets.default;
    if (initialTheme) {
      const found = themes.find((t) => t.name === initialTheme);
      if (found) return found;
    }
    if (typeof window === "undefined") {
      if (defaultTheme) {
        const found = themes.find((t) => t.name === defaultTheme);
        return found ?? firstTheme;
      }
      return firstTheme;
    }
    const persistedThemeName = getPersistedTheme(baseStorageKey);
    if (persistedThemeName) {
      const found = themes.find((t) => t.name === persistedThemeName);
      if (found) return found;
    }
    if (defaultTheme) {
      const found = themes.find((t) => t.name === defaultTheme);
      return found ?? firstTheme;
    }
    return firstTheme;
  }, [themes, defaultTheme, initialTheme, baseStorageKey]);

  const getInitialMode = useCallback((): ThemeMode => {
    if (initialMode) return initialMode;
    if (typeof window === "undefined") return defaultMode;
    const persisted = getPersistedMode(baseStorageKey);
    return persisted ?? defaultMode;
  }, [defaultMode, initialMode, baseStorageKey]);

  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(getInitialTheme);
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  // Read initial resolvedMode from DOM (set by ThemeScript) — not from React state
  // This prevents the "light" SSR default from causing a flash
  const [resolvedMode, setResolvedMode] = useState<ResolvedMode>(() => {
    if (typeof document === "undefined") {
      const m = initialMode ?? defaultMode;
      return m === "system" ? "light" : (m as ResolvedMode);
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  const isMounted = useRef(false);

  // On first mount: sync React state to DOM (ThemeScript already set it correctly).
  // Do NOT touch the DOM — only read from it.
  // On subsequent mode changes: resolve and apply normally.
  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const domResolved: ResolvedMode =
        document.documentElement.classList.contains("dark") ? "dark" : "light";
      if (domResolved !== resolvedMode) setResolvedMode(domResolved);
      return;
    }
    const resolved = resolveMode(mode);
    setResolvedMode(resolved);
    applyDarkClass(resolved);
  }, [mode]);

  // Apply data-theme attribute when active theme changes
  useLayoutEffect(() => {
    applyDataTheme(activeTheme.name);
  }, [activeTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (mode !== "system" || typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setResolvedMode(resolved);
      applyDarkClass(resolved);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      setPersistedMode(baseStorageKey, newMode);
      setThemeCookies(newMode, activeTheme.name, baseStorageKey);
    },
    [baseStorageKey, activeTheme.name]
  );

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const newMode = current === "light" ? "dark" : "light";
      setPersistedMode(baseStorageKey, newMode);
      setThemeCookies(newMode, activeTheme.name, baseStorageKey);
      return newMode;
    });
  }, [baseStorageKey, activeTheme.name]);

  const setTheme = useCallback(
    (themeName: string) => {
      const found = themes.find((t) => t.name === themeName);
      if (found) {
        setActiveTheme(found);
        setPersistedTheme(baseStorageKey, themeName);
        setThemeCookies(mode, themeName, baseStorageKey);
      }
    },
    [themes, baseStorageKey, mode]
  );

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

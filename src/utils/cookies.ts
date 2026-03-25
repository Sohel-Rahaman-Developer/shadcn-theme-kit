/**
 * shadcn-theme-kit - Cookie Utilities
 *
 * Helpers for managing theme state in cookies for SSR compatibility.
 * Author: Sohel Rahaman
 */

import type { ThemeMode } from "../core/types";

/**
 * Default storage key
 */
const DEFAULT_KEY = "shadcn-theme-kit";

/**
 * Safely parse cookies (Server or Client)
 */
export function getThemeFromCookies(
  cookieString?: string,
  storageKey = DEFAULT_KEY
) {
  if (!cookieString) return { mode: null, theme: null };

  const cookies = cookieString.split(";").reduce(
    (acc, curr) => {
      const parts = curr.trim().split("=");
      const key = parts[0];
      const val = parts[1];
      if (key) {
        acc[key] = val ?? "";
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return {
    mode: cookies[`${storageKey}-mode`] as ThemeMode | undefined,
    theme: cookies[`${storageKey}-theme`],
  };
}

/**
 * Set theme cookies (Client side)
 */
export function setThemeCookies(
  mode: ThemeMode,
  themeName: string,
  storageKey = DEFAULT_KEY
) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const cookieBase = `path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

  document.cookie = `${storageKey}-mode=${mode}; ${cookieBase}`;
  document.cookie = `${storageKey}-theme=${themeName}; ${cookieBase}`;
}

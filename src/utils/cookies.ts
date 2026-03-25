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
 * Supports both raw cookie strings (document.cookie/headers)
 * and Next.js 13+ cookies() objects.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getThemeFromCookies(
  cookieData?: string | any,
  storageKey = DEFAULT_KEY
) {
  if (!cookieData) return { mode: null, theme: null };

  // 1. Next.js 13/14/15/16 cookies() object (has .get() method)
  if (typeof cookieData.get === "function") {
    const modeObj = cookieData.get(`${storageKey}-mode`);
    const themeObj = cookieData.get(`${storageKey}-theme`);
    return {
      mode: (modeObj?.value || null) as ThemeMode | null,
      theme: themeObj?.value || null,
    };
  }

  // 2. Raw cookie string
  if (typeof cookieData === "string") {
    const cookies = cookieData.split(";").reduce(
      (acc, curr) => {
        const parts = curr.trim().split("=");
        const key = parts[0];
        const val = parts[1];
        if (key) acc[key] = val ?? "";
        return acc;
      },
      {} as Record<string, string>
    );

    return {
      mode: (cookies[`${storageKey}-mode`] || null) as ThemeMode | null,
      theme: cookies[`${storageKey}-theme`] || null,
    };
  }

  return { mode: null, theme: null };
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

/**
 * shadcn-theme-kit - Storage Utilities
 *
 * Safe localStorage wrapper with prefixed keys.
 * Author: Sohel Rahaman
 */

import type { ThemeMode } from "../core/types";

/**
 * Storage key suffix
 */
const MODE_SUFFIX = "-mode";
const THEME_SUFFIX = "-theme";

/**
 * Validates storage key name (prevents injection)
 */
function validateKey(key: string): string {
  // Only allow safe characters
  return key.replace(/[^a-zA-Z0-9_-]/g, "");
}

/**
 * Get the storage key for mode
 */
export function getModeStorageKey(themeName: string): string {
  return validateKey(themeName) + MODE_SUFFIX;
}

/**
 * Get the storage key for active theme name
 */
export function getThemeStorageKey(themeName: string): string {
  return validateKey(themeName) + THEME_SUFFIX;
}

/**
 * Safely get a value from localStorage
 */
export function getStorageValue(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(key);
  } catch {
    // localStorage may be blocked (incognito, security settings)
    return null;
  }
}

/**
 * Safely set a value in localStorage
 */
export function setStorageValue(key: string, value: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage may be blocked
  }
}

/**
 * Safely remove a value from localStorage
 */
export function removeStorageValue(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch {
    // localStorage may be blocked
  }
}

/**
 * Get persisted mode from storage
 */
export function getPersistedMode(themeName: string): ThemeMode | null {
  const key = getModeStorageKey(themeName);
  const value = getStorageValue(key);

  if (value === "light" || value === "dark" || value === "system") {
    return value;
  }

  return null;
}

/**
 * Set persisted mode in storage
 */
export function setPersistedMode(themeName: string, mode: ThemeMode): void {
  const key = getModeStorageKey(themeName);
  setStorageValue(key, mode);
}

/**
 * Get persisted theme name from storage
 */
export function getPersistedTheme(baseKey: string): string | null {
  const key = getThemeStorageKey(baseKey);
  return getStorageValue(key);
}

/**
 * Set persisted theme name in storage
 */
export function setPersistedTheme(baseKey: string, themeName: string): void {
  const key = getThemeStorageKey(baseKey);
  setStorageValue(key, themeName);
}

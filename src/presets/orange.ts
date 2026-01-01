/**
 * shadcn-theme-kit - Orange Preset
 *
 * Orange color scheme - energetic and warm.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const orangePreset: ThemeConfig = Object.freeze({
  name: "orange",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#1c1917",
    card: "#ffffff",
    cardForeground: "#1c1917",
    popover: "#ffffff",
    popoverForeground: "#1c1917",
    primary: "#f97316",
    primaryForeground: "#ffffff",
    secondary: "#fff7ed",
    secondaryForeground: "#1c1917",
    muted: "#fff7ed",
    mutedForeground: "#78716c",
    accent: "#fff7ed",
    accentForeground: "#1c1917",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#fed7aa",
    input: "#fed7aa",
    ring: "#f97316",
  }),
  dark: Object.freeze({
    background: "#1c1917",
    foreground: "#fafaf9",
    card: "#1c1917",
    cardForeground: "#fafaf9",
    popover: "#1c1917",
    popoverForeground: "#fafaf9",
    primary: "#fb923c",
    primaryForeground: "#1c1917",
    secondary: "#292524",
    secondaryForeground: "#fafaf9",
    muted: "#292524",
    mutedForeground: "#a8a29e",
    accent: "#292524",
    accentForeground: "#fafaf9",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    border: "#44403c",
    input: "#44403c",
    ring: "#fb923c",
  }),
  radius: "0.5rem",
});

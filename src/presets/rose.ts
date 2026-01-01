/**
 * shadcn-theme-kit - Rose Preset
 *
 * Pink/Rose color scheme - playful and modern.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const rosePreset: ThemeConfig = Object.freeze({
  name: "rose",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#1c1917",
    card: "#ffffff",
    cardForeground: "#1c1917",
    popover: "#ffffff",
    popoverForeground: "#1c1917",
    primary: "#e11d48",
    primaryForeground: "#ffffff",
    secondary: "#fef2f2",
    secondaryForeground: "#1c1917",
    muted: "#fef2f2",
    mutedForeground: "#78716c",
    accent: "#fef2f2",
    accentForeground: "#1c1917",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#fecdd3",
    input: "#fecdd3",
    ring: "#e11d48",
  }),
  dark: Object.freeze({
    background: "#1c1917",
    foreground: "#fafaf9",
    card: "#1c1917",
    cardForeground: "#fafaf9",
    popover: "#1c1917",
    popoverForeground: "#fafaf9",
    primary: "#fb7185",
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
    ring: "#fb7185",
  }),
  radius: "0.5rem",
});

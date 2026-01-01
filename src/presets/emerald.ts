/**
 * shadcn-theme-kit - Emerald Preset
 *
 * Green color scheme - fresh and natural.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const emeraldPreset: ThemeConfig = Object.freeze({
  name: "emerald",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#14532d",
    card: "#ffffff",
    cardForeground: "#14532d",
    popover: "#ffffff",
    popoverForeground: "#14532d",
    primary: "#10b981",
    primaryForeground: "#ffffff",
    secondary: "#ecfdf5",
    secondaryForeground: "#14532d",
    muted: "#ecfdf5",
    mutedForeground: "#6b7280",
    accent: "#ecfdf5",
    accentForeground: "#14532d",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#a7f3d0",
    input: "#a7f3d0",
    ring: "#10b981",
  }),
  dark: Object.freeze({
    background: "#022c22",
    foreground: "#ecfdf5",
    card: "#022c22",
    cardForeground: "#ecfdf5",
    popover: "#022c22",
    popoverForeground: "#ecfdf5",
    primary: "#34d399",
    primaryForeground: "#022c22",
    secondary: "#064e3b",
    secondaryForeground: "#ecfdf5",
    muted: "#064e3b",
    mutedForeground: "#6ee7b7",
    accent: "#064e3b",
    accentForeground: "#ecfdf5",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    border: "#047857",
    input: "#047857",
    ring: "#34d399",
  }),
  radius: "0.5rem",
});

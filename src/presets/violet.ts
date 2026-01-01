/**
 * shadcn-theme-kit - Violet Preset
 *
 * Purple/Violet color scheme - creative and premium.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const violetPreset: ThemeConfig = Object.freeze({
  name: "violet",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#1e1b4b",
    card: "#ffffff",
    cardForeground: "#1e1b4b",
    popover: "#ffffff",
    popoverForeground: "#1e1b4b",
    primary: "#8b5cf6",
    primaryForeground: "#ffffff",
    secondary: "#f5f3ff",
    secondaryForeground: "#1e1b4b",
    muted: "#f5f3ff",
    mutedForeground: "#6b7280",
    accent: "#f5f3ff",
    accentForeground: "#1e1b4b",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#ddd6fe",
    input: "#ddd6fe",
    ring: "#8b5cf6",
  }),
  dark: Object.freeze({
    background: "#1e1b4b",
    foreground: "#f5f3ff",
    card: "#1e1b4b",
    cardForeground: "#f5f3ff",
    popover: "#1e1b4b",
    popoverForeground: "#f5f3ff",
    primary: "#a78bfa",
    primaryForeground: "#1e1b4b",
    secondary: "#312e81",
    secondaryForeground: "#f5f3ff",
    muted: "#312e81",
    mutedForeground: "#c4b5fd",
    accent: "#312e81",
    accentForeground: "#f5f3ff",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    border: "#4c1d95",
    input: "#4c1d95",
    ring: "#a78bfa",
  }),
  radius: "0.5rem",
});

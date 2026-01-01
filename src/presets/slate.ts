/**
 * shadcn-theme-kit - Slate Preset
 *
 * Slate gray color scheme - modern and professional.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const slatePreset: ThemeConfig = Object.freeze({
  name: "slate",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#0f172a",
    card: "#ffffff",
    cardForeground: "#0f172a",
    popover: "#ffffff",
    popoverForeground: "#0f172a",
    primary: "#475569",
    primaryForeground: "#ffffff",
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",
    muted: "#f1f5f9",
    mutedForeground: "#64748b",
    accent: "#f1f5f9",
    accentForeground: "#0f172a",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#e2e8f0",
    input: "#e2e8f0",
    ring: "#475569",
  }),
  dark: Object.freeze({
    background: "#0f172a",
    foreground: "#f8fafc",
    card: "#0f172a",
    cardForeground: "#f8fafc",
    popover: "#0f172a",
    popoverForeground: "#f8fafc",
    primary: "#94a3b8",
    primaryForeground: "#0f172a",
    secondary: "#1e293b",
    secondaryForeground: "#f8fafc",
    muted: "#1e293b",
    mutedForeground: "#94a3b8",
    accent: "#1e293b",
    accentForeground: "#f8fafc",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    border: "#334155",
    input: "#334155",
    ring: "#94a3b8",
  }),
  radius: "0.5rem",
});

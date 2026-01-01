/**
 * shadcn-theme-kit - Default Preset
 *
 * Neutral gray color scheme matching shadcn/ui defaults.
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

export const defaultPreset: ThemeConfig = Object.freeze({
  name: "default",
  light: Object.freeze({
    background: "#ffffff",
    foreground: "#0a0a0a",
    card: "#ffffff",
    cardForeground: "#0a0a0a",
    popover: "#ffffff",
    popoverForeground: "#0a0a0a",
    primary: "#171717",
    primaryForeground: "#fafafa",
    secondary: "#f5f5f5",
    secondaryForeground: "#171717",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    accent: "#f5f5f5",
    accentForeground: "#171717",
    destructive: "#ef4444",
    destructiveForeground: "#fafafa",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#0a0a0a",
  }),
  dark: Object.freeze({
    background: "#0a0a0a",
    foreground: "#fafafa",
    card: "#0a0a0a",
    cardForeground: "#fafafa",
    popover: "#0a0a0a",
    popoverForeground: "#fafafa",
    primary: "#fafafa",
    primaryForeground: "#171717",
    secondary: "#262626",
    secondaryForeground: "#fafafa",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    accent: "#262626",
    accentForeground: "#fafafa",
    destructive: "#7f1d1d",
    destructiveForeground: "#fafafa",
    border: "#262626",
    input: "#262626",
    ring: "#d4d4d4",
  }),
  radius: "0.5rem",
});

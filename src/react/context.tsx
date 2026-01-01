/**
 * shadcn-theme-kit - React Context
 *
 * Theme context for React applications.
 * Author: Sohel Rahaman
 */

"use client";

import { createContext } from "react";
import type { ThemeContextValue, ThemeConfig } from "../core/types";

/**
 * Empty theme for default context (deny by default - no theme applied)
 */
const emptyTheme: ThemeConfig = Object.freeze({
  name: "",
  light: Object.freeze({
    background: "",
    foreground: "",
    card: "",
    cardForeground: "",
    popover: "",
    popoverForeground: "",
    primary: "",
    primaryForeground: "",
    secondary: "",
    secondaryForeground: "",
    muted: "",
    mutedForeground: "",
    accent: "",
    accentForeground: "",
    destructive: "",
    destructiveForeground: "",
    border: "",
    input: "",
    ring: "",
  }),
  dark: Object.freeze({
    background: "",
    foreground: "",
    card: "",
    cardForeground: "",
    popover: "",
    popoverForeground: "",
    primary: "",
    primaryForeground: "",
    secondary: "",
    secondaryForeground: "",
    muted: "",
    mutedForeground: "",
    accent: "",
    accentForeground: "",
    destructive: "",
    destructiveForeground: "",
    border: "",
    input: "",
    ring: "",
  }),
  radius: "0.5rem",
});

/**
 * Default context value (no-op functions)
 */
const defaultContextValue: ThemeContextValue = {
  mode: "system",
  resolvedMode: "light",
  setMode: () => {},
  toggleMode: () => {},
  theme: emptyTheme,
  themes: [],
  setTheme: () => {},
};

/**
 * Theme context
 */
export const ThemeContext =
  createContext<ThemeContextValue>(defaultContextValue);

ThemeContext.displayName = "ThemeContext";

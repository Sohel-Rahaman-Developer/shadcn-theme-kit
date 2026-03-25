/**
 * shadcn-theme-kit - Theme Script
 *
 * A blocking script to prevent Flash of Unstyled Content (FOUC) in SSR.
 * Place this in your root layout's <head>.
 *
 * HOW IT WORKS:
 * This script runs synchronously before the body renders. It reads the
 * saved theme preference from cookies/localStorage and sets two things
 * on <html>:
 *   1. class="dark" (if dark mode)
 *   2. data-theme="blue" (or whatever preset was selected)
 *
 * The actual CSS variable values come from [data-theme="blue"] selectors
 * in globals.css — zero JavaScript CSS injection, zero hydration conflict.
 *
 * Author: Sohel Rahaman
 */

import type { ThemeConfig } from "../core/types";

interface ThemeScriptProps {
  /**
   * List of available themes — used only to validate the stored theme name.
   */
  themes?: readonly ThemeConfig[];
  /**
   * Storage key for persistence. MUST match the storageKey passed to ThemeProvider.
   * @default "shadcn-theme-kit"
   */
  storageKey?: string;
  /**
   * Default mode if no preference found.
   * @default "system"
   */
  defaultMode?: "light" | "dark" | "system";
  /**
   * Default theme name if no preference found.
   */
  defaultThemeName?: string;
  /**
   * Unique ID for the script element.
   */
  id?: string;
}

export function ThemeScript({
  themes = [],
  storageKey = "shadcn-theme-kit",
  defaultMode = "system",
  defaultThemeName = "default",
  id = "shadcn-theme-kit-script",
}: ThemeScriptProps) {
  // Serialize valid theme names for the inline script to validate against
  const validThemeNames = JSON.stringify(themes.map((t) => t.name));

  const scriptContent = `
    (function() {
      try {
        var storageKey = "${storageKey}";
        var defaultMode = "${defaultMode}";
        var defaultThemeName = "${defaultThemeName}";
        var validThemeNames = ${validThemeNames};

        // Read cookie helper
        function getCookie(name) {
          try {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
          } catch(e) { return null; }
        }

        // 1. Resolve mode: cookie → localStorage → default
        var mode = getCookie(storageKey + "-mode")
          || localStorage.getItem(storageKey + "-mode")
          || defaultMode;

        var resolvedMode = mode;
        if (mode === "system") {
          resolvedMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }

        // 2. Resolve theme name: cookie → localStorage → default
        var themeName = getCookie(storageKey + "-theme")
          || localStorage.getItem(storageKey + "-theme")
          || defaultThemeName;

        // Validate theme name against known themes, fallback to default
        if (validThemeNames.length > 0 && validThemeNames.indexOf(themeName) === -1) {
          themeName = defaultThemeName || validThemeNames[0] || "default";
        }

        var el = document.documentElement;

        // 3. Apply dark class — this is all next-themes does too
        if (resolvedMode === "dark") {
          el.classList.add("dark");
          el.style.colorScheme = "dark";
        } else {
          el.classList.remove("dark");
          el.style.colorScheme = "light";
        }

        // 4. Set data-theme attribute — CSS selectors in globals.css handle the rest
        // This is the KEY change: no CSS injection, no style tags, no setProperty
        // The browser reads [data-theme="blue"].dark { --primary: ... } from the CSS file
        // which is already loaded — instant, zero flash, zero hydration conflict
        el.setAttribute("data-theme", themeName);

      } catch (e) {
        console.error("shadcn-theme-kit: Failed to apply initial theme", e);
      }
    })();
  `.replace(/\\s+/g, " ");

  return <script id={id} dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

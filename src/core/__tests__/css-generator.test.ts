import { describe, it, expect, afterEach } from "vitest";
import {
  generateThemeCSS,
  generateDualModeCSS,
  injectCSS,
  removeCSS,
  STYLE_ELEMENT_ID,
} from "../css-generator";
import type { ThemeConfig } from "../types";

describe("css-generator", () => {
  const dummyPalette = {
    background: "#000",
    foreground: "#fff",
    card: "#000",
    cardForeground: "#fff",
    popover: "#000",
    popoverForeground: "#fff",
    primary: "#000",
    primaryForeground: "#fff",
    secondary: "#000",
    secondaryForeground: "#fff",
    muted: "#000",
    mutedForeground: "#fff",
    accent: "#000",
    accentForeground: "#fff",
    destructive: "#000",
    destructiveForeground: "#fff",
    border: "#000",
    input: "#000",
    ring: "#000",
  };

  const dummyTheme: ThemeConfig = {
    name: "dummy",
    light: dummyPalette,
    dark: dummyPalette,
    radius: "10px",
  };

  describe("generateThemeCSS", () => {
    it("should safely generate single mode CSS variables", () => {
      const css = generateThemeCSS(dummyTheme, "light");
      expect(css).toContain(":root {");
      expect(css).toContain("--background: #000;");
      expect(css).toContain("--radius: 10px;");
    });
  });

  describe("generateDualModeCSS", () => {
    it("should generate both light and dark blocks", () => {
      const css = generateDualModeCSS(dummyTheme);
      expect(css).toContain(":root {");
      expect(css).toContain(".dark {");
    });
  });

  describe("DOM interactions", () => {
    afterEach(() => {
      removeCSS();
    });

    it("should inject and remove CSS styles safely to the head", () => {
      injectCSS(":root { --test: #fff; }");
      const styleEl = document.getElementById(STYLE_ELEMENT_ID);
      expect(styleEl).not.toBeNull();
      expect(styleEl?.textContent).toContain("--test: #fff;");

      removeCSS();
      expect(document.getElementById(STYLE_ELEMENT_ID)).toBeNull();
    });
  });
});

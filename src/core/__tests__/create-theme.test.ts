import { describe, it, expect } from "vitest";
import { createTheme, mergePalettes } from "../create-theme";

describe("create-theme", () => {
  const validPalette = {
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

  describe("createTheme", () => {
    it("should create a valid theme with radius", () => {
      const theme = createTheme({
        name: "test-theme",
        light: validPalette,
        dark: validPalette,
        radius: "1rem",
      });

      expect(theme.name).toBe("test-theme");
      expect(theme.radius).toBe("1rem");
      expect(theme.light).toEqual(validPalette);
      expect(Object.isFrozen(theme)).toBe(true);
    });

    it("should reject invalid theme names", () => {
      expect(() =>
        createTheme({
          name: "invalid name!",
          light: validPalette,
          dark: validPalette,
        })
      ).toThrowError(/Theme name must only contain/);
    });

    it("should reject invalid palettes", () => {
      expect(() =>
        createTheme({
          name: "test-theme",
          light: { ...validPalette, primary: "invalid-color" },
          dark: validPalette,
        })
      ).toThrowError(/Invalid color value for "primary"/);
    });
  });

  describe("mergePalettes", () => {
    it("should merge a partial palette overriding the base", () => {
      const merged = mergePalettes(validPalette, {
        primary: "red",
      });

      expect(merged.primary).toBe("red");
      expect(merged.background).toBe(validPalette.background);
    });
  });
});

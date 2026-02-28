import { describe, it, expect } from "vitest";
import { parseColor, validateColorPalette } from "../color-parser";

describe("color-parser", () => {
  describe("parseColor", () => {
    it("should accept safe color names", () => {
      expect(parseColor("red")).toBe("red");
      expect(parseColor("transparent")).toBe("transparent");
      expect(parseColor("currentColor")).toBe("currentcolor");
    });

    it("should reject invalid color names", () => {
      expect(parseColor("not_a_color")).toBeNull();
      expect(parseColor("")).toBeNull();
    });

    it("should parse valid hex colors", () => {
      expect(parseColor("#fff")).toBe("#fff");
      expect(parseColor("#FFFFFF")).toBe("#FFFFFF");
      expect(parseColor("#123456")).toBe("#123456");
      expect(parseColor("#12345678")).toBe("#12345678");
    });

    it("should reject invalid hex colors", () => {
      expect(parseColor("#12")).toBeNull();
      expect(parseColor("#12345")).toBeNull();
      expect(parseColor("#1234567")).toBeNull();
      expect(parseColor("#GGGGGG")).toBeNull();
    });

    it("should parse valid rgb/rgba colors", () => {
      expect(parseColor("rgb(255, 0, 128)")).toBe("rgb(255, 0, 128)");
      expect(parseColor("rgba(255, 0, 0, 0.5)")).toBe("rgba(255, 0, 0, 0.5)");
    });

    it("should reject invalid rgb/rgba colors", () => {
      expect(parseColor("rgb(300, 0, 0)")).toBeNull(); // out of range
      expect(parseColor("rgba(255, 0, 0, 1.5)")).toBeNull(); // alpha out of range
      expect(parseColor("rgb(255, 0)")).toBeNull(); // missing part
      expect(parseColor("rgba(255, 0, 0)")).toBeNull(); // missing alpha
    });

    it("should parse valid hsl/hsla colors", () => {
      expect(parseColor("hsl(120, 100%, 50%)")).toBe("hsl(120, 100%, 50%)");
      expect(parseColor("hsla(120, 100%, 50%, 0.5)")).toBe(
        "hsla(120, 100%, 50%, 0.5)"
      );
    });

    it("should reject invalid hsl/hsla colors", () => {
      expect(parseColor("hsl(120, 100, 50%)")).toBeNull(); // missing %
      expect(parseColor("hsla(120, 100%, 50%, 1.5)")).toBeNull(); // alpha out of range
    });
  });

  describe("validateColorPalette", () => {
    it("should return true for a valid palette", () => {
      const palette = {
        primary: "#ff0000",
        background: "white",
      };
      expect(validateColorPalette(palette)).toBe(true);
    });

    it("should return false for an invalid palette", () => {
      const palette = {
        primary: "#ff0000",
        background: "invalid-color",
      };
      expect(validateColorPalette(palette)).toBe(false);
    });
  });
});

import { describe, it, expect } from "vitest";
import { presets, getPreset, presetNames } from "../index";

describe("presets", () => {
  it("should export all built-in presets", () => {
    expect(presetNames).toContain("default");
    expect(presetNames).toContain("blue");
    expect(presetNames).toContain("rose");
    expect(presetNames).toContain("emerald");
    expect(presetNames).toContain("orange");
    expect(presetNames).toContain("violet");
    expect(presetNames).toContain("slate");
    expect(presetNames.length).toBe(7);
  });

  it("should safely retrieve default preset", () => {
    const defaultTheme = getPreset("default");
    expect(defaultTheme.name).toBe("default");
    expect(defaultTheme.radius).toBe("0.5rem");
    expect(defaultTheme.light).toBeDefined();
    expect(defaultTheme.dark).toBeDefined();
  });

  it("should successfully retrieve all specific presets via getPreset", () => {
    for (const name of presetNames) {
      const theme = getPreset(name);
      expect(theme.name).toBe(name);
      expect(theme.light).toBeDefined();
      expect(theme.dark).toBeDefined();
    }
  });

  it("should throw error when requesting unknown preset", () => {
    expect(() => getPreset("invalid-preset" as any)).toThrowError(
      /Unknown preset/
    );
  });

  it("should have frozen presets object", () => {
    expect(Object.isFrozen(presets)).toBe(true);
  });
});

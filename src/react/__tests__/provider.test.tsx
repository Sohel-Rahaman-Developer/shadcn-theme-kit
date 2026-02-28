import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "../provider";
import { presets } from "../../presets";
import { STYLE_ELEMENT_ID } from "../../core/css-generator";

describe("ThemeProvider", () => {
  afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("dark");
    document.getElementById(STYLE_ELEMENT_ID)?.remove();
    localStorage.clear();
  });

  it("should render children", () => {
    render(
      <ThemeProvider theme={presets.blue}>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("child").textContent).toBe("Hello");
  });

  it("should inject CSS variables into document head", () => {
    render(
      <ThemeProvider theme={presets.blue}>
        <div>Hello</div>
      </ThemeProvider>
    );

    const styleEl = document.getElementById(STYLE_ELEMENT_ID);
    expect(styleEl).not.toBeNull();
    // Blue primary light color is #2563eb
    expect(styleEl?.textContent).toContain("--primary: #2563eb;");
  });

  it("should respect defaultMode and apply dark class if dark", () => {
    render(
      <ThemeProvider theme={presets.blue} defaultMode="dark">
        <div>Hello</div>
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should prioritize persisted theme and mode over defaults", () => {
    localStorage.setItem("my-app-theme", "rose");
    localStorage.setItem("my-app-mode", "dark");

    render(
      <ThemeProvider
        themes={[presets.blue, presets.rose]}
        defaultTheme="blue"
        defaultMode="light"
        storageKey="my-app"
      >
        <div>Hello</div>
      </ThemeProvider>
    );

    const styleEl = document.getElementById(STYLE_ELEMENT_ID);
    expect(styleEl).not.toBeNull();
    // Rose primary color
    expect(styleEl?.textContent).toContain("--primary: #e11d48;");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import React from "react";
import { renderHook } from "@testing-library/react";
import {
  useThemeMode,
  useResolvedMode,
  useCurrentTheme,
  useIsDarkMode,
  useAvailableThemes,
} from "../hooks";
import { ThemeProvider } from "../provider";
import { presets } from "../../presets";

describe("React Hooks", () => {
  it("useThemeMode should return current mode", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={presets.blue} defaultMode="dark">
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useThemeMode(), { wrapper });
    expect(result.current).toBe("dark");
  });

  it("useResolvedMode should return actual resolved mode", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={presets.blue} defaultMode="light">
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useResolvedMode(), { wrapper });
    expect(result.current).toBe("light");
  });

  it("useCurrentTheme should return active theme config", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={presets.rose}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useCurrentTheme(), { wrapper });
    expect(result.current.name).toBe("rose");
  });

  it("useIsDarkMode should return correct boolean", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={presets.blue} defaultMode="dark">
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useIsDarkMode(), { wrapper });
    expect(result.current).toBe(true);
  });

  it("useAvailableThemes should return array of provided themes", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider themes={[presets.blue, presets.rose]}>
        {children}
      </ThemeProvider>
    );

    const { result } = renderHook(() => useAvailableThemes(), { wrapper });
    expect(result.current.length).toBe(2);
    expect(result.current[0]?.name).toBe("blue");
  });
});

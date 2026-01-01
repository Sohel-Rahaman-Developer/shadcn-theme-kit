# shadcn-theme-kit

Easy theme configuration for React + shadcn with light/dark mode, preset themes, and CSS variables.

[![npm version](https://img.shields.io/npm/v/shadcn-theme-kit.svg)](https://www.npmjs.com/package/shadcn-theme-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **7 Preset Themes** - blue, rose, emerald, orange, violet, slate, default
- 🌙 **Dark/Light/System Mode** - Automatic system preference detection
- 💾 **Persistence** - localStorage saves user preference
- 🔒 **Zero Dependencies** - Core has no runtime dependencies
- 📦 **TypeScript First** - Full strict mode support
- ⚡ **shadcn Compatible** - CSS variables match shadcn/ui

## Installation

```bash
npm install shadcn-theme-kit
```

## Quick Start

### Use a Preset Theme

```tsx
import { ThemeProvider, presets } from "shadcn-theme-kit";

function App() {
  return (
    <ThemeProvider theme={presets.blue}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Add Theme Toggle

```tsx
import { useTheme } from "shadcn-theme-kit";

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <button onClick={toggleMode}>
      {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

## Preset Themes

| Preset            | Primary Color | Usage                                     |
| ----------------- | ------------- | ----------------------------------------- |
| `presets.default` | Neutral gray  | `<ThemeProvider theme={presets.default}>` |
| `presets.blue`    | Blue          | `<ThemeProvider theme={presets.blue}>`    |
| `presets.rose`    | Pink          | `<ThemeProvider theme={presets.rose}>`    |
| `presets.emerald` | Green         | `<ThemeProvider theme={presets.emerald}>` |
| `presets.orange`  | Orange        | `<ThemeProvider theme={presets.orange}>`  |
| `presets.violet`  | Purple        | `<ThemeProvider theme={presets.violet}>`  |
| `presets.slate`   | Slate gray    | `<ThemeProvider theme={presets.slate}>`   |

## Custom Theme

```tsx
import { createTheme, ThemeProvider } from "shadcn-theme-kit";

const myTheme = createTheme({
  name: "my-brand",
  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0066cc",
    primaryForeground: "#ffffff",
    secondary: "#f5f5f5",
    secondaryForeground: "#171717",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    accent: "#f5f5f5",
    accentForeground: "#171717",
    destructive: "#ef4444",
    destructiveForeground: "#fafafa",
    card: "#ffffff",
    cardForeground: "#0a0a0a",
    popover: "#ffffff",
    popoverForeground: "#0a0a0a",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#0066cc",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    primary: "#3399ff",
    primaryForeground: "#0a0a0a",
    secondary: "#262626",
    secondaryForeground: "#fafafa",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    accent: "#262626",
    accentForeground: "#fafafa",
    destructive: "#dc2626",
    destructiveForeground: "#fafafa",
    card: "#0a0a0a",
    cardForeground: "#fafafa",
    popover: "#0a0a0a",
    popoverForeground: "#fafafa",
    border: "#262626",
    input: "#262626",
    ring: "#3399ff",
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Multiple Theme Switcher

```tsx
import { ThemeProvider, presets, useTheme } from "shadcn-theme-kit";

function App() {
  return (
    <ThemeProvider
      themes={[presets.blue, presets.rose, presets.emerald]}
      defaultTheme="blue"
    >
      <ThemeSwitcher />
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select value={theme.name} onChange={(e) => setTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t.name} value={t.name}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
```

## API Reference

### `<ThemeProvider>`

| Prop           | Type                            | Default     | Description          |
| -------------- | ------------------------------- | ----------- | -------------------- |
| `theme`        | `ThemeConfig`                   | -           | Single theme         |
| `themes`       | `ThemeConfig[]`                 | -           | Multiple themes      |
| `defaultTheme` | `string`                        | First theme | Default active theme |
| `defaultMode`  | `'light' \| 'dark' \| 'system'` | `'system'`  | Default mode         |
| `storageKey`   | `string`                        | Theme name  | localStorage key     |

### `useTheme()`

```tsx
const {
  mode, // 'light' | 'dark' | 'system'
  resolvedMode, // 'light' | 'dark' (actual)
  setMode, // (mode) => void
  toggleMode, // () => void
  theme, // Current theme config
  themes, // All available themes
  setTheme, // (themeName) => void
} = useTheme();
```

### Other Hooks

| Hook                   | Returns             | Description         |
| ---------------------- | ------------------- | ------------------- |
| `useThemeMode()`       | `ThemeMode`         | Current mode        |
| `useResolvedMode()`    | `'light' \| 'dark'` | Resolved mode       |
| `useIsDarkMode()`      | `boolean`           | Is dark mode active |
| `useCurrentTheme()`    | `ThemeConfig`       | Current theme       |
| `useAvailableThemes()` | `ThemeConfig[]`     | All themes          |

## Color Formats

All these formats are supported:

```tsx
createTheme({
  light: {
    primary: "#2563eb", // HEX
    secondary: "rgb(100, 116, 139)", // RGB
    accent: "rgba(245, 158, 11, 1)", // RGBA
    background: "hsl(0, 0%, 100%)", // HSL
    foreground: "black", // Color name
    // ...
  },
});
```

## Next.js App Router

```tsx
// app/layout.tsx
import { ThemeProvider, presets } from "shadcn-theme-kit";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider theme={presets.blue} defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## License

MIT © Sohel Rahaman

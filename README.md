# shadcn-theme-kit

Easy theme configuration for React + shadcn with light/dark mode, preset themes, and CSS variables.

[![npm version](https://img.shields.io/npm/v/shadcn-theme-kit.svg)](https://www.npmjs.com/package/shadcn-theme-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **7 Preset Themes** - blue, rose, emerald, orange, violet, slate, default
- 🌙 **Dark/Light/System Mode** - Each theme has both light AND dark colors
- 💾 **Persistence** - localStorage saves user preference
- 🔒 **Zero Dependencies** - Core has no runtime dependencies
- 📦 **TypeScript First** - Full strict mode support
- ⚡ **shadcn Compatible** - CSS variables match shadcn/ui

---

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                      Your React App                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              <ThemeProvider>                          │  │
│  │                                                       │  │
│  │   theme={presets.blue}  ──► Blue Theme               │  │
│  │         │                    ├── light mode colors    │  │
│  │         │                    └── dark mode colors     │  │
│  │         │                                             │  │
│  │   defaultMode="system" ──► Auto detect               │  │
│  │         │                    ├── 🌞 Light            │  │
│  │         │                    └── 🌙 Dark             │  │
│  │         ▼                                             │  │
│  │   ┌─────────────────────────────────────────────────┐ │  │
│  │   │  CSS Variables Injected to :root                │ │  │
│  │   │  --background, --primary, --foreground, etc.    │ │  │
│  │   └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Installation

```bash
npm install shadcn-theme-kit
```

---

## Quick Start (3 Steps)

### Step 1: Wrap Your App

```tsx
// app/layout.tsx (Next.js) or App.tsx (Vite/CRA)
import { ThemeProvider, presets } from "shadcn-theme-kit";

export default function App() {
  return (
    <ThemeProvider theme={presets.blue} defaultMode="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Step 2: Add Theme Toggle

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

### Step 3: Use CSS Classes (Works Automatically!)

```tsx
// These shadcn classes work automatically!
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">Click me</button>
</div>
```

---

## Available Preset Themes

Each preset has **BOTH light mode AND dark mode** colors built-in!

| Preset            | Primary Color | Light Mode | Dark Mode |
| ----------------- | ------------- | ---------- | --------- |
| `presets.default` | Neutral gray  | ✅         | ✅        |
| `presets.blue`    | 💙 Blue       | ✅         | ✅        |
| `presets.rose`    | 💗 Pink/Rose  | ✅         | ✅        |
| `presets.emerald` | 💚 Green      | ✅         | ✅        |
| `presets.orange`  | 🧡 Orange     | ✅         | ✅        |
| `presets.violet`  | 💜 Purple     | ✅         | ✅        |
| `presets.slate`   | 🩶 Slate gray  | ✅         | ✅        |

### Example: Blue Theme

```tsx
import { ThemeProvider, presets } from "shadcn-theme-kit";

<ThemeProvider theme={presets.blue}>
  <App />
</ThemeProvider>;

// When user is in LIGHT mode: #2563eb (bright blue)
// When user is in DARK mode:  #3b82f6 (lighter blue)
```

---

## Multiple Theme Switcher (Blue/Pink/Green)

Let users switch between different color themes!

```
┌────────────────────────────────────────────────────────────┐
│  User Interface                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Theme: [Blue ▼]    Mode: [🌙 Dark]                  │  │
│  │         │                 │                          │  │
│  │         ▼                 ▼                          │  │
│  │    ┌─────────┐      toggleMode()                     │  │
│  │    │ Blue    │                                       │  │
│  │    │ Pink    │  ──► setTheme("rose")                 │  │
│  │    │ Green   │                                       │  │
│  │    └─────────┘                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
import { ThemeProvider, presets, useTheme } from "shadcn-theme-kit";

function App() {
  return (
    <ThemeProvider
      themes={[presets.blue, presets.rose, presets.emerald]}
      defaultTheme="blue"
    >
      <Header />
      <YourApp />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, setTheme, mode, toggleMode } = useTheme();

  return (
    <div>
      {/* Theme Color Switcher */}
      <select value={theme.name} onChange={(e) => setTheme(e.target.value)}>
        <option value="blue">💙 Blue</option>
        <option value="rose">💗 Pink</option>
        <option value="emerald">💚 Green</option>
      </select>

      {/* Light/Dark Mode Toggle */}
      <button onClick={toggleMode}>{mode === "dark" ? "☀️" : "🌙"}</button>
    </div>
  );
}
```

---

## Custom Theme

Create your own brand colors!

### File Structure

```
your-project/
├── lib/
│   └── theme.ts        ◄── Create this file
├── app/
│   └── layout.tsx      ◄── Import theme here
└── components/
    └── theme-toggle.tsx
```

### theme.ts

```tsx
import { createTheme } from "shadcn-theme-kit";

export const myBrandTheme = createTheme({
  name: "my-brand", // Used for localStorage key

  // 🌞 LIGHT MODE COLORS
  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0066cc", // Your brand color
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

  // 🌙 DARK MODE COLORS
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    primary: "#3399ff", // Lighter for dark mode
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
```

### layout.tsx

```tsx
import { ThemeProvider } from "shadcn-theme-kit";
import { myBrandTheme } from "@/lib/theme";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider theme={myBrandTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

## API Reference

### `<ThemeProvider>`

| Prop           | Type                            | Default     | Description                   |
| -------------- | ------------------------------- | ----------- | ----------------------------- |
| `theme`        | `ThemeConfig`                   | -           | Single theme                  |
| `themes`       | `ThemeConfig[]`                 | -           | Multiple themes for switching |
| `defaultTheme` | `string`                        | First theme | Default active theme name     |
| `defaultMode`  | `'light' \| 'dark' \| 'system'` | `'system'`  | Default color mode            |
| `storageKey`   | `string`                        | Theme name  | localStorage key prefix       |

### `useTheme()`

```tsx
const {
  mode, // 'light' | 'dark' | 'system' - Current setting
  resolvedMode, // 'light' | 'dark' - Actual applied mode
  setMode, // (mode) => void - Set mode
  toggleMode, // () => void - Toggle light/dark
  theme, // ThemeConfig - Current theme
  themes, // ThemeConfig[] - All available themes
  setTheme, // (name) => void - Switch theme by name
} = useTheme();
```

### Other Hooks

| Hook                   | Returns             | Description          |
| ---------------------- | ------------------- | -------------------- |
| `useThemeMode()`       | `ThemeMode`         | Current mode setting |
| `useResolvedMode()`    | `'light' \| 'dark'` | Actual applied mode  |
| `useIsDarkMode()`      | `boolean`           | Is dark mode active  |
| `useCurrentTheme()`    | `ThemeConfig`       | Current theme config |
| `useAvailableThemes()` | `ThemeConfig[]`     | All themes array     |

---

## Supported Color Formats

All these formats work:

```tsx
createTheme({
  light: {
    primary: "#2563eb", // HEX
    secondary: "rgb(100, 116, 139)", // RGB
    accent: "rgba(245, 158, 11, 1)", // RGBA
    background: "hsl(0, 0%, 100%)", // HSL
    foreground: "black", // Color name
  },
});
```

---

## Next.js App Router Setup

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

---

## License

MIT © Sohel Rahaman

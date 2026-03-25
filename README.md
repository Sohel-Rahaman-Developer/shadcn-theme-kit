# shadcn-theme-kit

Easy theme configuration for React + shadcn with light/dark mode, preset themes, and CSS variables.

[![npm version](https://img.shields.io/npm/v/shadcn-theme-kit.svg)](https://www.npmjs.com/package/shadcn-theme-kit)
[![Tests & CI](https://github.com/Sohel-Rahaman-Developer/shadcn-theme-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/Sohel-Rahaman-Developer/shadcn-theme-kit/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **7 Preset Themes** - blue, rose, emerald, orange, violet, slate, default
- 🌙 **Dark/Light/System Mode** - Each theme has both light AND dark colors
- 💾 **Persistence** - localStorage saves user preference
- 🔒 **Zero Dependencies** - Core has no runtime dependencies
- 📦 **TypeScript First** - Full strict mode support

---

## Why Use shadcn-theme-kit?

| Problem                                           | Solution                               |
| ------------------------------------------------- | -------------------------------------- |
| ❌ Manually editing `globals.css` for every color | ✅ Just pick a preset or define once   |
| ❌ Writing separate dark mode CSS                 | ✅ Light + Dark built into every theme |
| ❌ No persistence - user has to choose every time | ✅ Auto-saved to localStorage          |
| ❌ Complex setup with CSS variables               | ✅ 3 lines of code to get started      |
| ❌ Theme switching requires page reload           | ✅ Instant switch, no reload           |

### Before (Manual Way) 😫

```css
/* globals.css - You had to write ALL this manually */
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #2563eb;
  /* ... 15+ more variables */
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #3b82f6;
  /* ... 15+ more variables AGAIN */
}
```

### After (With shadcn-theme-kit) 😎

```tsx
// Just 3 lines!
<ThemeProvider theme={presets.blue}>
  <App />
</ThemeProvider>
```

---

## How CSS Classes Work

### Available CSS Classes

These classes work automatically once you wrap your app:

| Class                   | Description         | Light Mode | Dark Mode    |
| ----------------------- | ------------------- | ---------- | ------------ |
| `bg-background`         | Main background     | White      | Dark         |
| `bg-foreground`         | Inverted background | Dark       | White        |
| `bg-primary`            | Primary brand color | Blue       | Lighter blue |
| `bg-secondary`          | Secondary color     | Light gray | Dark gray    |
| `bg-muted`              | Muted sections      | Light gray | Dark gray    |
| `bg-accent`             | Accent areas        | Light gray | Dark gray    |
| `bg-destructive`        | Error/danger        | Red        | Red          |
| `bg-card`               | Card background     | White      | Dark         |
| `text-foreground`       | Main text           | Dark       | White        |
| `text-primary`          | Primary text        | Blue       | Blue         |
| `text-muted-foreground` | Muted text          | Gray       | Lighter gray |
| `border-border`         | Borders             | Light gray | Dark gray    |

### Example: Same Class, Different Modes

```
┌─────────────────────────────────────────────────────────────┐
│  className="bg-primary text-primary-foreground"            │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────┐        │
│  │   🌞 LIGHT MODE     │    │   🌙 DARK MODE      │        │
│  │                     │    │                     │        │
│  │   bg: #2563eb       │    │   bg: #3b82f6       │        │
│  │   text: #ffffff     │    │   text: #ffffff     │        │
│  │                     │    │                     │        │
│  │   ┌─────────────┐   │    │   ┌─────────────┐   │        │
│  │   │   Button    │   │    │   │   Button    │   │        │
│  │   └─────────────┘   │    │   └─────────────┘   │        │
│  └─────────────────────┘    └─────────────────────┘        │
│                                                             │
│  SAME CLASS → DIFFERENT COLORS based on mode!              │
└─────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
// This button looks different in light vs dark mode automatically!
<button className="bg-primary text-primary-foreground px-4 py-2 rounded">
  Click Me
</button>

// Light mode: Blue background (#2563eb) + White text
// Dark mode:  Lighter blue (#3b82f6) + White text
```

---

## Adding Custom CSS Classes

Want to add your own classes that respect light/dark mode? Easy!

### Method 1: Use CSS Variables in Your CSS

```css
/* styles/custom.css */

.my-custom-button {
  /* Uses theme colors automatically! */
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}

.my-custom-button:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.my-custom-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
```

### Method 2: Tailwind with Theme Variables

```tsx
// If using Tailwind, these work automatically:
<div className="bg-[var(--primary)] text-[var(--primary-foreground)]">
  Custom styled div
</div>
```

### All Available CSS Variables

```css
/* These are injected into :root by ThemeProvider */
:root {
  --background: ...;
  --foreground: ...;
  --card: ...;
  --card-foreground: ...;
  --popover: ...;
  --popover-foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
  --secondary: ...;
  --secondary-foreground: ...;
  --muted: ...;
  --muted-foreground: ...;
  --accent: ...;
  --accent-foreground: ...;
  --destructive: ...;
  --destructive-foreground: ...;
  --border: ...;
  --input: ...;
  --ring: ...;
  --radius: ...;
}
```

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
│  │   theme={presets.blue}  ──► Blue Theme                │  │
│  │         │                    ├── light mode colors    │  │
│  │         │                    └── dark mode colors     │  │
│  │         │                                             │  │
│  │   defaultMode="system"  ──► Auto detect               │  │
│  │         │                    ├── 🌞 Light             │  │
│  │         │                    └── 🌙 Dark              │  │
│  │         ▼                                             │  │
│  │   ┌─────────────────────────────────────────────────┐ │  │
│  │   │  Static CSS Variables (data-theme)              │ │  │
│  │   └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start (Zero-Flicker Setup)

To achieve a 100% flicker-free (zero FOUC) experience, `shadcn-theme-kit` uses a static CSS architecture. Instead of injecting styles via JavaScript at runtime, it relies on static CSS variables in your `globals.css` aligned perfectly with Server-Side Rendering (SSR).

Follow these exactly to eliminate the "black/white flash" during page load.

### 1. Generate Static Theme CSS

First, generate the static CSS variables for all the presets. You can do this by running a quick Node script in your project, or passing it to `console.log`:

```ts
import { presets, generateGlobalCSS } from 'shadcn-theme-kit';

// This generates [data-theme="blue"] { ... } CSS blocks for all presets
console.log(generateGlobalCSS(Object.values(presets)));
```

Copy the output and paste it into your `app/globals.css` file **inside** the `@layer base` block, immediately after your default `html.dark` styling:

```css
/* app/globals.css */
@layer base {
  :root {
    --background: oklch(1 0 0);
    /* ... default light styles */
  }
  html.dark {
    --background: oklch(0.145 0 0);
    /* ... default dark fallback styles */
  }

  /* ⬇️ PASTE GENERATED CSS HERE ⬇️ */
  /* [data-theme="blue"] { ... } */
  /* [data-theme="rose"] { ... } */
}
```

### 2. Configure `layout.tsx`

Update your Root Layout to read the saved theme from cookies, set the `data-theme` attribute for SSR, and include the blocking `<ThemeScript />`.

```tsx
// app/layout.tsx
import { cookies } from "next/headers";
import { ThemeScript } from "shadcn-theme-kit";
import { getThemeFromCookies } from "shadcn-theme-kit/cookies";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Read cookies on the server
  const themeData = getThemeFromCookies(cookies(), "shadcn-theme-kit");
  const initialMode = themeData.mode || "system";
  const initialTheme = themeData.theme || "blue";

  // 2. Normalize SSR state to exactly match the initial client hydration pass
  const ssrMode = initialMode === "system" ? "light" : initialMode;
  const ssrTheme = initialTheme;

  return (
    <html 
      lang="en" 
      suppressHydrationWarning // Required by next-themes / shadcn-theme-kit
      data-theme={ssrTheme}    // Applies your static CSS instantly
      className={ssrMode === "dark" ? "dark" : ""}
    >
      <head>
        {/* 3. Add the blocking script to prevent FOUC */}
        <ThemeScript 
          defaultMode="system" 
          defaultThemeName="blue" 
          storageKey="shadcn-theme-kit" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### 3. Wrap your App with `ThemeProvider`

Finally, wrap your application in the `ThemeProvider`.

```tsx
// components/providers.tsx
"use client";

import { ThemeProvider, presets } from "shadcn-theme-kit";

export function Providers({ 
  children,
  initialMode,
  initialTheme
}: { 
  children: React.ReactNode;
  initialMode?: "light" | "dark" | "system";
  initialTheme?: string;
}) {
  return (
    <ThemeProvider
      themes={Object.values(presets)}
      defaultTheme="blue"
      defaultMode="system"
      storageKey="shadcn-theme-kit"
      initialMode={initialMode}
      initialTheme={initialTheme}
    >
      {children}
    </ThemeProvider>
  );
}
```

Then use it in your layout body:

```tsx
// app/layout.tsx
import { Providers } from "@/components/providers";

// ... inside <body>
<Providers initialMode={themeData.mode} initialTheme={themeData.theme}>
  {children}
</Providers>
```

---

## 🎨 Changing Themes in UI

Now, simply use the hook anywhere in your app to switch themes instantly without any reload or flicker!

```tsx
"use client";

import { useTheme } from "shadcn-theme-kit";

export function ThemeSwitcher() {
  const { setTheme, toggleMode, theme, resolvedMode } = useTheme();

  return (
    <div>
      <button onClick={toggleMode}>
        {resolvedMode === "dark" ? "Light Mode" : "Dark Mode"}
      </button>

      <button onClick={() => setTheme("rose")}>
        Switch to Rose Theme
      </button>
      
      <p>Current Theme: {theme.name}</p>
    </div>
  );
}
```
      │  │
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
| `presets.slate`   | 🩶 Slate gray | ✅         | ✅        |

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

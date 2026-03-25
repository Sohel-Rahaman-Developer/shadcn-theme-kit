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

## 🎨 Adding Custom Themes

You can easily create your own brand theme and generate the static CSS for it!

### 1. Define Your Theme
Create a file for your theme definition.

```tsx
// lib/my-brand-theme.ts
import { createTheme } from "shadcn-theme-kit";

export const myBrandTheme = createTheme({
  name: "my-brand", // Used for [data-theme="my-brand"]

  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0066cc", // Brand color
    primaryForeground: "#ffffff",
    // ... complete all required color keys
    card: "#ffffff",
    cardForeground: "#0a0a0a",
    popover: "#ffffff",
    popoverForeground: "#0a0a0a",
    secondary: "#f5f5f5",
    secondaryForeground: "#171717",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    accent: "#f5f5f5",
    accentForeground: "#171717",
    destructive: "#ef4444",
    destructiveForeground: "#fafafa",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#0066cc",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    primary: "#3399ff", // Lighter for dark mode
    primaryForeground: "#0a0a0a",
    // ... complete all required color keys
    card: "#0a0a0a",
    cardForeground: "#fafafa",
    popover: "#0a0a0a",
    popoverForeground: "#fafafa",
    secondary: "#262626",
    secondaryForeground: "#fafafa",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    accent: "#262626",
    accentForeground: "#fafafa",
    destructive: "#dc2626",
    destructiveForeground: "#fafafa",
    border: "#262626",
    input: "#262626",
    ring: "#3399ff",
  },
  radius: "0.5rem"
});
```

### 2. Generate and Paste the CSS

Run the generator for your custom theme:

```ts
import { generateGlobalCSS } from 'shadcn-theme-kit';
import { myBrandTheme } from './lib/my-brand-theme';

console.log(generateGlobalCSS([myBrandTheme]));
```

Paste the output `[data-theme="my-brand"] { ... }` into your `globals.css` base layer.

### 3. Provide to the App

Pass your custom theme to the provider (and don't forget the built-in presets if you still want them).

```tsx
// app/providers.tsx
import { ThemeProvider, presets } from "shadcn-theme-kit";
import { myBrandTheme } from "@/lib/my-brand-theme";

export function Providers({ children }) {
  return (
    <ThemeProvider 
      themes={[...Object.values(presets), myBrandTheme]}
      defaultTheme="my-brand"
    >
      {children}
    </ThemeProvider>
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
| `storageKey`   | `string`                        | kit default | localStorage key prefix       |

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


---

## License

MIT © Sohel Rahaman

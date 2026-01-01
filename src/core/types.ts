/**
 * shadcn-theme-kit - Core Types
 *
 * Type definitions for theme configuration.
 * Author: Sohel Rahaman
 */

/**
 * Theme mode options
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Resolved theme mode (actual applied mode)
 */
export type ResolvedMode = "light" | "dark";

/**
 * Color palette matching shadcn/ui CSS variables
 */
export type ColorPalette = {
  readonly background: string;
  readonly foreground: string;
  readonly card: string;
  readonly cardForeground: string;
  readonly popover: string;
  readonly popoverForeground: string;
  readonly primary: string;
  readonly primaryForeground: string;
  readonly secondary: string;
  readonly secondaryForeground: string;
  readonly muted: string;
  readonly mutedForeground: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly destructive: string;
  readonly destructiveForeground: string;
  readonly border: string;
  readonly input: string;
  readonly ring: string;
};

/**
 * Partial color palette for overrides
 */
export type PartialColorPalette = Partial<ColorPalette>;

/**
 * Theme configuration
 */
export type ThemeConfig = {
  /** Unique name for the theme (used for localStorage key) */
  readonly name: string;
  /** Light mode colors */
  readonly light: ColorPalette;
  /** Dark mode colors */
  readonly dark: ColorPalette;
  /** Border radius (default: '0.5rem') */
  readonly radius: string;
};

/**
 * Input for createTheme function
 */
export type CreateThemeInput = {
  /** Unique name for the theme */
  readonly name: string;
  /** Light mode colors */
  readonly light: ColorPalette;
  /** Dark mode colors */
  readonly dark: ColorPalette;
  /** Border radius (default: '0.5rem') */
  readonly radius?: string;
};

/**
 * Input for createTheme with scheme preset
 */
export type CreateThemeFromSchemeInput = {
  /** Unique name for the theme */
  readonly name: string;
  /** Base preset scheme name */
  readonly scheme: PresetName;
  /** Override specific colors */
  readonly overrides?: {
    readonly light?: PartialColorPalette;
    readonly dark?: PartialColorPalette;
  };
  /** Border radius (default: '0.5rem') */
  readonly radius?: string;
};

/**
 * Available preset names
 */
export type PresetName =
  | "default"
  | "blue"
  | "rose"
  | "emerald"
  | "orange"
  | "violet"
  | "slate";

/**
 * Theme provider props
 */
export type ThemeProviderProps = {
  /** Single theme */
  readonly theme?: ThemeConfig;
  /** Multiple themes for switching */
  readonly themes?: readonly ThemeConfig[];
  /** Default theme name (when using multiple themes) */
  readonly defaultTheme?: string;
  /** Default mode */
  readonly defaultMode?: ThemeMode;
  /** Custom storage key (default: theme name + '-mode') */
  readonly storageKey?: string;
  /** Children */
  readonly children: React.ReactNode;
};

/**
 * Theme context value
 */
export type ThemeContextValue = {
  /** Current mode setting */
  readonly mode: ThemeMode;
  /** Actual resolved mode (light or dark) */
  readonly resolvedMode: ResolvedMode;
  /** Set the mode */
  readonly setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark */
  readonly toggleMode: () => void;
  /** Current active theme */
  readonly theme: ThemeConfig;
  /** All available themes */
  readonly themes: readonly ThemeConfig[];
  /** Set active theme by name */
  readonly setTheme: (themeName: string) => void;
};

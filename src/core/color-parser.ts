/**
 * shadcn-theme-kit - Color Parser
 *
 * Safe color parsing with whitelist validation.
 * No eval, no regex exec, no dynamic code.
 *
 * Author: Sohel Rahaman
 */

/**
 * Safe CSS color names (subset of valid CSS colors)
 */
const SAFE_COLOR_NAMES: readonly string[] = Object.freeze([
  "transparent",
  "currentColor",
  "inherit",
  "black",
  "white",
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "gray",
  "grey",
  "brown",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "navy",
  "maroon",
  "olive",
  "silver",
  "aqua",
  "fuchsia",
  "aliceblue",
  "antiquewhite",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "blueviolet",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "limegreen",
  "linen",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "oldlace",
  "olivedrab",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "plum",
  "powderblue",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "whitesmoke",
  "yellowgreen",
]);

/**
 * Validates a HEX color - safe pattern check
 */
function isValidHex(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed.startsWith("#")) return false;
  const hex = trimmed.slice(1);
  if (hex.length !== 3 && hex.length !== 6 && hex.length !== 8) return false;
  // Only allow valid hex characters
  for (const char of hex) {
    const code = char.charCodeAt(0);
    const isDigit = code >= 48 && code <= 57; // 0-9
    const isLowerHex = code >= 97 && code <= 102; // a-f
    const isUpperHex = code >= 65 && code <= 70; // A-F
    if (!isDigit && !isLowerHex && !isUpperHex) return false;
  }
  return true;
}

/**
 * Validates a number in range 0-255
 */
function isValidRgbValue(value: string): boolean {
  const trimmed = value.trim();
  const num = parseInt(trimmed, 10);
  return !isNaN(num) && num >= 0 && num <= 255 && String(num) === trimmed;
}

/**
 * Validates a number in range 0-1 (for alpha)
 */
function isValidAlpha(value: string): boolean {
  const trimmed = value.trim();
  const num = parseFloat(trimmed);
  return !isNaN(num) && num >= 0 && num <= 1;
}

/**
 * Validates a percentage value (0-100%)
 */
function isValidPercentage(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed.endsWith("%")) return false;
  const num = parseFloat(trimmed.slice(0, -1));
  return !isNaN(num) && num >= 0 && num <= 100;
}

/**
 * Validates an RGB/RGBA color
 */
function isValidRgb(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  const isRgba = trimmed.startsWith("rgba(");
  const isRgb = trimmed.startsWith("rgb(");

  if (!isRgb && !isRgba) return false;
  if (!trimmed.endsWith(")")) return false;

  const inner = isRgba ? trimmed.slice(5, -1) : trimmed.slice(4, -1);

  const parts = inner.split(",");
  if (isRgba && parts.length !== 4) return false;
  if (isRgb && parts.length !== 3) return false;

  const r = parts[0];
  const g = parts[1];
  const b = parts[2];

  if (r === undefined || g === undefined || b === undefined) return false;
  if (!isValidRgbValue(r) || !isValidRgbValue(g) || !isValidRgbValue(b))
    return false;

  if (isRgba) {
    const a = parts[3];
    if (a === undefined || !isValidAlpha(a)) return false;
  }

  return true;
}

/**
 * Validates an HSL/HSLA color
 */
function isValidHsl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  const isHsla = trimmed.startsWith("hsla(");
  const isHsl = trimmed.startsWith("hsl(");

  if (!isHsl && !isHsla) return false;
  if (!trimmed.endsWith(")")) return false;

  const inner = isHsla ? trimmed.slice(5, -1) : trimmed.slice(4, -1);

  const parts = inner.split(",");
  if (isHsla && parts.length !== 4) return false;
  if (isHsl && parts.length !== 3) return false;

  const h = parts[0];
  const s = parts[1];
  const l = parts[2];

  if (h === undefined || s === undefined || l === undefined) return false;

  // Hue: 0-360 (or any number, as it wraps)
  const hNum = parseFloat(h.trim());
  if (isNaN(hNum)) return false;

  // Saturation and Lightness: 0-100%
  if (!isValidPercentage(s) || !isValidPercentage(l)) return false;

  if (isHsla) {
    const a = parts[3];
    if (a === undefined || !isValidAlpha(a)) return false;
  }

  return true;
}

/**
 * Parses and validates a color value.
 * Returns the original value if valid, null if invalid.
 *
 * SECURITY: Uses whitelist validation, no eval, no dynamic code.
 *
 * @param value - The color value to parse
 * @returns The validated color value or null
 */
export function parseColor(value: string): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed === "") return null;

  // Check safe color names first
  const lowerValue = trimmed.toLowerCase();
  if (SAFE_COLOR_NAMES.includes(lowerValue)) {
    return lowerValue;
  }

  // Check HEX
  if (isValidHex(trimmed)) {
    return trimmed;
  }

  // Check RGB/RGBA
  if (isValidRgb(trimmed)) {
    return trimmed;
  }

  // Check HSL/HSLA
  if (isValidHsl(trimmed)) {
    return trimmed;
  }

  // Unknown format - reject for security
  return null;
}

/**
 * Validates a complete color palette
 */
export function validateColorPalette(palette: Record<string, string>): boolean {
  for (const key of Object.keys(palette)) {
    const value = palette[key];
    if (value === undefined || parseColor(value) === null) {
      return false;
    }
  }
  return true;
}

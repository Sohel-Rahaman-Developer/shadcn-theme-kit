/**
 * shadcn-theme-kit - Presets Module
 *
 * Pre-built theme configurations.
 * Author: Sohel Rahaman
 */

import { defaultPreset } from "./default";
import { bluePreset } from "./blue";
import { rosePreset } from "./rose";
import { emeraldPreset } from "./emerald";
import { orangePreset } from "./orange";
import { violetPreset } from "./violet";
import { slatePreset } from "./slate";

import type { ThemeConfig, PresetName } from "../core/types";

/**
 * All available presets
 */
export const presets = Object.freeze({
  default: defaultPreset,
  blue: bluePreset,
  rose: rosePreset,
  emerald: emeraldPreset,
  orange: orangePreset,
  violet: violetPreset,
  slate: slatePreset,
}) as Readonly<Record<PresetName, ThemeConfig>>;

/**
 * Get a preset by name
 */
export function getPreset(name: PresetName): ThemeConfig {
  const preset = presets[name];
  if (!preset) {
    throw new Error(
      `Unknown preset: "${name}". Available presets: ${Object.keys(
        presets
      ).join(", ")}`
    );
  }
  return preset;
}

/**
 * List of all preset names
 */
export const presetNames: readonly PresetName[] = Object.freeze([
  "default",
  "blue",
  "rose",
  "emerald",
  "orange",
  "violet",
  "slate",
]);

// Re-export individual presets
export { defaultPreset } from "./default";
export { bluePreset } from "./blue";
export { rosePreset } from "./rose";
export { emeraldPreset } from "./emerald";
export { orangePreset } from "./orange";
export { violetPreset } from "./violet";
export { slatePreset } from "./slate";

import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "core/index": "src/core/index.ts",
    "presets/index": "src/presets/index.ts",
    "react/index": "src/react/index.tsx",
    ThemeScript: "src/react/theme-script.tsx",
    "utils/cookies": "src/utils/cookies.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react"],
});

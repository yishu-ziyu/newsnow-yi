import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { hex2rgba } from "@unocss/rule-utils";
import { sources } from "./shared/sources";

export default defineConfig({
  mergeSelectors: false,
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  rules: [
    [
      /^sprinkle-(.+)$/,
      ([_, d], { theme }) => {
        // @ts-expect-error >_<
        const hex: any = theme.colors?.[d]?.[400];
        if (hex) {
          return {
            "background-image": `radial-gradient(ellipse 80% 80% at 50% -30%,
         rgba(${hex2rgba(hex)?.join(", ")}, 0.3), rgba(255, 255, 255, 0));`,
          };
        }
      },
    ],
    [
      "font-brand",
      {
        "font-family": `"Baloo 2", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace; `,
      },
    ],
  ],
  shortcuts: {
    "color-base": "text-ink-text",
    "bg-base": "bg-paper-bg",
    btn: "op50 hover:op85 cursor-pointer transition-all",
  },
  safelist: [
    ...["orange", ...new Set(Object.values(sources).map((k) => k.color))]
      .map((k) =>
        `bg-${k} color-${k} border-${k} sprinkle-${k} shadow-${k}
       bg-${k}-500 color-${k}-500
       dark:bg-${k} dark:color-${k}`
          .trim()
          .split(/\s+/)
      )
      .flat(),
  ],
  extendTheme: (theme) => {
    // @ts-expect-error >_<
    theme.colors.primary = theme.colors.red;

    // Warm Paper Palette
    // @ts-expect-error >_<
    theme.colors["paper-bg"] = "#F9F7F1";
    // @ts-expect-error >_<
    theme.colors["ink-text"] = "#2C2C2C";
    // @ts-expect-error >_<
    theme.colors["rust-accent"] = "#C16240";
    // @ts-expect-error >_<
    theme.colors["taupe-secondary"] = "#8B8580";
    // @ts-expect-error >_<
    theme.colors["boundary-border"] = "#E5E0D8";

    // @ts-expect-error >_<
    theme.fontFamily = {
      ...theme.fontFamily,
      "serif-heading": "'EB Garamond', 'Noto Serif SC', serif",
      "serif-body": "'Noto Serif SC', serif",
      sans: "'Inter', sans-serif",
    };

    return theme;
  },
});

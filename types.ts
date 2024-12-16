import z from "npm:zod";

export const ThemeSchema = z.enum([
  "catppuccin",
  "nord",
  "nordic",
  "onedark",
  "tokyonight",
]);
export type Theme = z.infer<typeof ThemeSchema>;

export const ThemeV2Scheme = z.discriminatedUnion("theme", [
  z.object({
    theme: z.literal("catppuccin"),
    variant: z.enum(["mocha", "frappe", "latte", "macchiato"]).optional(),
  }),
  z.object({
    theme: z.literal("nord"),
    variant: z.null().optional(),
  }),
  z.object({
    theme: z.literal("nordic"),
    variant: z.null().optional(),
  }),
  z.object({
    theme: z.literal("onedark"),
    variant: z.null().optional(),
  }),
  z.object({
    theme: z.literal("tokyonight"),
    variant: z.enum(["moon", "night", "storm"]).optional(),
  }),
]);
export type ThemeV2 = z.infer<typeof ThemeV2Scheme>;

export const ConfigSchema = z.enum(["Starship", "Nvim", "Wezterm", "Code"]);
export type Config = z.infer<typeof ConfigSchema>;

export const SetThemeConst = z.object({
  theme: ThemeSchema,
  sourcePath: z.string(),
  targetPath: z.string(),
  config: ConfigSchema.optional(),
  cb: z.function().optional(),
});
export type SetTheme = z.infer<typeof SetThemeConst>;

export type SetThemeCallback = (param: SetTheme) => Promise<void>;

export type SetConfigTheme = {
  theme: ThemeV2;
  setThemeCallback: SetThemeCallback;
};

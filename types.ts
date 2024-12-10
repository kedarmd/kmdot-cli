import z from "npm:zod";

export const ThemeSchema = z.enum([
  "catppuccin",
  "nord",
  "nordic",
  "onedark",
  "tokyonight",
]);
export type Theme = z.infer<typeof ThemeSchema>;

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
  theme: SetTheme["theme"];
  setThemeCallback: SetThemeCallback;
};

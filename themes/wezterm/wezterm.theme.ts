import { joinGlobs } from "@std/path/join-globs";
import { SetConfigTheme } from "../../types.ts";

const setWeztermTheme = async ({ theme, setThemeCallback }: SetConfigTheme) => {
  const sourcePath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "themes",
    "wezterm",
    `${theme}.lua`,
  ]);
  const targetPath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "wezterm-theme.lua",
  ]);
  const wezterFilePath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "wezterm.lua",
  ]);
  await setThemeCallback({ theme, sourcePath, targetPath });
  await setThemeCallback({
    theme,
    sourcePath: wezterFilePath,
    targetPath: wezterFilePath,
    config: "Wezterm",
  });
};

export { setWeztermTheme };

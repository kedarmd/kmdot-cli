import { joinGlobs } from "@std/path/join-globs";
import { SetTheme } from "../../types.ts";

export function setWeztermTheme(
  { theme, setThemeCallback }: {
    theme: string;
    setThemeCallback: (param: SetTheme) => Promise<void>;
  },
) {
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
  setThemeCallback({ theme, sourcePath, targetPath });
  setThemeCallback({
    theme,
    sourcePath: wezterFilePath,
    targetPath: wezterFilePath,
    config: "Wezterm",
  });
}

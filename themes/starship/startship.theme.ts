import { joinGlobs } from "@std/path/join-globs";
import { SetTheme } from "../../types.ts";

/**
 * Function to update Startship theme
 */
export function setStarshipTheme(
  { theme, setThemeCallback }: {
    theme: string;
    setThemeCallback: (param: SetTheme) => Promise<void>;
  },
) {
  const targetPath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "config",
    "starship.toml",
  ]);
  const sourcePath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "themes",
    "starship",
    `${theme}.toml`,
  ]);
  setThemeCallback({ theme, sourcePath, targetPath, config: "Starship" });
}

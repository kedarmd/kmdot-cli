import { joinGlobs } from "@std/path/join-globs";
import { SetConfigTheme } from "../../types.ts";

/**
 * Function to update Startship theme
 */
const setStarshipTheme = async (
  { theme, setThemeCallback }: SetConfigTheme,
) => {
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
  await setThemeCallback({ theme, sourcePath, targetPath, config: "Starship" });
};

export { setStarshipTheme };

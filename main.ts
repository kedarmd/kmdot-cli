import { parseArgs } from "@std/cli/parse-args";
import {
  setCodeTheme,
  setNvimTheme,
  setStarshipTheme,
  setWeztermTheme,
} from "./themes/index.ts";
import { SetTheme, ThemeSchema } from "./types.ts";
import { z } from "npm:zod";

const THEME_NAMES = ["catppuccin", "nord", "nordic", "onedark", "tokyonight"];

const setTheme = async (
  { theme, sourcePath, targetPath, config, cb }: SetTheme,
) => {
  try {
    const sourceContent = await Deno.readTextFile(sourcePath);
    await Deno.writeTextFile(targetPath, sourceContent);
    cb && cb();
  } catch (error) {
    const err = error as Error;
    console.error(
      `Error while updating theme ${theme} for ${config}: ${err}`,
      err.message,
    );
  }
};

async function main() {
  try {
    const args = Deno.args;
    const parsedArgs = parseArgs(args, {
      string: ["theme", "variant"],
      alias: {
        theme: ["t"],
        variant: ["v"],
      },
      default: { theme: "catppuccin" },
      unknown: (arg) => {
        console.error(`%c Unknown argument: ${arg}`, "color: red");
        Deno.exit(1);
      },
    });
    const theme = ThemeSchema.parse(parsedArgs.theme);

    const promises = [
      setStarshipTheme({
        theme: theme,
        setThemeCallback: setTheme,
      }),
      setNvimTheme({
        theme: theme as SetTheme["theme"],
        setThemeCallback: setTheme,
      }),
      setWeztermTheme({
        theme: theme as SetTheme["theme"],
        setThemeCallback: setTheme,
      }),
      setCodeTheme({ theme }),
    ];
    await Promise.all(promises);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(`Usage: kmdot -t < ${THEME_NAMES.join(" | ")} >`);
      Deno.exit(1);
    }
    const err = error as Error;
    console.error(`Error: ${err.message}`, err);
    Deno.exit(1);
  }
}

main();

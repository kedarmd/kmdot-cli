import { parseArgs } from "@std/cli/parse-args";
import {
  setNvimTheme,
  setStarshipTheme,
  setWeztermTheme,
} from "./themes/index.ts";
import { SetTheme } from "./types.ts";

const THEME_NAMES = ["catppuccin", "nord", "nordic", "onedark", "tokyonight"];

const setTheme = async (
  { theme, sourcePath, targetPath, config, cb }: SetTheme,
) => {
  try {
    const sourceContent = await Deno.readTextFile(sourcePath);
    await Deno.writeTextFile(targetPath, sourceContent);
    config && console.info(`${config} theme changed to ${theme}`);
    cb && cb();
  } catch (error) {
    const err = error as Error;
    console.error(`Error while updating theme: ${err}`, err.message);
  }
};

async function main() {
  const args = Deno.args;
  const parsedArgs = parseArgs(args, {
    string: ["theme", "variant"],
    alias: {
      theme: ["t"],
      variant: ["v"],
    },
  });
  const { theme } = parsedArgs;
  if (!theme || !THEME_NAMES.includes(theme)) {
    console.log(`Usage: kmdot < ${THEME_NAMES.join(" | ")} >`);
    Deno.exit(1);
  }
  const promises = [
    setStarshipTheme({ theme, setThemeCallback: setTheme }),
    setNvimTheme({ theme, setThemeCallback: setTheme }),
    setWeztermTheme({ theme, setThemeCallback: setTheme }),
  ];
  await Promise.all(promises);
}

main();

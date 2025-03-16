import {
  setCodeTheme,
  setNvimTheme,
  setStarshipTheme,
  setWeztermTheme,
} from "./themes/index.ts";
import type { SetTheme } from "./types.ts";
import { argParser } from "./helpers/parser.ts";

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
    const theme = argParser(args);

    const promises = [
      setStarshipTheme({ theme, setThemeCallback: setTheme }),
      setNvimTheme({ theme, setThemeCallback: setTheme }),
      setWeztermTheme({ theme, setThemeCallback: setTheme }),
      setCodeTheme(theme),
    ];
    await Promise.all(promises);
  } catch (error) {
    const err = error as Error;
    console.error(`Error: ${err.message}`, err);
    Deno.exit(1);
  }
}

await main();

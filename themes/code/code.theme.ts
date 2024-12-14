import { joinGlobs } from "@std/path/join-globs";

const CODE_THEMES: Record<string, string> = {
  "catppuccin": "Catppuccin Mocha",
  "nord": "Nord",
  "nordic": "Nord",
  "onedark": "One Dark Pro",
  "tokyonight": "Tokyo Night",
};

const LINUX_CODE_SETTINGS_PATH = joinGlobs([
  Deno.env.get("HOME")!,
  ".config",
  "Code",
  "User",
  "settings.json",
]);

const MAC_CODE_SETTINGS_PATH = joinGlobs([
  Deno.env.get("HOME")!,
  "Library",
  "Application Support",
  "Code",
  "User",
  "settings.json",
]);

/**
 * Function to update VS Code theme
 * @param {string} theme
 * @returns {Promise<void>}
 */
const setCodeTheme = async ({ theme }: {
  theme: string;
}): Promise<void> => {
  const os = Deno.build.os;
  const codeSettingsPath = os === "linux"
    ? LINUX_CODE_SETTINGS_PATH
    : MAC_CODE_SETTINGS_PATH;
  const codeConfig = JSON.parse(await Deno.readTextFile(codeSettingsPath));
  const vscodeTheme = CODE_THEMES[theme];
  if (vscodeTheme) {
    codeConfig["workbench.colorTheme"] = vscodeTheme;
    await Deno.writeTextFile(
      codeSettingsPath,
      JSON.stringify(codeConfig, null, 2),
    );
    return;
  }
  console.error(`Theme ${theme} not found for VS Code`);
};

export { setCodeTheme };

import { joinGlobs } from "@std/path/join-globs";

const CODE_THEMES: Record<string, string> = {
  "catppuccin": "Catppuccin Mocha",
  "nord": "Nord",
  "nordic": "Nord",
  "onedark": "One Dark Pro",
  "tokyonight": "Tokyo Night",
};

/**
 * Function to update Code theme
 * @param {string} theme
 * @returns {Promise<void>}
 */
export async function setCodeTheme({ theme }: {
  theme: string;
}) {
  const codeSettingsPath = joinGlobs([
    Deno.env.get("HOME")!,
    ".config",
    "Code",
    "User",
    "settings.json",
  ]);
  const codeConfig = JSON.parse(await Deno.readTextFile(codeSettingsPath));
  codeConfig["workbench.colorTheme"] = CODE_THEMES[theme];
  await Deno.writeTextFile(
    codeSettingsPath,
    JSON.stringify(codeConfig, null, 2),
  );
}

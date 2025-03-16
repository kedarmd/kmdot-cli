import { joinGlobs } from "@std/path/join-globs";
import type { ThemeV2 } from "../../types.ts";

const CODE_THEMES: Record<
  ThemeV2["theme"],
  Record<string | "default", string> | null
> = {
  "catppuccin": {
    mocha: "Catppuccin Mocha",
    frappe: "Catppuccin Frappé",
    latte: "Catppuccin Latte",
    macchiato: "Catppuccin Macchiato",
    default: "Catppuccin Mocha",
  },
  "tokyonight": {
    moon: "Tokyo Night",
    night: "Tokyo Night",
    storm: "Tokyo Night Storm",
    default: "Tokyo Night",
  },
  "nord": { default: "Nord" },
  "nordic": { default: "Nord" },
  "onedark": { default: "One Dark Pro" },
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
 * @param {ThemeV2} theme
 * @returns {Promise<void>}
 */
const setCodeTheme = async ({ theme, variant }: ThemeV2): Promise<void> => {
  const os = Deno.build.os;
  const codeSettingsPath = os === "linux"
    ? LINUX_CODE_SETTINGS_PATH
    : MAC_CODE_SETTINGS_PATH;
  const vscodeTheme = variant
    ? CODE_THEMES[theme]?.[variant]
    : CODE_THEMES[theme]?.default;
  if (vscodeTheme) {
    const codeConfig = JSON.parse(await Deno.readTextFile(codeSettingsPath));
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

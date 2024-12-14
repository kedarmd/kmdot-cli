import { joinGlobs } from "@std/path/join-globs";
import type { SetConfigTheme } from "../../types.ts";

const setNvimTheme = async (
  { theme: { theme, variant }, setThemeCallback }: SetConfigTheme,
) => {
  const homePath = Deno.env.get("HOME")!;
  const sourcePath = joinGlobs([
    homePath,
    "development",
    "dotfiles",
    "themes",
    "nvim",
    `${theme}.lua`,
  ]);
  const targetPath = joinGlobs([
    homePath,
    "development",
    "dotfiles",
    "config",
    "nvim",
    "lua",
    "plugins",
    "colorscheme.lua",
  ]);
  const servers = await getNvimServers();
  const cb = () => {
    setTimeout(() => {
      const nvimCommand = variant
        ? `:colorscheme ${theme}-${variant}<CR>`
        : `:colorscheme ${theme}<CR>`;
      for (const server of servers) {
        const command = new Deno.Command("nvim", {
          args: [
            "--server",
            `/tmp/${server}`,
            "--remote-send",
            nvimCommand,
          ],
        });
        command.output();
      }
    }, 2000);
  };
  setThemeCallback({ sourcePath, targetPath, theme, cb, config: "Nvim" });
};

const getNvimServers = async () => {
  const servers: string[] = [];
  const dir = "/tmp";
  const files = Deno.readDir(dir);
  for await (const file of files) {
    if (file.name.startsWith("nvim-")) {
      servers.push(file.name);
    }
  }
  return servers;
};

export { setNvimTheme };

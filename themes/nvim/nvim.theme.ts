import { joinGlobs } from "@std/path/join-globs";
import { SetTheme } from "../../types.ts";

export const setNvimTheme = async (
  { theme, setThemeCallback }: {
    theme: string;
    setThemeCallback: (param: SetTheme) => Promise<void>;
  },
) => {
  const sourcePath = joinGlobs([
    Deno.env.get("HOME")!,
    "development",
    "dotfiles",
    "themes",
    "nvim",
    `${theme}.lua`,
  ]);
  const targetPath = joinGlobs([
    Deno.env.get("HOME")!,
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
      for (const server of servers) {
        const command = new Deno.Command("nvim", {
          args: [
            "--server",
            `/tmp/${server}`,
            "--remote-send",
            `:colorscheme ${theme}<CR>`,
          ],
        });
        command.output();
      }
    }, 2000);
  };
  setThemeCallback({ sourcePath, targetPath, theme, cb, config: "Neovim" });
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

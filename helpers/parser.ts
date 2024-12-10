import { parseArgs } from "@std/cli/parse-args";
import { Theme, ThemeSchema } from "../types.ts";
import { z } from "npm:zod";

/**
 * Parse command line arguments
 * @param {string[]} args
 * @returns {Theme} theme
 */
export const argParser = (args: string[]): Theme => {
  try {
    const parsedArgs = parseArgs(args, {
      string: ["theme", "variant"],
      alias: {
        theme: ["t"],
        variant: ["v"],
      },
      default: { theme: "catppuccin" },
      unknown: (arg) => {
        console.error(`%cUnknown argument: ${arg}`, "color: red");
        Deno.exit(1);
      },
    });
    const theme = ThemeSchema.parse(parsedArgs.theme);
    return theme;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const t = Object.values(ThemeSchema.Values);
      console.log(`Usage: kmdot -t < ${t.join(" | ")} >`);
      Deno.exit(1);
    }
    throw error;
  }
};

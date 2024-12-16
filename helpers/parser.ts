import { parseArgs } from "@std/cli/parse-args";
import { ThemeSchema, ThemeV2Scheme } from "../types.ts";
import { z } from "npm:zod";
import { ThemeV2 } from "../types.ts";

/**
 * Parse command line arguments
 * @param {string[]} args
 * @returns {ThemeV2} theme
 */
export const argParser = (args: string[]): ThemeV2 => {
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
    const theme = ThemeV2Scheme.parse(parsedArgs);
    return theme;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const t = Object.values(ThemeSchema.Values);
      const fieldErrors = error.flatten().fieldErrors;
      for (const field in fieldErrors) {
        console.error(
          `%c${field}: ${fieldErrors[field]}`,
          "color: red",
        );
      }
      console.log(
        `Usage: kmdot -t %c< ${t.join(" | ")} >%c -v %c<variant>`,
        "color: blue",
        "color: white",
        "color: blue",
      );
      Deno.exit(1);
    }
    throw error;
  }
};

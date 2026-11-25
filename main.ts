// The meeting about meetings: the punchline is the calendar itself.
// Every office has lived this joke; the trick is landing it in one breath.
import { mkdirSync } from "node:fs";
import { writeFileSync } from "node:fs";
import { join as joinPath } from "node:path";

const JOKE =
  "My boss scheduled a meeting to discuss why we have too many meetings, then scheduled a follow-up to discuss the first meeting.";

const RULES = Object.freeze({ maxChars: 200, fileName: "entry.txt" });

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function main(): void {
  if (JOKE.length > RULES.maxChars) throw new Error("joke is too long");
  if (countWords(JOKE) < 5) throw new Error("joke is too short to land");
  if (!JOKE.includes("meeting")) throw new Error("joke must be about a meeting");
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(joinPath(dir, RULES.fileName), JOKE, "utf8");
}

main();

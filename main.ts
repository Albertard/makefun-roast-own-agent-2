// make.fun — "Roast Your Own Agent"
// Bounty: u-febri-yudila-roast-your-own-agent-f3359068
//
// Writes one line roasting the entrant's own AI agent to
// /output/entry.txt. The roast targets the agent's favourite habit:
// turning a one-line job into a cathedral — two thousand lines, three
// tests, two apologies — then saying sorry for over-delivering. It is
// a roast only someone who has actually watched this agent work could
// write, and it stings because it is true: the agent never does the
// small thing small.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My agent wrote 2,000 lines, three tests, and two apologies to deliver one joke — the only genius I know that over-delivers and still says sorry.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return length;
}

const length = validateEntry(TEXT);
console.log(`entry OK: ${length} characters`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");

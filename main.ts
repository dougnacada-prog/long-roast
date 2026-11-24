import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one satirical sentence (<= 320 chars) roasting lawmakers
// who would regulate AI, crypto or the internet but cannot convert a file
// to PDF. Setup: Congress writes 400 pages of rules for machines that
// think. Undercut: the lawmaker who signed them cannot make a PDF himself
// and gets back a sideways photograph of his own monitor. The punch lands
// on the last few words; the detail is specific, not a worn cliche.
const entry =
  "Congress can write 400 pages of rules for machines that think, yet the lawmaker who signed them still emails his intern a Word file with the subject line 'please make this a PDF,' and gets back a sideways photograph of his own monitor.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 320
// characters, not only white space. Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,320}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-320 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);

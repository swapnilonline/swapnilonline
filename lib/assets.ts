import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * The studio portrait (dark backdrop) lives at public/swapnil-portrait.jpg.
 * Until that file is added, pages fall back to the cut-out headshot.
 * Server components only.
 */
export function portrait(): { src: string; width: number; height: number; studio: boolean } {
  const studio = existsSync(join(process.cwd(), "public", "swapnil-portrait.jpg"));
  return studio
    ? { src: "/swapnil-portrait.jpg", width: 1319, height: 1193, studio: true }
    : { src: "/swapnil.png", width: 610, height: 564, studio: false };
}

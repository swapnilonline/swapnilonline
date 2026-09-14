import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { extractFaq, renderMarkdown } from "./markdown";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  updated?: string;
  keywords: string[];
  cluster: string;
  related: string[];
  readingMinutes: number;
  html: string;
  faq: { q: string; a: string }[];
  headings: { id: string; text: string }[];
};

const DIR = join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: m[2] };
}

function load(slug: string): Post {
  const raw = readFileSync(join(DIR, `${slug}.md`), "utf8");
  const { meta, body } = parseFrontmatter(raw);
  const words = body.split(/\s+/).filter(Boolean).length;
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => ({
    id: h[1].trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"),
    text: h[1].trim(),
  }));
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? "2026-09-15",
    updated: meta.updated,
    keywords: (meta.keywords ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    cluster: meta.cluster ?? "",
    related: (meta.related ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: renderMarkdown(body),
    faq: extractFaq(body),
    headings,
  };
}

export function allPosts(): Post[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => load(f.replace(/\.md$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  try {
    return load(slug);
  } catch {
    return null;
  }
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Tiny Markdown → HTML renderer for our own blog files. No dependency.
 * Supports: h2/h3, paragraphs, bullet and numbered lists, bold, italic,
 * links, blockquotes, horizontal rules, and simple pipe tables.
 * Input is trusted (our repo), but text is still HTML-escaped.
 */
function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(s: string) {
  let out = esc(s);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
    const external = /^https?:\/\//.test(href) && !href.includes("swapnilonline.com");
    return `<a href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${text}</a>`;
  });
  return out;
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let i = 0;
  const flushPara = (buf: string[]) => {
    if (buf.length) html.push(`<p>${inline(buf.join(" "))}</p>`);
    buf.length = 0;
  };
  const para: string[] = [];

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { flushPara(para); i++; continue; }
    if (/^---+\s*$/.test(line)) { flushPara(para); html.push("<hr>"); i++; continue; }
    const h = line.match(/^(##|###)\s+(.+)$/);
    if (h) {
      flushPara(para);
      const level = h[1].length;
      const text = h[2].trim();
      html.push(`<h${level} id="${slugify(text)}">${inline(text)}</h${level}>`);
      i++; continue;
    }
    if (/^>\s?/.test(line)) {
      flushPara(para);
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
      html.push(`<blockquote><p>${inline(q.join(" "))}</p></blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara(para);
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
      html.push(`<ul>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      flushPara(para);
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+[.)]\s+/, "")); i++; }
      html.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`);
      continue;
    }
    if (/^\|/.test(line)) {
      flushPara(para);
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      if (rows.length) {
        const [head, ...body] = rows;
        html.push(
          `<div class="tablewrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>` +
          `<tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
        );
      }
      continue;
    }
    para.push(line.trim());
    i++;
  }
  flushPara(para);
  return html.join("\n");
}

/** Pull "### Question" + following paragraph pairs from a "## Frequently asked questions" section. */
export function extractFaq(md: string): { q: string; a: string }[] {
  const idx = md.search(/^## Frequently asked questions\s*$/m);
  if (idx === -1) return [];
  const section = md.slice(idx).split(/^## (?!Frequently)/m)[0];
  const out: { q: string; a: string }[] = [];
  const re = /^### (.+)\n+([\s\S]*?)(?=^### |\s*$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) out.push({ q: m[1].trim(), a: m[2].trim().replace(/\n+/g, " ") });
  return out;
}

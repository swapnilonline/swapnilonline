import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-[17px] font-extrabold text-ink">{site.name}</p>
          <p className="text-[16px] text-ink-soft">{site.role}</p>
          <p className="font-mono text-[12.5px] text-ink-soft">
            {site.years} · {site.websites}
          </p>
          {site.whatsapp && (
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-[15px] font-bold text-accent no-underline hover:underline"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp +91 98193 59393
            </a>
          )}
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-[16px]">
          <Link href="/fit" className="text-ink-soft no-underline hover:text-ink">Take the Fit Score</Link>
          <Link href="/program" className="text-ink-soft no-underline hover:text-ink">HOME → BUSINESS program</Link>
          <Link href="/call" className="text-ink-soft no-underline hover:text-ink">Apply for a Launch Call</Link>
          <Link href="/blog" className="text-ink-soft no-underline hover:text-ink">Blog</Link>
          <Link href="/about" className="text-ink-soft no-underline hover:text-ink">About Swapnil</Link>
          <Link href="/privacy" className="text-ink-soft no-underline hover:text-ink">Privacy</Link>
          <Link href="/refunds" className="text-ink-soft no-underline hover:text-ink">Refunds and guarantee</Link>
        </nav>
        <p className="font-mono text-[12.5px] text-ink-soft sm:text-right">
          © {year} {site.domain}
          <br />
          Built from home.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line border-t-[3px] border-t-mark bg-ground">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="font-display text-[22px] font-extrabold tracking-tight text-ink no-underline sm:text-[26px]"
          onClick={() => setOpen(false)}
        >
          swapnil<span className="text-accent">online</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 sm:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path === n.href ? "page" : undefined}
              className={`font-display text-[15px] font-bold no-underline ${
                path === n.href ? "text-ink underline underline-offset-8 decoration-accent decoration-2" : "text-ink-soft hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/call" className="btn btn-primary !min-h-[42px]">
            Apply for a Launch Call
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-surface px-5 py-4 sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={path === n.href ? "page" : undefined}
                  className="block py-3 font-display text-[17px] font-bold text-ink no-underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/call" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Apply for a Launch Call
              </Link>
            </li>
          </ul>
          <p className="mt-4 font-mono text-[12px] text-ink-soft">
            {site.years} · {site.websites}
          </p>
        </nav>
      )}
    </header>
  );
}

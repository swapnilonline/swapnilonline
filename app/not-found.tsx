import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="max-w-[18ch] text-[40px] font-extrabold sm:text-[52px]">
        That page moved, or never existed.
      </h1>
      <p className="measure text-[19px] text-ink-soft">
        The site was rebuilt around one thing: helping you launch a business from home. Start
        with the Fit Score, or go to the program.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/fit" className="btn btn-primary">
          Get your Fit Score <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="/program" className="btn btn-ghost">
          See the program
        </Link>
      </div>
    </div>
  );
}

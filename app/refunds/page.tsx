import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refunds and guarantee",
  description: "The refund terms, the first-client guarantee, and an honest note on earnings.",
};

const updated = "14 September 2026";

export default function RefundsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <article className="flex max-w-[68ch] flex-col gap-8 py-16 sm:py-20">
        <header className="flex flex-col gap-4">
          <p className="eyebrow">Refunds and guarantee · updated {updated}</p>
          <h1 className="text-[40px] font-extrabold sm:text-[52px]">The terms, in one page.</h1>
          <p className="text-[19px] text-ink-soft">
            These apply to {site.foundation} and {site.program}, sold by {site.name}.
          </p>
        </header>

        <Section title="The first-client guarantee">
          <p>
            If you attend your weekly sessions and ship what we agree each week, and you do not
            have a paying client by day 90 of the Challenge, Swapnil keeps working with you at no
            extra cost until you do. This is written into the agreement you sign at enrolment.
          </p>
        </Section>

        <Section title="Refunds">
          <p>
            <b>The 90-Day Challenge:</b> a full refund is available within 7 days of your first
            session if you decide the program is not for you. After that, no refund on fees paid,
            because the work delivered in each week cannot be returned. Instalments already due
            remain payable; future instalments stop if you leave.
          </p>
          <p>
            <b>The 7-Day Foundation:</b> refundable in full up to 24 hours before the call. The
            fee is credited toward the Challenge if you join within 60 days.
          </p>
          <p>
            <b>The free call:</b> free. Please cancel or reschedule through the calendar link if you
            cannot make it, so the slot goes to someone else.
          </p>
        </Section>

        <Section title="An honest note on earnings">
          <p>
            No income is promised. ₹3,00,000 a month of recurring income is the target the
            Challenge is designed around, and the plan to reach it is worked out for your case on
            the free call. What you
            actually earn depends on your skill, your market, your price and the work you put in.
            Some people reach the number in months, some take longer, some do not. Reviews on this
            site are real and unedited, and they describe those people&rsquo;s experience, not a
            guarantee of yours.
          </p>
        </Section>

        <Section title="Questions">
          <p>
            Email <a href="mailto:contact@swapnilonline.com">contact@swapnilonline.com</a>.
          </p>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-line pt-6 text-[17.5px]">
      <h2 className="text-[24px] font-bold">{title}</h2>
      {children}
    </section>
  );
}

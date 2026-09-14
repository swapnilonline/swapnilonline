import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What swapnilonline.com collects, why, and how to have it removed.",
};

const updated = "14 September 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <article className="flex max-w-[68ch] flex-col gap-8 py-16 sm:py-20">
        <header className="flex flex-col gap-4">
          <p className="eyebrow">Privacy · updated {updated}</p>
          <h1 className="text-[40px] font-extrabold sm:text-[52px]">Plain-language privacy.</h1>
          <p className="text-[19px] text-ink-soft">
            This site is run by {site.name}, trading as {site.domain}, India. Here is what is
            collected and what happens to it.
          </p>
        </header>

        <Section title="What is collected">
          <p>
            When you take the Fit Score you give your first name, WhatsApp number, email and
            your answers to eight questions. When you apply for a Launch Call you give your name,
            WhatsApp number, email and answers about your skill, goals, time and readiness.
          </p>
          <p>Nothing is collected from you if you only browse.</p>
        </Section>

        <Section title="Why">
          <p>
            To send you your result and the 7-Day Launch Map, to prepare for your call, and to
            contact you about the HOME → BUSINESS program. You agree to WhatsApp and email
            messages when you tick the box on the form. You can stop them at any time by replying
            STOP or emailing the address below.
          </p>
        </Section>

        <Section title="Where it goes">
          <p>
            Submissions are forwarded to a private Google Sheet and to Swapnil&rsquo;s email. Calls
            are booked through Calendly, which has its own privacy policy. Meetings run on Zoom.
            Nothing is sold or shared with advertisers.
          </p>
        </Section>

        <Section title="Cookies and analytics">
          <p>
            The site uses no advertising cookies. If analytics is enabled it is Google Analytics
            with IP anonymisation, used only to count visits.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Ask at any time to see, correct or delete what is held about you. Email{" "}
            <a href="mailto:contact@swapnilonline.com">contact@swapnilonline.com</a> from the
            address you used and it will be done within 7 days.
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

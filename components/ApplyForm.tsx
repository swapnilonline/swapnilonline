"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

type Errors = Record<string, string>;
type Ready = "now" | "soon" | "exploring";

const hoursOptions = [
  { value: "lt5", label: "Under 5 hours" },
  { value: "5to10", label: "5 to 10 hours" },
  { value: "10plus", label: "More than 10 hours" },
];

const readyOptions: { value: Ready; label: string }[] = [
  { value: "now", label: "Yes, I'm ready now" },
  { value: "soon", label: "Yes, within the next 3 months" },
  { value: "exploring", label: "Not right now, I'm just exploring" },
];

export default function ApplyForm({
  segment,
  stage,
  skill,
}: {
  segment?: string;
  stage?: string;
  skill?: string;
}) {
  const [f, setF] = useState({
    name: "",
    whatsapp: "",
    email: "",
    skill: skill ?? "",
    ninety: "",
    hours: "",
    ready: "" as Ready | "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [hp, setHp] = useState("");
  const [done, setDone] = useState<Ready | null>(null);

  function up<K extends keyof typeof f>(k: K, v: (typeof f)[K]) {
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...f, segment, stage, website: hp }),
      });
      const json = (await res.json()) as { ok: boolean; errors?: Errors; ready?: Ready };
      if (!json.ok) {
        setErrors(json.errors ?? { form: "Something went wrong. Try again." });
        setBusy(false);
        return;
      }
      setDone(json.ready ?? "now");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
      setBusy(false);
    }
  }

  if (done === "exploring") {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-[28px] font-bold leading-tight sm:text-[34px]">
          Thanks, {f.name.split(" ")[0]}. Let&rsquo;s start smaller.
        </h2>
        <p className="measure text-[18px]">
          The Launch Call is for people ready to build in the next 90 days, so I&rsquo;ll hold it for
          now. Two things that will help you today:
        </p>
        <div className="flex flex-col gap-4 border border-line bg-surface p-6">
          <p className="font-display text-[20px] font-bold">Offer Design Intensive</p>
          <p className="text-[17px] text-ink-soft">
            One 90-minute 1:1 session. You leave with a written one-page offer: result, customer,
            price, timeline. ₹7,500, credited in full toward the program within 60 days.
          </p>
          <Link href="/program" className="btn btn-ghost self-start">
            Read about it
          </Link>
        </div>
        <p className="text-[17px] text-ink-soft">
          You&rsquo;ll also keep getting the 7-Day Launch Map on WhatsApp, and a short note from me
          once a month. When the timing is right, apply again.
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-[28px] font-bold leading-tight sm:text-[34px]">
          Application received. Pick a time.
        </h2>
        <p className="measure text-[18px]">
          Thanks, {f.name.split(" ")[0]}. I&rsquo;ll read your answers before we speak. Choose a slot
          below. You&rsquo;ll get a WhatsApp reminder the day before and an hour before.
        </p>
        {site.calUrl ? (
          <>
            <iframe
              title="Book your Launch Call"
              src={site.calUrl}
              className="min-h-[720px] w-full border border-line bg-surface"
              loading="lazy"
            />
            <a href={site.calUrl} className="btn btn-ghost self-start" target="_blank" rel="noreferrer">
              Open the calendar in a new tab <ArrowRight size={18} aria-hidden="true" />
            </a>
          </>
        ) : (
          <p className="border-l-[3px] border-mark bg-mark-soft/60 px-6 py-5 text-[17px]">
            The booking calendar isn&rsquo;t connected yet. Swapnil will message you on WhatsApp within
            one working day to fix a time.
          </p>
        )}
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="text-[15px] text-danger">
        {errors[k]}
      </p>
    ) : null;

  const field = (k: keyof typeof f) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-7">
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website-hp">Website</label>
            <input id="website-hp" name="website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-display text-[15px] font-bold">Your name</label>
          <input id="name" className="field" autoComplete="name" value={f.name} onChange={(e) => up("name", e.target.value)} required {...field("name")} />
          {err("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className="font-display text-[15px] font-bold">WhatsApp number</label>
          <input id="whatsapp" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={f.whatsapp} onChange={(e) => up("whatsapp", e.target.value)} required {...field("whatsapp")} />
          {err("whatsapp")}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="email" className="font-display text-[15px] font-bold">Email</label>
          <input id="email" className="field" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={(e) => up("email", e.target.value)} required {...field("email")} />
          {err("email")}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="skill" className="font-display text-[15px] font-bold">
          What do people pay you for, or ask you for?
        </label>
        <input id="skill" className="field" maxLength={300} placeholder="e.g. I design websites for small clinics" value={f.skill} onChange={(e) => up("skill", e.target.value)} required {...field("skill")} />
        {err("skill")}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ninety" className="font-display text-[15px] font-bold">
          What would a successful next 90 days look like for you?
        </label>
        <textarea id="ninety" className="field min-h-[120px]" maxLength={600} rows={4} value={f.ninety} onChange={(e) => up("ninety", e.target.value)} required {...field("ninety")} />
        {err("ninety")}
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-display text-[15px] font-bold">
          Hours per week you can commit for 90 days
        </legend>
        <div className="flex flex-col gap-2" role="radiogroup" aria-describedby={errors.hours ? "hours-err" : undefined}>
          {hoursOptions.map((o) => (
            <label key={o.value} className={`flex min-h-[48px] flex-1 cursor-pointer items-center gap-3 border px-4 text-[16px] ${f.hours === o.value ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-ink-soft"}`}>
              <input type="radio" name="hours" value={o.value} checked={f.hours === o.value} onChange={() => up("hours", o.value)} className="h-5 w-5 accent-accent" />
              {o.label}
            </label>
          ))}
        </div>
        {err("hours")}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-display text-[15px] font-bold">
          If we&rsquo;re a fit, are you in a position to invest in 1:1 guidance?
        </legend>
        <p className="-mt-1 text-[15px] text-ink-soft">
          The program starts at ₹75,000, with instalments. Honest answers make the call useful.
        </p>
        <div className="flex flex-col gap-2" role="radiogroup" aria-describedby={errors.ready ? "ready-err" : undefined}>
          {readyOptions.map((o) => (
            <label key={o.value} className={`flex min-h-[48px] cursor-pointer items-center gap-3 border px-4 text-[16px] ${f.ready === o.value ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-ink-soft"}`}>
              <input type="radio" name="ready" value={o.value} checked={f.ready === o.value} onChange={() => up("ready", o.value)} className="h-5 w-5 accent-accent" />
              {o.label}
            </label>
          ))}
        </div>
        {err("ready")}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="font-display text-[15px] font-bold">
          Anything I should know before we speak? <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea id="notes" className="field min-h-[90px]" maxLength={600} rows={3} value={f.notes} onChange={(e) => up("notes", e.target.value)} {...field("notes")} />
      </div>

      {errors.form && <p role="alert" className="text-[15px] text-danger">{errors.form}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
          {busy ? "Sending" : "Submit and pick a time"}
          {!busy && <ArrowRight size={18} aria-hidden="true" />}
        </button>
        <p className="font-mono text-[12.5px] text-ink-soft">
          {site.callsPerWeek} calls a week · first come, first served
        </p>
      </div>
    </form>
  );
}

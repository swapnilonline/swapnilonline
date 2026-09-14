"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { questions, score, resultPath, type Answers } from "@/lib/quiz";

type Errors = Record<string, string>;

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0..questions.length-1, then questions.length = opt-in
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState({ name: "", whatsapp: "", email: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [hp, setHp] = useState("");

  const total = questions.length;
  const atOptIn = step === total;
  const q = questions[step];
  const result = useMemo(() => score(answers), [answers]);

  function set(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors({});
  }

  function next() {
    if (!q) return;
    const v = answers[q.id]?.trim();
    if (!v) {
      setErrors({ [q.id]: q.kind === "text" ? "One line is enough." : "Pick one to continue." });
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, answers, result, source: "fit", website: hp }),
      });
      const json = (await res.json()) as { ok: boolean; errors?: Errors };
      if (!json.ok) {
        setErrors(json.errors ?? { form: "Something went wrong. Try again." });
        setBusy(false);
        return;
      }
      router.push(resultPath(result));
    } catch {
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[12.5px] text-ink-soft" aria-live="polite">
          {atOptIn ? "Almost there" : `Question ${step + 1} of ${total}`}
        </p>
        <div
          className="h-[3px] flex-1 max-w-[240px] bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={Math.min(step, total)}
          aria-label="Quiz progress"
        >
          <div
            className="h-full bg-accent transition-[width] duration-300"
            style={{ width: `${(Math.min(step, total) / total) * 100}%` }}
          />
        </div>
      </div>

      {!atOptIn && q && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-6"
        >
          <fieldset className="flex flex-col gap-5">
            <legend className="text-[28px] font-bold leading-tight sm:text-[34px]">{q.prompt}</legend>
            {q.help && <p className="text-[17px] text-ink-soft">{q.help}</p>}

            {q.kind === "choice" ? (
              <div className="flex flex-col gap-2" role="radiogroup" aria-describedby={errors[q.id] ? `${q.id}-err` : undefined}>
                {q.options.map((o) => {
                  const checked = answers[q.id] === o.value;
                  return (
                    <label
                      key={o.value}
                      className={`flex min-h-[52px] cursor-pointer items-center gap-3 border px-4 py-3 text-[17px] transition-colors ${
                        checked
                          ? "border-accent bg-accent-soft"
                          : "border-line bg-surface hover:border-ink-soft"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={o.value}
                        checked={checked}
                        onChange={() => set(q.id, o.value)}
                        className="h-5 w-5 accent-accent"
                      />
                      <span>{o.label}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <input
                type="text"
                name={q.id}
                value={answers[q.id] ?? ""}
                onChange={(e) => set(q.id, e.target.value)}
                placeholder={q.placeholder}
                maxLength={q.maxLength}
                autoFocus
                autoComplete="off"
                aria-invalid={!!errors[q.id]}
                aria-describedby={errors[q.id] ? `${q.id}-err` : undefined}
                className="field"
              />
            )}

            {errors[q.id] && (
              <p id={`${q.id}-err`} role="alert" className="text-[15px] text-danger">
                {errors[q.id]}
              </p>
            )}
          </fieldset>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="btn btn-ghost !border-transparent disabled:invisible"
            >
              <ArrowLeft size={18} aria-hidden="true" /> Back
            </button>
            <button type="submit" className="btn btn-primary">
              {step === total - 1 ? "See my result" : "Next"} <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}

      {atOptIn && (
        <form onSubmit={submit} className="relative flex flex-col gap-6" noValidate>
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website-hp">Website</label>
            <input id="website-hp" name="website" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] font-bold leading-tight sm:text-[34px]">
              Where should I send your result and the Blueprint?
            </h2>
            <p className="measure text-[17px] text-ink-soft">
              Your result is on the next page, with a free copy of The Digital Business Blueprint.
              Over the next seven days I&rsquo;ll also send one short lesson a day, one per stage,
              so you know exactly what to do next. Reply STOP anytime.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-display text-[15px] font-bold">First name</label>
              <input
                id="name"
                className="field"
                autoComplete="given-name"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
                required
              />
              {errors.name && <p id="name-err" role="alert" className="text-[15px] text-danger">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className="font-display text-[15px] font-bold">WhatsApp number</label>
              <input
                id="whatsapp"
                className="field"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={lead.whatsapp}
                onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? "whatsapp-err" : undefined}
                required
              />
              {errors.whatsapp && <p id="whatsapp-err" role="alert" className="text-[15px] text-danger">{errors.whatsapp}</p>}
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="email" className="font-display text-[15px] font-bold">Email</label>
              <input
                id="email"
                className="field"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
                required
              />
              {errors.email && <p id="email-err" role="alert" className="text-[15px] text-danger">{errors.email}</p>}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-[16px]">
            <input
              type="checkbox"
              checked={lead.consent}
              onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
              className="mt-1 h-5 w-5 accent-accent"
              aria-invalid={!!errors.consent}
            />
            <span>
              Send me my result and the 7-Day Launch Map on WhatsApp and email. I can opt out at
              any time.
            </span>
          </label>
          {errors.consent && <p role="alert" className="-mt-3 text-[15px] text-danger">{errors.consent}</p>}
          {errors.form && <p role="alert" className="text-[15px] text-danger">{errors.form}</p>}

          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={back} className="btn btn-ghost !border-transparent">
              <ArrowLeft size={18} aria-hidden="true" /> Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
              {busy ? "Sending" : "Show my Fit Score"}
              {!busy && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

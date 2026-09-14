import { z } from "zod";

const stripTags = (s: string) => s.replace(/<[^>]*>/g, "").trim();
const clean = (max: number) => z.string().transform(stripTags).pipe(z.string().max(max));

/** Indian mobile numbers plus a lenient international fallback. */
export const phone = z
  .string()
  .transform((s) => s.replace(/[\s()-]/g, ""))
  .pipe(z.string().regex(/^(\+?\d{10,15})$/, "Enter a valid WhatsApp number with country code"));

export const leadSchema = z.object({
  name: clean(80).pipe(z.string().min(2, "Enter your first name")),
  whatsapp: phone,
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  consent: z.literal(true, { message: "Please agree to receive messages" }),
  answers: z.object({
    situation: z.string().max(20),
    skill: clean(140),
    how: z.string().max(20),
    paid: z.string().max(5),
    offer: z.string().max(5),
    website: z.string().max(5),
    hours: z.string().max(10),
    blocker: z.string().max(10),
  }),
  result: z.object({
    segment: z.enum(["solopreneur", "freelancer", "consultant"]),
    model: z.enum(["services", "consulting", "coaching"]),
    stage: z.enum(["discover", "package", "build", "launch"]),
    blocker: z.enum(["sell", "who", "presence", "clients", "time"]),
    hours: z.enum(["lt5", "5to10", "10plus"]),
  }),
  source: z.string().max(80).optional(),
  /** Honeypot. Real browsers leave it empty; bots fill it. */
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const applySchema = z.object({
  name: clean(80).pipe(z.string().min(2, "Enter your name")),
  whatsapp: phone,
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  skill: clean(300).pipe(z.string().min(3, "Tell me what people pay you for")),
  ninety: clean(600).pipe(z.string().min(10, "A sentence or two is enough")),
  hours: z.enum(["lt5", "5to10", "10plus"], { message: "Pick one" }),
  ready: z.enum(["now", "soon", "exploring"], { message: "Pick one" }),
  notes: clean(600).optional(),
  segment: z.string().max(20).optional(),
  stage: z.string().max(20).optional(),
  website: z.string().max(0).optional(),
});

export type ApplyInput = z.infer<typeof applySchema>;

/** Flatten a zod error into { field: message } for inline form errors. */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

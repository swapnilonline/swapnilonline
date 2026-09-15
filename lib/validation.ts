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
  answers: z.record(z.string().max(20), z.string().max(140)).refine((o) => Object.keys(o).length <= 16, "Too many answers"),
  result: z.object({
    scores: z.object({
      person: z.number().int().min(0).max(2),
      problem: z.number().int().min(0).max(2),
      product: z.number().int().min(0).max(2),
      promise: z.number().int().min(0).max(2),
      proof: z.number().int().min(0).max(2),
      capacity: z.number().int().min(0).max(2),
      commitment: z.number().int().min(0).max(2),
    }),
    total: z.number().int().min(0).max(14),
    lane: z.enum(["challenge", "foundation", "notyet"]),
    weakest: z.enum(["person", "problem", "product", "promise", "proof", "capacity", "commitment"]),
    model: z.enum(["services", "consulting", "products"]),
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

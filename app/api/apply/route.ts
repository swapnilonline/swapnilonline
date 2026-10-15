import { NextResponse } from "next/server";
import { applySchema, fieldErrors } from "@/lib/validation";
import { forward } from "@/lib/webhook";
import { applicationEmail, sendLeadEmail } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/ratelimit";

export async function POST(request: Request) {
  if (!rateLimit(`apply:${clientKey(request)}`, 5, 60_000)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Too many attempts. Please wait a minute and try again." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Bad request" } }, { status: 400 });
  }

  if (body && typeof body === "object" && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const [hook, mail] = await Promise.all([
    forward({ type: "application", data: parsed.data }),
    sendLeadEmail(applicationEmail(parsed.data), parsed.data.email),
  ]);
  return NextResponse.json({ ok: true, forwarded: hook.ok, emailed: mail.ok && !mail.skipped, ready: parsed.data.ready });
}

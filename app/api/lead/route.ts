import { NextResponse } from "next/server";
import { leadSchema, fieldErrors } from "@/lib/validation";
import { forward } from "@/lib/webhook";
import { leadEmail, sendLeadEmail } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/ratelimit";

export async function POST(request: Request) {
  if (!rateLimit(`lead:${clientKey(request)}`, 5, 60_000)) {
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

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  // Email and webhook run together; neither can block the visitor from seeing their result.
  const [hook, mail] = await Promise.all([
    forward({ type: "lead", data: parsed.data }),
    sendLeadEmail(leadEmail(parsed.data), parsed.data.email),
  ]);
  return NextResponse.json({ ok: true, forwarded: hook.ok, emailed: mail.ok && !mail.skipped });
}

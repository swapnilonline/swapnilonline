import { NextResponse } from "next/server";
import { leadSchema, fieldErrors } from "@/lib/validation";
import { forward } from "@/lib/webhook";
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

  const { ok } = await forward({ type: "lead", data: parsed.data });
  // A webhook outage must not block the visitor from seeing their result.
  return NextResponse.json({ ok: true, forwarded: ok });
}

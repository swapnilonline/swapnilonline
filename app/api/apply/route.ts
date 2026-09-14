import { NextResponse } from "next/server";
import { applySchema, fieldErrors } from "@/lib/validation";
import { forward } from "@/lib/webhook";
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

  const { ok } = await forward({ type: "application", data: parsed.data });
  return NextResponse.json({ ok: true, forwarded: ok, ready: parsed.data.ready });
}

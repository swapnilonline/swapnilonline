/**
 * Every lead and application is forwarded as JSON to LEAD_WEBHOOK_URL.
 * Point it at a Google Apps Script, Make/Zapier catch hook, Brevo, or your own CRM.
 * Nothing is stored on this server. If the variable is unset, the submission
 * is accepted and only its type is logged, so the funnel never breaks in dev.
 */
export type Event = { type: "lead" | "application"; at: string; data: unknown; secret?: string };

export async function forward(event: Omit<Event, "at">): Promise<{ ok: boolean }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  const payload: Event = {
    ...event,
    at: new Date().toISOString(),
    // Google Apps Script cannot read request headers, so the secret also travels in the body.
    ...(process.env.LEAD_WEBHOOK_SECRET ? { secret: process.env.LEAD_WEBHOOK_SECRET } : {}),
  };

  if (!url) {
    console.info(`[webhook] LEAD_WEBHOOK_URL unset; ${event.type} not forwarded`);
    return { ok: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[webhook] ${event.type} forward failed: ${res.status}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error(`[webhook] ${event.type} forward error`, e instanceof Error ? e.message : e);
    return { ok: false };
  }
}

/**
 * Emails every lead and application to LEAD_TO_EMAIL via Resend's REST API.
 * No SDK needed. If RESEND_API_KEY is unset, this is a no-op and the webhook
 * path (lib/webhook.ts) still runs, so either channel can carry leads.
 *
 * Env:
 *   RESEND_API_KEY   from resend.com
 *   LEAD_TO_EMAIL    where leads land, e.g. digital@swapnilonline.com
 *   LEAD_FROM_EMAIL  a verified sender, e.g. leads@swapnilonline.com
 *                    (or onboarding@resend.dev while the domain is unverified)
 */
import type { LeadInput, ApplyInput } from "./validation";

const STAGE_NAMES: Record<string, string> = {
  person: "ONE PERSON", problem: "ONE PROBLEM", product: "ONE PRODUCT", promise: "ONE PROMISE",
  proof: "PROOF", capacity: "CAPACITY", commitment: "COMMITMENT",
};
const LANE_NAMES: Record<string, string> = { challenge: "Qualified", foundation: "Almost there", notyet: "Not yet" };

function esc(s: unknown) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}
function waLink(number: string, text: string) {
  let digits = number.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
function row(k: string, v: unknown) {
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;font:13px monospace;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font:15px Helvetica,Arial,sans-serif">${esc(v)}</td></tr>`;
}

export function leadEmail(d: LeadInput): { subject: string; html: string; text: string } {
  const r = d.result;
  const lane = LANE_NAMES[r.lane] ?? r.lane;
  const weakest = STAGE_NAMES[r.weakest] ?? r.weakest;
  const scores = (Object.keys(STAGE_NAMES) as (keyof typeof r.scores)[]).map((k) => `${STAGE_NAMES[k]} ${r.scores[k]}/2`).join(" · ");
  const hello = `Hi ${d.name.split(" ")[0]}, Swapnil here. Your Fit Score is ${r.total}/14, ${lane}. Your weakest stage is ${weakest}. Over the next 7 days I'll send you one short lesson a day, starting there.`;
  const subject = `Fit Score lead: ${d.name} · ${r.total}/14 · ${lane}`;
  const html = `
<div style="font-family:Helvetica,Arial,sans-serif;max-width:620px">
  <p style="font:13px monospace;color:#666;margin:0 0 6px">New Fit Score lead · swapnilonline.com/fit</p>
  <h2 style="margin:0 0 12px;font-size:22px">${esc(d.name)} · ${r.total}/14 · ${esc(lane)}</h2>
  <table style="border-collapse:collapse">
    ${row("WhatsApp", d.whatsapp)}${row("Email", d.email)}${row("Skill", d.answers.skill ?? "")}
    ${row("Lane", lane)}${row("Weakest stage", weakest)}${row("Model", r.model)}
    ${row("Scores", scores)}${row("Hours", d.answers.hours ?? "")}${row("Ready", d.answers.ready ?? "")}
  </table>
  <p style="margin:18px 0 0"><a href="${waLink(d.whatsapp, hello)}" style="background:#F5C12E;color:#0b0b0c;padding:10px 16px;text-decoration:none;font-weight:bold;border-radius:4px">Send the WhatsApp welcome</a></p>
  <p style="font:12px monospace;color:#999;margin-top:18px">Reply to this email to reach the lead directly.</p>
</div>`;
  const text = `New Fit Score lead\n\nName: ${d.name}\nWhatsApp: ${d.whatsapp}\nEmail: ${d.email}\nSkill: ${d.answers.skill ?? ""}\nScore: ${r.total}/14 (${lane})\nWeakest: ${weakest}\nModel: ${r.model}\nScores: ${scores}\n\nWhatsApp welcome: ${waLink(d.whatsapp, hello)}`;
  return { subject, html, text };
}

export function applicationEmail(d: ApplyInput): { subject: string; html: string; text: string } {
  const subject = `Free call application: ${d.name} · ${d.ready} · ${d.hours}`;
  const html = `
<div style="font-family:Helvetica,Arial,sans-serif;max-width:620px">
  <p style="font:13px monospace;color:#666;margin:0 0 6px">Free call application · swapnilonline.com/call</p>
  <h2 style="margin:0 0 12px;font-size:22px">${esc(d.name)} · ${esc(d.ready)} · ${esc(d.hours)}</h2>
  <table style="border-collapse:collapse">
    ${row("WhatsApp", d.whatsapp)}${row("Email", d.email)}${row("Skill", d.skill)}
    ${row("Next 90 days", d.ninety)}${row("Hours", d.hours)}${row("Ready", d.ready)}
    ${row("Notes", d.notes ?? "")}${row("Lane", d.segment ?? "")}${row("Weakest", d.stage ?? "")}
  </table>
  <p style="margin:18px 0 0"><a href="${waLink(d.whatsapp, `Hi ${d.name.split(" ")[0]}, Swapnil here. Thanks for applying for the free call. I've read your answers.`)}" style="background:#F5C12E;color:#0b0b0c;padding:10px 16px;text-decoration:none;font-weight:bold;border-radius:4px">Message on WhatsApp</a></p>
</div>`;
  const text = `Free call application\n\nName: ${d.name}\nWhatsApp: ${d.whatsapp}\nEmail: ${d.email}\nSkill: ${d.skill}\nNext 90 days: ${d.ninety}\nHours: ${d.hours}\nReady: ${d.ready}\nNotes: ${d.notes ?? ""}`;
  return { subject, html, text };
}

export async function sendLeadEmail(msg: { subject: string; html: string; text: string }, replyTo?: string): Promise<{ ok: boolean; skipped?: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) {
    console.info("[email] RESEND_API_KEY or LEAD_TO_EMAIL unset; lead not emailed");
    return { ok: true, skipped: true };
  }
  const from = process.env.LEAD_FROM_EMAIL || "Swapnil Online <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: msg.subject, html: msg.html, text: msg.text, ...(replyTo ? { reply_to: replyTo } : {}) }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[email] send failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] send error", e instanceof Error ? e.message : e);
    return { ok: false };
  }
}

/**
 * swapnilonline.com — lead nurture
 *
 * Runs inside the same Apps Script project as Code.gs. Two jobs:
 *
 *   1. EMAIL, automatic. Day 0 welcome when a lead arrives, then one lesson a
 *      day for 7 days (the 7-Day Launch Map). Launch Call applicants who have
 *      not booked get follow-ups on day 2, 4, 7 and 14. Sent from your Google
 *      account, so replies come straight to you.
 *
 *   2. WHATSAPP, one tap each. WhatsApp has no free automation, so every
 *      morning you get one digest email listing who is due which message today,
 *      each with a wa.me link that opens WhatsApp with the message already typed.
 *      You tap, glance, send. Ten leads takes about three minutes.
 *
 * SETUP (once)
 *   1. In the Apps Script editor: File → New → Script. Name it "Nurture". Paste this file.
 *   2. Run installTriggers() once from the editor and approve the permissions.
 *      That schedules runNurture() daily at SEND_HOUR (India time) and processStops() hourly.
 *   3. Done. Check the "leads" sheet: columns nurture_day and last_sent fill in as it runs.
 *
 * STOPPING SOMEONE
 *   Set their status cell to "stopped", "booked", "client" or "lost". They are skipped from then on.
 *   processStops() also does this automatically when someone replies to an email with STOP.
 *
 * COPY
 *   Every message lives in LEAD_SEQUENCE and APPLICANT_SEQUENCE below. Edit freely.
 *   Tokens: {name} {model} {stage} {skill} {segment} {swapnil}
 */

const SEND_HOUR = 9;                       // 9am IST
const TIMEZONE = "Asia/Kolkata";
const SITE = "https://swapnilonline.com";
const CALL_URL = SITE + "/call";
const FROM_NAME = "Swapnil Shiwalay";
const STOP_STATUSES = ["stopped", "booked", "client", "lost", "unsubscribed"];

/* ------------------------------------------------------------------ */
/* Copy                                                               */
/* ------------------------------------------------------------------ */

const LEAD_SEQUENCE = {
  0: {
    subject: "Your Fit Score, and what happens next",
    email:
`Hi {name},

Your Fit Score says {model} business, {stage} stage. That is a real starting point, not a label. It tells us which of the seven stages is blocking you, and that is where we start.

Over the next seven days I'll send you one short lesson a day, one per stage, so you can see the whole road from where you are to a business that runs.

Three things you can do right now:
1. Download your copy of The Digital Business Blueprint, the seven stages with a worksheet for each: ${SITE}/digital-business-blueprint.pdf
2. Re-read your result: {result_url}
3. If you want to talk it through, I do six free 30-minute Launch Calls a week: ${CALL_URL}

Lesson 1 arrives tomorrow morning.

Swapnil
20 years working from home · 2,500+ websites developed`,
    whatsapp:
`Hi {name}, Swapnil here. Your Fit Score says {model} at the {stage} stage. Over the next 7 days I'll send you one short lesson a day, one per stage, so you can see the whole road from where you are to a business that runs. Reply STOP anytime. Lesson 1 tomorrow morning.`,
  },
  1: {
    subject: "Day 1 · Discover: pick a customer, not an idea",
    email:
`{name},

Most people pick a business idea. The ones who succeed pick a customer.

You told me people ask you for "{skill}". Who asked last? What did it cost them not to have it? That person is your customer.

Write their name down today. Not a persona, a name. That is stage 1, done.

Tomorrow: the three businesses hiding inside your one skill.

Swapnil`,
    whatsapp:
`Stage 1: Discover. Most people pick a business idea. The ones who succeed pick a customer. You told me people ask you for "{skill}". Who asked last? What did it cost them not to have it? That person is your customer. Write their name down. That's stage 1.`,
  },
  2: {
    subject: "Day 2 · Design: same skill, three businesses",
    email:
`{name},

Same skill, three businesses. A designer can do the work (Services), advise on brand (Consulting), or teach founders to do it themselves (Coaching).

Your quiz says {model}. Here's why that is right for you: it matches how you said you prefer to help. And here is the one trap in it: {model_trap}

Don't fight the model. Pick it and move to stage 3.

Swapnil`,
    whatsapp:
`Stage 2: Design. Same skill, three businesses. A designer can do the work (Services), advise on brand (Consulting), or teach founders to do it (Coaching). Your quiz says {model}. The one trap in it: {model_trap}`,
  },
  3: {
    subject: "Day 3 · Package: a skill is not an offer",
    email:
`{name},

An offer is a result, for a person, at a price, in a timeframe.

"Website design" is a skill. "A 5-page website for a clinic, live in 14 days, Rs 45,000" is an offer. One of these gets bought. The other gets a "let me think about it".

I've written offers like this for 2,500 businesses. If you'd like me to look at yours, I do a free 30-minute Launch Call. You leave with a one-page Launch Map whether or not we work together.

Apply here: ${CALL_URL}
Only six a week.

Swapnil`,
    whatsapp:
`Stage 3: Package. An offer is a result, for a person, at a price, in a timeframe. "Website design" is a skill. "A 5-page website for a clinic, live in 14 days, Rs 45,000" is an offer. I've written offers like this for 2,500 businesses. Want me to look at yours? Free 30-min Launch Call, only 6 a week: ${CALL_URL}`,
  },
  4: {
    subject: "Day 4 · Build: one page beats a brand",
    email:
`{name},

The presence you need on day 1 is smaller than you think. One page. One paragraph about who you help. One way to book you.

Not a brand. Not a logo suite. Not a 12-page site you'll be "finishing" for a year.

After 2,500 websites, here is the pattern: the people who get their first client in a month put up one page in a week. The people still "working on the site" a year later started with a brand.

Tomorrow: the message that gets your first conversation.

Swapnil`,
    whatsapp:
`Stage 4: Build. The presence you need on day 1 is smaller than you think: one page, one paragraph, one way to book you. Not a brand, not a logo suite. After 2,500 websites, the pattern is clear: first client in a month = one page up in a week.`,
  },
  5: {
    subject: "Day 5 · Launch: the 3-line message",
    email:
`{name},

Your first client will come from someone who already knows you. Here is the three-line message that gets a first conversation without sounding like a pitch:

"Hi [name]. I've started helping [who you help] with [result]. Who do you know who's dealing with that right now?"

That's it. No link, no price, no deck. It asks for a referral, not a sale, so people answer it.

Send it to five people today. Reply to this email and tell me what happens.

Swapnil`,
    whatsapp:
`Stage 5: Launch. Your first client will come from someone who already knows you. The 3-line message: "Hi [name]. I've started helping [who] with [result]. Who do you know who's dealing with that right now?" No link, no price. Send it to 5 people today. Tell me what happens.`,
  },
  6: {
    subject: "Day 6 · Systemize: boring wins",
    email:
`{name},

Working from home for 20 years taught me this: businesses don't fail from a lack of clients. They fail from chaos.

Three boring things keep a one-person business alive:
1. A proposal template you fill in, not rewrite.
2. One calendar link, so nobody emails to find a time.
3. One invoice flow, so you get paid without chasing.

Set them up once. They pay you back every week for years.

If you'd like to set this up together, the Launch Call is still open this week: ${CALL_URL}

Swapnil`,
    whatsapp:
`Stage 6: Systemize. 20 years from home taught me this: the business doesn't fail from lack of clients, it fails from chaos. Proposal template, one calendar link, one invoice flow. Boring wins. If you'd like to set this up together, the Launch Call is still open this week: ${CALL_URL}`,
  },
  7: {
    subject: "Day 7 · Scale, and the whole map",
    email:
`{name},

That's the whole map: Discover, Design, Package, Build, Launch, Systemize, Scale.

You can walk it alone. Most people take two to three years and stall at stage 3 or stage 5.

In the 90-Day Digital Business Setup Challenge we do all seven stages together, one 45-minute session a week, built toward ₹3,00,000 a month of recurring income from home, without a job, and I build your website inside the program instead of assigning it as homework. There's a first-client guarantee. If you'd rather start smaller, the 7-Day Foundation is seven days of hand-holding before launch, for 100% clarity on your digital business, at ₹7,500.

This is the last message from me for now. If you'd like to talk it through: ${CALL_URL}

Whatever you decide, start with the customer's name from day 1.

Swapnil
${SITE}`,
    whatsapp:
`Stage 7: Scale. That's the whole map. You can walk it alone; most people take 2–3 years and stall at stage 3 or 5. In the 90-Day Setup Challenge we do all seven stages together, and I build your website. Or start with the 7-Day Foundation. Last message from me for now. If you want to talk it through: ${CALL_URL}`,
  },
};

const MODEL_TRAPS = {
  services: "pricing by the hour. Hours are capped, outcomes are not.",
  consulting: "vague advice. Consulting sells when it is attached to a specific decision or number.",
  coaching: "coaching a topic instead of a transformation. Nobody buys 'marketing coaching'; they buy 'your first 10 customers'.",
};

/** Launch Call applicants who have not booked. Days counted from the application. */
const APPLICANT_SEQUENCE = {
  2: {
    subject: "One story that sounds like yours",
    email:
`{name},

No ask today. Just one story.

Kumar came to me at the same stage you're at. In his words: "Swapnil helped me begin on my journey in the digital space. He's always been there since, offering expert advice and doing a little bit of hand holding too."

That "little bit of hand holding" is the whole program.

Swapnil`,
    whatsapp:
`{name}, no ask today, just one story. Kumar came to me at the stage you're at. His words: "Swapnil helped me begin on my journey in the digital space... offering expert advice and doing a little bit of hand holding too." That little bit of hand holding is the whole program.`,
  },
  4: {
    subject: "Any question I didn't answer?",
    email:
`{name},

Any question I didn't answer? Reply here and I'll answer it straight.

Swapnil`,
    whatsapp:
`{name}, any question I didn't answer? Ask me here and I'll answer it straight.`,
  },
  7: {
    subject: "Holding your slot until Friday",
    email:
`{name},

I'm holding a Launch Call slot for you until Friday. After that it goes to the next applicant, because I only take six a week.

Pick a time: {cal_url}

Swapnil`,
    whatsapp:
`{name}, I'm holding a Launch Call slot for you until Friday. After that it goes to the next applicant (I only take 6 a week). Pick a time: {cal_url}`,
  },
  14: {
    subject: "A smaller first step",
    email:
`{name},

Closing the loop. If the program isn't the right size right now, the 7-Day Digital Business Foundation is a smaller first step: seven days of hand-holding before launch, and you finish with 100% clarity on your digital business. Rs 7,500, credited in full toward the Challenge within 60 days.

If you'd like it, reply "foundation" and I'll send the details.

Either way, I'll send a short note once a month. Good luck with stage 1.

Swapnil`,
    whatsapp:
`{name}, closing the loop. If the program isn't the right size right now, the 7-Day Foundation is a smaller first step: seven days of hand-holding before launch, 100% clarity on your digital business. Rs 7,500, credited toward the Challenge within 60 days. Reply "foundation" if you'd like it.`,
  },
};

/* ------------------------------------------------------------------ */
/* Scheduling                                                         */
/* ------------------------------------------------------------------ */

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("runNurture").timeBased().atHour(SEND_HOUR).everyDays(1).inTimezone(TIMEZONE).create();
  ScriptApp.newTrigger("processStops").timeBased().everyHours(1).create();
  Logger.log("Triggers installed: runNurture daily at " + SEND_HOUR + ":00 " + TIMEZONE + ", processStops hourly.");
}

/** Daily. Sends due emails, then one digest to you with WhatsApp links. */
function runNurture() {
  const digest = { welcome: [], lessons: [], followups: [] };
  nurtureSheet("leads", LEAD_SEQUENCE, "at", digest, "lessons");
  nurtureSheet("applications", APPLICANT_SEQUENCE, "at", digest, "followups");
  sendDigest(digest);
}

function nurtureSheet(name, sequence, atCol, digest, bucket) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return;

  ensureColumns(sh, ["nurture_day", "last_sent"]);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const col = h => headers.indexOf(h) + 1;
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  const now = new Date();

  rows.forEach((row, i) => {
    const rec = {};
    headers.forEach((h, j) => rec[h] = row[j]);
    const status = String(rec.status || "").toLowerCase();
    if (STOP_STATUSES.includes(status)) return;
    if (!rec.email && !rec.whatsapp) return;

    const at = new Date(rec[atCol]);
    if (isNaN(at)) return;
    const day = Math.floor((now - at) / 86400000);
    const lastDay = rec.nurture_day === "" ? -1 : Number(rec.nurture_day);
    const due = Object.keys(sequence).map(Number).filter(d => d > lastDay && d <= day).sort((a, b) => a - b);
    if (due.length === 0) return;

    // Send only the latest due step; never dump a backlog on someone.
    const step = due[due.length - 1];
    const msg = sequence[step];
    const ctx = context(rec);

    if (rec.email) {
      try {
        MailApp.sendEmail({ to: rec.email, name: FROM_NAME, subject: fill(msg.subject, ctx),
          body: fill(msg.email, ctx) + "\n\n—\nReply STOP to end these emails." });
      } catch (e) { Logger.log("email failed for row " + (i + 2) + ": " + e); }
    }
    if (rec.whatsapp) {
      digest[bucket].push({ name: rec.name, step, link: waLink(rec.whatsapp, fill(msg.whatsapp, ctx)), sheet: name, row: i + 2 });
    }
    sh.getRange(i + 2, col("nurture_day")).setValue(step);
    sh.getRange(i + 2, col("last_sent")).setValue(now);
  });
}

/** Called from Code.gs when a lead arrives: instant welcome email + a WhatsApp welcome in tomorrow's digest. */
function onNewLead(d) {
  const msg = LEAD_SEQUENCE[0];
  const ctx = context({
    name: d.name, email: d.email, whatsapp: d.whatsapp,
    segment: (d.result || {}).segment, model: (d.result || {}).model, stage: (d.result || {}).stage,
    skill: (d.answers || {}).skill,
  });
  if (d.email) {
    try {
      MailApp.sendEmail({ to: d.email, name: FROM_NAME, subject: fill(msg.subject, ctx),
        body: fill(msg.email, ctx) + "\n\n—\nReply STOP to end these emails." });
    } catch (e) { Logger.log("welcome email failed: " + e); }
  }
  // Tell Swapnil right away with the one-tap WhatsApp welcome.
  if (d.whatsapp && NOTIFY_EMAIL) {
    const link = waLink(d.whatsapp, fill(msg.whatsapp, ctx));
    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: "New lead: " + d.name + " · send WhatsApp welcome",
      htmlBody: "<p><b>" + esc(d.name) + "</b> · " + esc(ctx.segment) + " · " + esc(ctx.model) + " · " + esc(ctx.stage) + "</p>" +
                "<p>Skill: " + esc(ctx.skill) + "</p>" +
                "<p><a href=\"" + link + "\">Send the WhatsApp welcome</a> (opens WhatsApp with the message typed)</p>" });
  }
}

/* ------------------------------------------------------------------ */
/* Digest                                                             */
/* ------------------------------------------------------------------ */

function sendDigest(d) {
  const total = d.welcome.length + d.lessons.length + d.followups.length;
  if (total === 0 || !NOTIFY_EMAIL) return;
  const section = (title, items, label) => items.length === 0 ? "" :
    "<h3 style=\"margin:18px 0 6px\">" + title + " (" + items.length + ")</h3><ol style=\"padding-left:18px\">" +
    items.map(it => "<li style=\"margin:6px 0\"><b>" + esc(it.name) + "</b> · " + label + " " + it.step +
      " · <a href=\"" + it.link + "\">Send on WhatsApp</a></li>").join("") + "</ol>";
  const html =
    "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5\">" +
    "<p>Good morning. " + total + " WhatsApp message" + (total === 1 ? "" : "s") + " to send today. Each link opens WhatsApp with the message already typed. Emails for the same steps went out automatically.</p>" +
    section("Lessons due", d.lessons, "Day") +
    section("Launch Call follow-ups", d.followups, "Day") +
    "<p style=\"color:#666;font-size:13px\">To stop someone, set their status to <b>stopped</b>, <b>booked</b>, <b>client</b> or <b>lost</b> in the sheet.</p></div>";
  MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: "Nurture today: " + total + " to send", htmlBody: html });
}

/* ------------------------------------------------------------------ */
/* STOP handling                                                      */
/* ------------------------------------------------------------------ */

/** Hourly. Anyone who replied STOP to a nurture email gets status "stopped". */
function processStops() {
  const threads = GmailApp.search("newer_than:2d (subject:STOP OR \"STOP\") -label:nurture-stopped", 0, 50);
  if (threads.length === 0) return;
  const label = GmailApp.getUserLabelByName("nurture-stopped") || GmailApp.createLabel("nurture-stopped");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  threads.forEach(t => {
    t.getMessages().forEach(m => {
      const body = (m.getPlainBody() || "").trim().slice(0, 200).toUpperCase();
      if (!/\bSTOP\b/.test(body) && !/\bSTOP\b/i.test(m.getSubject() || "")) return;
      const from = (m.getFrom().match(/<(.+?)>/) || [null, m.getFrom()])[1].toLowerCase();
      ["leads", "applications"].forEach(name => {
        const sh = ss.getSheetByName(name);
        if (!sh || sh.getLastRow() < 2) return;
        const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
        const ec = headers.indexOf("email") + 1, sc = headers.indexOf("status") + 1;
        if (!ec || !sc) return;
        const emails = sh.getRange(2, ec, sh.getLastRow() - 1, 1).getValues();
        emails.forEach((e, i) => {
          if (String(e[0]).toLowerCase() === from) sh.getRange(i + 2, sc).setValue("stopped");
        });
      });
    });
    t.addLabel(label);
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function context(rec) {
  const model = String(rec.model || "").toLowerCase();
  const first = String(rec.name || "").trim().split(/\s+/)[0] || "there";
  const r = { seg: rec.segment, model: rec.model, stage: rec.stage, blocker: rec.blocker, hours: rec.hours };
  const q = Object.keys(r).filter(k => r[k]).map(k => k + "=" + encodeURIComponent(r[k])).join("&");
  return {
    name: first,
    segment: cap(rec.segment),
    model: cap(rec.model),
    stage: cap(rec.stage),
    skill: rec.skill || "your skill",
    model_trap: MODEL_TRAPS[model] || MODEL_TRAPS.services,
    result_url: SITE + "/fit/result?" + q,
    cal_url: (typeof CAL_URL !== "undefined" && CAL_URL) || "https://calendly.com/swapnilonline/launch-call",
    swapnil: FROM_NAME,
  };
}

function fill(template, ctx) {
  return String(template).replace(/\{(\w+)\}/g, (_, k) => (ctx[k] !== undefined ? ctx[k] : ""));
}

function waLink(number, text) {
  let digits = String(number).replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;   // Indian mobile without country code
  return "https://wa.me/" + digits + "?text=" + encodeURIComponent(text);
}

function ensureColumns(sh, names) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  names.forEach(n => { if (headers.indexOf(n) === -1) sh.getRange(1, sh.getLastColumn() + 1).setValue(n); });
}

function cap(s) { s = String(s || ""); return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
function esc(s) { return String(s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }

/** Preview every message for a sample lead in the log, without sending anything. */
function previewCopy() {
  const ctx = context({ name: "Priya Nair", segment: "freelancer", model: "services", stage: "package", skill: "I design websites for small clinics" });
  Object.keys(LEAD_SEQUENCE).forEach(d => {
    Logger.log("=== LEAD DAY " + d + " · " + fill(LEAD_SEQUENCE[d].subject, ctx) + "\n" + fill(LEAD_SEQUENCE[d].email, ctx) + "\n--- WhatsApp:\n" + fill(LEAD_SEQUENCE[d].whatsapp, ctx));
  });
  Object.keys(APPLICANT_SEQUENCE).forEach(d => {
    Logger.log("=== APPLICANT DAY " + d + " · " + fill(APPLICANT_SEQUENCE[d].subject, ctx) + "\n" + fill(APPLICANT_SEQUENCE[d].email, ctx) + "\n--- WhatsApp:\n" + fill(APPLICANT_SEQUENCE[d].whatsapp, ctx));
  });
}

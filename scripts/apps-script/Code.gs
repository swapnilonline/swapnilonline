/**
 * swapnilonline.com lead receiver — Google Apps Script
 *
 * Writes every quiz lead and Launch Call application into a Google Sheet and
 * emails you a summary of each one. Free, no third-party service.
 *
 * SETUP (about 5 minutes)
 * 1. Create a new Google Sheet. Name it "swapnilonline leads".
 * 2. Extensions → Apps Script. Delete the sample code, paste this whole file.
 * 3. Set NOTIFY_EMAIL below to the address that should get the alerts.
 * 4. Set SECRET to any long random string. Put the same value in LEAD_WEBHOOK_SECRET on Vercel.
 * 5. Deploy → New deployment → type "Web app".
 *      Execute as: Me.   Who has access: Anyone.
 *    Copy the Web app URL. Put it in LEAD_WEBHOOK_URL on Vercel.
 * 6. Run the "test" function once from the editor so Google asks for permissions.
 *
 * Re-deploy (Deploy → Manage deployments → edit → new version) whenever you change this file.
 */

const NOTIFY_EMAIL = "contact@swapnilonline.com";
const SECRET = "change-me-to-a-long-random-string";
const CAL_URL = "https://calendly.com/swapnilonline/launch-call";

function doPost(e) {
  try {
    const auth = (e.parameter && e.parameter.authorization) || "";
    const body = JSON.parse(e.postData.contents);
    // Apps Script can't read request headers, so the site also sends the secret in the body.
    if (SECRET && body.secret !== SECRET && auth !== "Bearer " + SECRET) {
      return json({ ok: false, error: "unauthorised" });
    }
    const type = body.type === "application" ? "applications" : "leads";
    const sheet = getSheet(type);
    const row = type === "applications" ? applicationRow(body) : leadRow(body);
    sheet.appendRow(row);
    notify(type, body);
    // Nurture.gs: instant welcome email + a one-tap WhatsApp welcome link sent to you.
    if (type === "leads" && typeof onNewLead === "function") onNewLead(body.data || {});
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function leadRow(b) {
  const d = b.data || {};
  const a = d.answers || {};
  const r = d.result || {};
  return [
    b.at, d.name, d.whatsapp, d.email,
    r.segment, r.model, r.stage, r.blocker, r.hours,
    a.skill, a.situation, a.how, a.paid, a.offer, a.website,
    d.source || "", "new", "", "",
  ];
}

function applicationRow(b) {
  const d = b.data || {};
  return [
    b.at, d.name, d.whatsapp, d.email, d.skill, d.ninety, d.hours, d.ready,
    d.notes || "", d.segment || "", d.stage || "", "new", "", "",
  ];
}

const HEADERS = {
  leads: ["at", "name", "whatsapp", "email", "segment", "model", "stage", "blocker", "hours",
          "skill", "situation", "how", "paid", "offer", "website", "source", "status", "nurture_day", "last_sent"],
  applications: ["at", "name", "whatsapp", "email", "skill", "ninety_days", "hours", "ready",
                 "notes", "segment", "stage", "status", "nurture_day", "last_sent"],
};

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[name]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify(type, b) {
  if (!NOTIFY_EMAIL) return;
  const d = b.data || {};
  const subject = type === "applications"
    ? "Launch Call application: " + d.name + " (" + d.ready + ")"
    : "New Fit Score lead: " + d.name + " (" + ((d.result || {}).segment || "") + ")";
  const lines = Object.keys(d).map(function (k) {
    const v = d[k];
    return k + ": " + (typeof v === "object" ? JSON.stringify(v) : v);
  });
  MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join("\n"));
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to grant permissions and confirm the sheet fills. */
function test() {
  const fake = {
    postData: { contents: JSON.stringify({
      type: "lead", at: new Date().toISOString(), secret: SECRET,
      data: { name: "Test Lead", whatsapp: "+919999999999", email: "test@example.com",
              answers: { skill: "I design websites" }, result: { segment: "freelancer", model: "services", stage: "package" }, source: "test" },
    }) },
    parameter: {},
  };
  Logger.log(doPost(fake).getContent());
}

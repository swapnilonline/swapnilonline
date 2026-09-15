# swapnilonline.com

The website and 3-step funnel for Swapnil Shiwalay's 1:1 programs: the 7-Day Digital Business Foundation and the 90-Day Digital Business Setup Challenge.

## The funnel

| Step | Route | Job |
|---|---|---|
| 1. Attract | `/fit` → `/fit/result` | The Home Business Fit Score. 8 questions, segments the lead, captures WhatsApp + email, hands off to WhatsApp for the 7-Day Launch Map. |
| 2. Convert | `/call` | Launch Call application. Filters on hours and readiness; qualified applicants see the Calendly booking calendar. |
| 3. Enrol | `/program` | The program page: tiers, guarantee, FAQ. |

Supporting pages: `/` (home), `/about`, `/privacy`, `/refunds`. Old WordPress paths redirect (see `next.config.ts`).

Every lead and application is validated with zod in `app/api/lead` and `app/api/apply`, rate limited, checked against a honeypot, then forwarded as JSON to `LEAD_WEBHOOK_URL`. Nothing is stored on this server.

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Launch checklist

### 1. Lead pipeline (5 minutes, free)

Leads need somewhere to land. The included Google Apps Script writes each one to a Google Sheet and emails you.

1. Create a Google Sheet called "swapnilonline leads".
2. Extensions → Apps Script. Paste `scripts/apps-script/Code.gs`.
3. Set `NOTIFY_EMAIL` and a long random `SECRET` at the top of the file.
4. Deploy → New deployment → Web app. Execute as **Me**. Who has access: **Anyone**. Copy the web app URL.
5. Run the `test` function once from the editor and approve the permissions. Check the sheet got a row and you got an email.

### 1b. Lead nurture (5 more minutes, free)

The 7-Day Launch Map and the Launch Call follow-ups run from the same Apps Script project.

1. In the Apps Script editor: File → New → Script, name it `Nurture`, paste `scripts/apps-script/Nurture.gs`.
2. Run `installTriggers` once and approve the permissions (Gmail is needed to send and to read STOP replies).
3. Optionally run `previewCopy` and open the log to read every message with sample data.

What it does from then on:

| Who | Email (automatic, from your Google account) | WhatsApp (one tap each, from your morning digest) |
|---|---|---|
| New Fit Score lead | Day 0 welcome instantly, then lessons on day 1 to 7, 9am IST | Welcome link emailed to you instantly; lesson links in the 9am digest |
| Launch Call applicant who hasn't booked | Day 2 story, day 4 question, day 7 slot-hold, day 14 smaller step | Same steps, in the digest |

Each digest line is a `wa.me` link that opens WhatsApp with the message already typed for that person and that day. Ten leads takes about three minutes.

Stopping someone: set their `status` cell to `stopped`, `booked`, `client` or `lost`. Anyone who replies STOP to an email is stopped automatically within the hour.

All copy lives in `Nurture.gs` under `LEAD_SEQUENCE` and `APPLICANT_SEQUENCE`. Edit it there, save, done. No redeploy needed for the triggers; only `doPost` changes need a new web app version.

### 2. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `LEAD_WEBHOOK_URL` | The Apps Script web app URL from step 1 |
| `LEAD_WEBHOOK_SECRET` | The same `SECRET` you put in Code.gs |
| `NEXT_PUBLIC_CAL_URL` | `https://calendly.com/swapnilonline/launch-call` |
| `NEXT_PUBLIC_WHATSAPP` | Your WhatsApp number, digits only with country code, e.g. `9198xxxxxxxx` |
| `NEXT_PUBLIC_GA_ID` | Optional. GA4 measurement id |

### 3. Deploy

```bash
git add -A && git commit -m "Launch swapnilonline.com"
npx vercel --prod
```

Or push to GitHub and import the repo at vercel.com/new. Zero config.

### 4. Domain

In Vercel → Project → Settings → Domains, add `swapnilonline.com` and `www.swapnilonline.com`. Then at your registrar:

- `A` record for `@` → `76.76.21.21`
- `CNAME` for `www` → `cname.vercel-dns.com`

The old WordPress site stays reachable at its host until DNS moves, so there is no downtime. Redirects for `/about`, `/blog`, `/resources`, `/privacy-policy`, `/refund-policy` and `/earning-disclaimer` are already in place.

### 5. After go-live, test the whole path once on your phone

1. Take the Fit Score. Confirm the row appears in the Sheet and the email arrives.
2. Tap "Message Swapnil on WhatsApp" on the result page. Confirm the prefilled message opens your number.
3. Apply for a Launch Call with "ready now". Confirm the Calendly calendar embeds and a booking lands in Google Calendar.
4. Open `https://swapnilonline.com/opengraph-image` and share the home link on WhatsApp to check the preview card.

## Where things live

- `lib/site.ts`: name, credibility lines, nav, the seven stages, brands.
- `lib/quiz.ts`: quiz questions, scoring, and all result copy.
- `lib/reviews.ts`: Trustpilot reviews, verbatim.
- `lib/validation.ts`: zod schemas for both forms.
- `lib/webhook.ts`, `lib/ratelimit.ts`: forwarding and abuse protection.
- `components/Quiz.tsx`, `components/ApplyForm.tsx`: the two client forms.
- `app/globals.css`: design tokens. Fonts load in `app/layout.tsx`.
- `scripts/apps-script/Code.gs`: the free lead receiver.
- `public/home-video-v2.mp4` + `home-video-poster-v2.jpg`: the home page video, 720p, 5 MB. Replace both files to change it, or set `NEXT_PUBLIC_HOME_VIDEO_ID` to use YouTube instead.
- `public/foundation-7-day-plan.pdf`: the 8-page fillable workbook sent to each Foundation client on day 0. Source in `docs/foundation-plan/`.
- `public/offer.pdf`: the 4-page offer sent to qualified people. Prices live here, not on public pages. Source in `docs/offer/`.
- `public/recurring-income-blueprint.pdf`: the 2-page formula download. Source in `docs/formula/`.
- `public/digital-business-blueprint.pdf`: the lead magnet. Source in `docs/blueprint/blueprint.html`; re-render with the command in that folder's README.
- `scripts/apps-script/Nurture.gs`: the 7-day email sequence, applicant follow-ups, and the daily WhatsApp digest.

## Checks

```bash
npm run typecheck && npm run lint && npm run build
```

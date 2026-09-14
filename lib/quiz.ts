/**
 * The Home Business Fit Score.
 * Eight questions. Answers decide three things: segment, model, stage.
 * Everything here is plain data so the result page can be rendered from a URL.
 */

export type Segment = "solopreneur" | "freelancer" | "consultant";
export type Model = "services" | "consulting" | "coaching";
export type Stage = "discover" | "package" | "build" | "launch";
export type Blocker = "launch" | "niche" | "content" | "tech" | "busy" | "fear";
export type Hours = "lt5" | "5to10" | "10plus";

export type ChoiceQuestion = {
  kind: "choice";
  id: "situation" | "how" | "paid" | "offer" | "website" | "hours" | "blocker";
  prompt: string;
  help?: string;
  options: { value: string; label: string }[];
};

export type TextQuestion = {
  kind: "text";
  id: "skill";
  prompt: string;
  help?: string;
  placeholder: string;
  maxLength: number;
};

export type Question = ChoiceQuestion | TextQuestion;

export const questions: Question[] = [
  {
    kind: "choice",
    id: "situation",
    prompt: "Which describes you best today?",
    options: [
      { value: "employed", label: "Employed, with a skill people keep asking me for" },
      { value: "freelancing", label: "Freelancing, project to project" },
      { value: "side", label: "Advising or consulting on the side" },
      { value: "practice", label: "Running a small practice or agency" },
      { value: "between", label: "Between things, ready to build something of my own" },
    ],
  },
  {
    kind: "text",
    id: "skill",
    prompt: "What do people already pay you for, or ask you for?",
    help: "One line is enough. This is the raw material of your business.",
    placeholder: "e.g. I design websites for small clinics",
    maxLength: 140,
  },
  {
    kind: "choice",
    id: "how",
    prompt: "How do you prefer to help?",
    options: [
      { value: "do", label: "Do the work for them" },
      { value: "advise", label: "Advise them on what to do" },
      { value: "teach", label: "Teach them to do it themselves" },
    ],
  },
  {
    kind: "choice",
    id: "paid",
    prompt: "Have you ever been paid for this outside of a job?",
    options: [
      { value: "yes", label: "Yes, at least once" },
      { value: "no", label: "Not yet" },
    ],
  },
  {
    kind: "choice",
    id: "offer",
    prompt: "Do you have a clear offer with a price?",
    help: "An offer is a result, for a person, at a price, in a timeframe.",
    options: [
      { value: "yes", label: "Yes, I can say it in one sentence" },
      { value: "no", label: "No, I quote each time or don't know what to charge" },
    ],
  },
  {
    kind: "choice",
    id: "website",
    prompt: "Do you have a website or page you'd send a prospect to?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No, or nothing I'd be proud to share" },
    ],
  },
  {
    kind: "choice",
    id: "hours",
    prompt: "Hours per week you can give this for the next 90 days?",
    options: [
      { value: "lt5", label: "Under 5 hours" },
      { value: "5to10", label: "5 to 10 hours" },
      { value: "10plus", label: "More than 10 hours" },
    ],
  },
  {
    kind: "choice",
    id: "blocker",
    prompt: "Which of these sounds most like you right now?",
    options: [
      { value: "launch", label: "I keep learning. Nothing is live, nothing earns." },
      { value: "niche", label: "I can't decide my niche. I've changed it more than once." },
      { value: "content", label: "I post a lot. It brings attention, not clients." },
      { value: "tech", label: "Funnels, pages, automations. The tech feels like a wall." },
      { value: "busy", label: "I'm busy, paid by the hour, and not growing." },
      { value: "fear", label: "The offer is ready. I'm afraid nobody will buy." },
    ],
  },
];

export type Answers = Partial<Record<Question["id"], string>>;

export type Result = {
  segment: Segment;
  model: Model;
  stage: Stage;
  blocker: Blocker;
  hours: Hours;
};

export function score(a: Answers): Result {
  const segment: Segment =
    a.situation === "freelancing"
      ? "freelancer"
      : a.situation === "side" || a.situation === "practice"
        ? "consultant"
        : "solopreneur";

  const model: Model =
    a.how === "advise" ? "consulting" : a.how === "teach" ? "coaching" : "services";

  const stage: Stage =
    a.paid !== "yes"
      ? "discover"
      : a.offer !== "yes"
        ? "package"
        : a.website !== "yes"
          ? "build"
          : "launch";

  const blockers: Blocker[] = ["launch", "niche", "content", "tech", "busy", "fear"];
  const blocker = blockers.includes(a.blocker as Blocker) ? (a.blocker as Blocker) : "launch";

  const hoursList: Hours[] = ["lt5", "5to10", "10plus"];
  const hours = hoursList.includes(a.hours as Hours) ? (a.hours as Hours) : "5to10";

  return { segment, model, stage, blocker, hours };
}

/** Parse a result back out of URL search params. Returns null if anything is off. */
export function parseResult(p: Record<string, string | string[] | undefined>): Result | null {
  const one = (k: string) => (Array.isArray(p[k]) ? p[k]?.[0] : p[k]);
  const segment = one("seg");
  const model = one("model");
  const stage = one("stage");
  const blocker = one("blocker") ?? "launch";
  const hours = one("hours") ?? "5to10";
  const ok =
    ["solopreneur", "freelancer", "consultant"].includes(segment ?? "") &&
    ["services", "consulting", "coaching"].includes(model ?? "") &&
    ["discover", "package", "build", "launch"].includes(stage ?? "") &&
    ["launch", "niche", "content", "tech", "busy", "fear"].includes(blocker) &&
    ["lt5", "5to10", "10plus"].includes(hours);
  if (!ok) return null;
  return {
    segment: segment as Segment,
    model: model as Model,
    stage: stage as Stage,
    blocker: blocker as Blocker,
    hours: hours as Hours,
  };
}

export function resultPath(r: Result) {
  const q = new URLSearchParams({
    seg: r.segment,
    model: r.model,
    stage: r.stage,
    blocker: r.blocker,
    hours: r.hours,
  });
  return `/fit/result?${q.toString()}`;
}

/* ---------- Result copy ---------- */

export const segmentCopy: Record<Segment, { title: string; line: string }> = {
  solopreneur: {
    title: "Solopreneur",
    line: "From an idea you keep talking about to a business people pay for, without building a company to do it.",
  },
  freelancer: {
    title: "Freelancer",
    line: "From chasing the next project to clients who come to you, at prices you set, month after month.",
  },
  consultant: {
    title: "Consultant",
    line: "From \u201cI know this\u201d to a packaged offer that attracts better clients and finally pays for your experience.",
  },
};

export const modelCopy: Record<Model, { title: string; why: string; trap: string }> = {
  services: {
    title: "Services",
    why: "You'd rather do the work than teach it. Good. Services is the fastest model to first revenue, because the client pays for a finished result and you already know how to produce it.",
    trap: "The trap is pricing by the hour. Hours are capped. Outcomes are not.",
  },
  consulting: {
    title: "Consulting",
    why: "You'd rather tell people what to do than do it for them. Consulting sells judgement, and judgement gets more valuable with every year of experience you already have.",
    trap: "The trap is vague advice. Consulting sells when it is attached to a specific decision or a specific number.",
  },
  coaching: {
    title: "Coaching",
    why: "You want people to be able to do it themselves. Coaching scales better than the other two once you have a repeatable path to walk people down.",
    trap: "The trap is coaching a topic instead of a transformation. Nobody buys 'marketing coaching'. They buy 'your first 10 customers'.",
  },
};

export const stageCopy: Record<
  Stage,
  { n: number; title: string; meaning: string; thisWeek: string }
> = {
  discover: {
    n: 1,
    title: "Discover",
    meaning:
      "Nobody has paid you for this outside a job yet. That's not a gap in skill, it's a gap in proof. Stage 1 is about finding the one customer who already needs what you do.",
    thisWeek:
      "Write down three people who asked you for help with this in the last year. What did it cost them not to have it? One of those three is your first customer.",
  },
  package: {
    n: 3,
    title: "Package",
    meaning:
      "You've been paid, so the skill is real. What's missing is a packaged offer with a price, so you stop quoting per project and start selling an outcome.",
    thisWeek:
      "List the last three pieces of work you were paid for and the result each client got. Write one sentence: the result, for whom, at what price, in what time. That's your offer.",
  },
  build: {
    n: 4,
    title: "Build",
    meaning:
      "You have an offer. You don't have a place to send people. Prospects who can't find you online quietly decide you're not serious, even when you are.",
    thisWeek:
      "You need one page, not a brand: who you help, the offer in one sentence, one proof point, one way to book you. Draft the text in a document today.",
  },
  launch: {
    n: 5,
    title: "Launch",
    meaning:
      "Offer, presence, proof. Everything is in place except a steady flow of conversations. Stage 5 is the one most people avoid, because it means asking.",
    thisWeek:
      "Message five people who already know you. Not a pitch: one line about what you now do, one line asking who they know who needs it. Send all five today.",
  },
};

export const blockerCopy: Record<Blocker, string> = {
  launch:
    "You said you keep learning and nothing is live. That is not a knowledge gap, it is stages 4 and 5 skipped. The fix is a date: a page live in week 4, five conversations by week 8. Learning stops being the excuse when something is already out there.",
  niche:
    "You said you can't decide your niche. Clarity isn't found by thinking harder. Stage 1 is one question, who asked you for help in the last year, and the answer is a name, not a category. Once there is a name, the niche stops being a decision.",
  content:
    "You said you post a lot and it brings attention, not clients. Visible but not valuable, because there is no offer behind the posts. That is stage 3. An offer you can say in one sentence, with a price, gives every post somewhere to send people.",
  tech:
    "You said the tech feels like a wall. You don't need to learn funnels, pages and automations. You need them built. In the program I build your page myself, and the funnel is three steps on templates you fill in.",
  busy:
    "You said you're busy, paid by the hour, and not growing. More hours won't fix it. Stages 6 and 7 replace the hourly rate with a priced offer, add a second thing to sell to the clients you already have, and put in the systems that let revenue grow without your time.",
  fear:
    "You said the offer is ready and you're afraid nobody will buy. That fear is universal, and it is fixable. We rehearse saying the price out loud before you say it to a client, and if nobody has bought by day 90, we keep going together.",
};

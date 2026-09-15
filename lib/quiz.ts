/**
 * The Fit Score: a 7-stage qualification built on
 * ONE PERSON → ONE PROBLEM → ONE PRODUCT → ONE PROMISE, then proof, capacity, commitment.
 * Each stage scores 0, 1 or 2. Capacity and commitment are hard gates.
 * Everything here is plain data so the result page can render from a URL.
 */

export type StageKey = "person" | "problem" | "product" | "promise" | "proof" | "capacity" | "commitment";
export type Lane = "challenge" | "foundation" | "notyet";
export type Model = "services" | "consulting" | "products";

export const STAGES: { key: StageKey; label: string; short: string }[] = [
  { key: "person", label: "ONE PERSON", short: "Who you help" },
  { key: "problem", label: "ONE PROBLEM", short: "What it costs them" },
  { key: "product", label: "ONE PRODUCT", short: "How you help" },
  { key: "promise", label: "ONE PROMISE", short: "Your offer in a sentence" },
  { key: "proof", label: "PROOF", short: "Has anyone paid" },
  { key: "capacity", label: "CAPACITY", short: "Hours, timing, investment" },
  { key: "commitment", label: "COMMITMENT", short: "Framework and 1:1" },
];

export type ChoiceQuestion = {
  kind: "choice";
  id: string;
  stage: StageKey | null;
  eyebrow: string;
  prompt: string;
  help?: string;
  options: { value: string; label: string; points?: number }[];
};
export type TextQuestion = {
  kind: "text";
  id: "skill";
  stage: null;
  eyebrow: string;
  prompt: string;
  help?: string;
  placeholder: string;
  maxLength: number;
};
export type Question = ChoiceQuestion | TextQuestion;

export const questions: Question[] = [
  {
    kind: "text", id: "skill", stage: null, eyebrow: "Your skill",
    prompt: "What do people already pay you for, or ask you for?",
    help: "One line. This is the raw material of your business.",
    placeholder: "e.g. I design websites for small clinics", maxLength: 140,
  },
  {
    kind: "choice", id: "person", stage: "person", eyebrow: "Stage 1 · ONE PERSON",
    prompt: "Who is the one person you want to help?",
    options: [
      { value: "specific", label: "One specific kind of person in one situation. I can describe them in a line.", points: 2 },
      { value: "broad", label: "A broad group, like small businesses or working professionals.", points: 1 },
      { value: "anyone", label: "Anyone who needs it. I haven't narrowed it down.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "asked", stage: "person", eyebrow: "Stage 1 · ONE PERSON",
    prompt: "Has a real person asked you for help with this in the last year?",
    options: [
      { value: "yes", label: "Yes. I could name them.", points: 0 },
      { value: "no", label: "Not yet.", points: -1 },
    ],
  },
  {
    kind: "choice", id: "problem", stage: "problem", eyebrow: "Stage 2 · ONE PROBLEM",
    prompt: "When this problem stays unsolved, what does it cost them?",
    options: [
      { value: "number", label: "Real money or time. I could put a number on it.", points: 2 },
      { value: "hurts", label: "It hurts, but I couldn't put a number on it.", points: 1 },
      { value: "nice", label: "It's more of a nice-to-have.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "how", stage: null, eyebrow: "Stage 3 · ONE PRODUCT",
    prompt: "How will you help them?",
    options: [
      { value: "do", label: "Do it for them (digital services)" },
      { value: "advise", label: "Decide it for them (digital consulting)" },
      { value: "teach", label: "Package it so they can do it themselves (digital products)" },
    ],
  },
  {
    kind: "choice", id: "product", stage: "product", eyebrow: "Stage 3 · ONE PRODUCT",
    prompt: "How many things do you offer right now?",
    options: [
      { value: "one", label: "One clear thing.", points: 2 },
      { value: "few", label: "A few. I haven't chosen.", points: 1 },
      { value: "none", label: "None yet, or everything anyone asks for.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "promise", stage: "promise", eyebrow: "Stage 4 · ONE PROMISE",
    prompt: "Can you say your offer in one sentence: the result, for whom, at a price, in a timeframe?",
    options: [
      { value: "all", label: "Yes, all four parts.", points: 2 },
      { value: "some", label: "Some of it. The price or the timeframe is missing.", points: 1 },
      { value: "no", label: "Not yet.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "proof", stage: "proof", eyebrow: "Stage 5 · PROOF",
    prompt: "Has anyone paid you for this outside a job?",
    options: [
      { value: "paid", label: "Yes, at least once.", points: 2 },
      { value: "unpaid", label: "I've delivered a result, but unpaid.", points: 1 },
      { value: "none", label: "Not yet.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "hours", stage: "capacity", eyebrow: "Stage 6 · CAPACITY",
    prompt: "Hours per week you can give this for the next 90 days?",
    options: [
      { value: "10plus", label: "More than 10 hours", points: 2 },
      { value: "5to10", label: "5 to 10 hours", points: 2 },
      { value: "lt5", label: "Under 5 hours", points: 0 },
    ],
  },
  {
    kind: "choice", id: "ready", stage: "capacity", eyebrow: "Stage 6 · CAPACITY",
    prompt: "When do you want to start, and are you in a position to invest in 1:1 guidance?",
    options: [
      { value: "now", label: "Now. Within the next 90 days, and I can invest.", points: 2 },
      { value: "soon", label: "Within the next 3 months.", points: 1 },
      { value: "exploring", label: "Not now. I'm exploring.", points: 0 },
    ],
  },
  {
    kind: "choice", id: "commit", stage: "commitment", eyebrow: "Stage 7 · COMMITMENT",
    prompt: "Will you run the framework as given for 90 days, and show your work every week, 1:1?",
    options: [
      { value: "both", label: "Yes to both.", points: 2 },
      { value: "framework", label: "Yes to the framework. Unsure about weekly 1:1.", points: 1 },
      { value: "no", label: "No. I'd rather pick the parts I like.", points: 0 },
    ],
  },
];

export type Answers = Partial<Record<string, string>>;
export type Scores = Record<StageKey, number>;
export type Result = { scores: Scores; total: number; lane: Lane; weakest: StageKey; model: Model };

export const MAX_SCORE = 14;

function pts(id: string, value: string | undefined): number {
  const q = questions.find((x) => x.id === id);
  if (!q || q.kind !== "choice") return 0;
  return q.options.find((o) => o.value === value)?.points ?? 0;
}

export function score(a: Answers): Result {
  const clamp = (n: number) => Math.max(0, Math.min(2, n));
  const scores: Scores = {
    person: clamp(pts("person", a.person) + pts("asked", a.asked)),
    problem: clamp(pts("problem", a.problem)),
    product: clamp(pts("product", a.product)),
    promise: clamp(pts("promise", a.promise)),
    proof: clamp(pts("proof", a.proof)),
    capacity: clamp(Math.min(pts("hours", a.hours), pts("ready", a.ready))),
    commitment: clamp(pts("commit", a.commit)),
  };
  const total = (Object.values(scores) as number[]).reduce((s, n) => s + n, 0);
  const gateFail = scores.capacity === 0 || scores.commitment === 0;
  const lane: Lane =
    !gateFail && total >= 11 && scores.capacity === 2 && scores.commitment === 2
      ? "challenge"
      : gateFail || total < 7
        ? "notyet"
        : "foundation";
  // Weakest stage among the framework four first, then the rest, lowest score wins, earlier stage breaks ties.
  const weakest = STAGES.map((s) => s.key).reduce((w, k) => (scores[k] < scores[w] ? k : w), "person" as StageKey);
  const model: Model = a.how === "advise" ? "consulting" : a.how === "teach" ? "products" : "services";
  return { scores, total, lane, weakest, model };
}

/* ---------- URL round-trip ---------- */

const ORDER: StageKey[] = STAGES.map((s) => s.key);

export function resultPath(r: Result) {
  const q = new URLSearchParams({ s: ORDER.map((k) => r.scores[k]).join(""), m: r.model });
  return `/fit/result?${q.toString()}`;
}

export function parseResult(p: Record<string, string | string[] | undefined>): Result | null {
  const one = (k: string) => (Array.isArray(p[k]) ? p[k]?.[0] : p[k]);
  const s = one("s") ?? "";
  const m = one("m") ?? "services";
  if (!/^[012]{7}$/.test(s) || !["services", "consulting", "products"].includes(m)) return null;
  const scores = Object.fromEntries(ORDER.map((k, i) => [k, Number(s[i])])) as Scores;
  // Recompute lane/weakest from scores so the URL cannot claim a lane it did not earn.
  const total = ORDER.reduce((t, k) => t + scores[k], 0);
  const gateFail = scores.capacity === 0 || scores.commitment === 0;
  const lane: Lane =
    !gateFail && total >= 11 && scores.capacity === 2 && scores.commitment === 2 ? "challenge" : gateFail || total < 7 ? "notyet" : "foundation";
  const weakest = ORDER.reduce((w, k) => (scores[k] < scores[w] ? k : w), "person" as StageKey);
  return { scores, total, lane, weakest, model: m as Model };
}

/* ---------- Copy ---------- */

export const laneCopy: Record<Lane, { title: string; headline: string; body: string }> = {
  challenge: {
    title: "Qualified",
    headline: "You're ready. Let's not waste a week.",
    body: "You know who you help, what you sell and what it costs. You have the time. You'll do the work as given. That is exactly who this is for. The full plan is open to you below, and so is the free call with me.",
  },
  foundation: {
    title: "Almost there",
    headline: "You're close. Fix the gaps below and you're in.",
    body: "Two or three parts are missing or blurry. That is normal. Work the weakest stage this week with the Blueprint, or book the free call and we'll close the gaps together. Retake the score any time. Most people move up within a month.",
  },
  notyet: {
    title: "Not yet",
    headline: "Not yet. That's an honest answer, not a no.",
    body: "Either the time or the commitment isn't there right now, or most of the plan is still empty. Start with the Blueprint. Work the weakest stage below this month. Retake the score in 30 days. Most people who come back move up.",
  },
};

export const modelCopy: Record<Model, string> = {
  services: "Digital services: you do it for them. Fastest to the first rupee.",
  consulting: "Digital consulting: you decide it for them. Highest fee per engagement.",
  products: "Digital products: you package it so they can do it themselves. Scales furthest.",
};

/** What each score means and the one thing to do, per stage. */
export const stageCopy: Record<StageKey, Record<0 | 1 | 2, { meaning: string; action: string }>> = {
  person: {
    2: { meaning: "You can name the one person, and someone real has already asked. This is the rarest thing to have at the start.", action: "Write their name at the top of everything you build from here." },
    1: { meaning: "You have a type of person, but not one in a situation, or nobody real has asked yet. Broad is where offers go to be ignored.", action: "Narrow to one kind of person in one moment of need. Then find one real person who fits and ask them one question about it." },
    0: { meaning: "\"Anyone\" is nobody. Until one person is named, nothing else in the framework can be true.", action: "List three people who asked you for help in the last year. Pick one. That is your ONE PERSON for the next 90 days." },
  },
  problem: {
    2: { meaning: "You can put a number on what the problem costs. That number is your pricing power.", action: "Write the number down. Your price is a fraction of it." },
    1: { meaning: "The pain is real but unmeasured. Unmeasured pain gets \"let me think about it\".", action: "Ask two people who have this problem what it costs them in money or hours per month. Use their words." },
    0: { meaning: "A nice-to-have does not get bought by a one-person business's customers. It gets bookmarked.", action: "Find the expensive version of this problem. Who loses money or sleep when it is unsolved? That is your person." },
  },
  product: {
    2: { meaning: "One model, one thing. The customer can repeat what you do to a friend.", action: "Say no to the next request that isn't this thing." },
    1: { meaning: "A few things, unchosen. The customer hears indecision and picks none.", action: "Pick the one that has been paid for most, or asked for most. Park the others for 90 days, in writing." },
    0: { meaning: "Everything, or nothing yet. A menu is not a product.", action: "Choose do, decide or teach, then the single deliverable. One sentence, this week." },
  },
  promise: {
    2: { meaning: "Result, for whom, at a price, in a timeframe. That sentence is the business.", action: "Say it out loud to three people and check they can repeat it back." },
    1: { meaning: "The sentence exists but a part is missing, usually the price or the deadline. Those are the two parts that make people say yes.", action: "Add the missing part today. A number that sounds decided, and a date." },
    0: { meaning: "No sentence yet. Until there is one, marketing has nothing to carry.", action: "Fill in the four blanks: [result] for [person] at [price] in [timeframe]. Ugly is fine. Complete is what matters." },
  },
  proof: {
    2: { meaning: "Someone has paid. The skill is real and so is the demand.", action: "Write down what they got. That is your first proof point." },
    1: { meaning: "You have delivered a result, unpaid. The gap is the ask, not the skill.", action: "Go back to that person and ask for one line you can quote. Then charge the next one." },
    0: { meaning: "No result yet. This is the stage most people try to skip with a website.", action: "Do one small version of the offer for one person you know, at a real price, this month." },
  },
  capacity: {
    2: { meaning: "Five or more hours a week, starting within 90 days, able to invest. The build can begin.", action: "Block the hours in your calendar now, before anything else gets them." },
    1: { meaning: "The hours are there but the start is a few months out. The framework will keep.", action: "Set the start date in writing. Use the time to fix the weakest stage above." },
    0: { meaning: "Under five hours, or not now. Building on that produces frustration, not a business, and I won't sell you one.", action: "Find the five hours first. When they exist, retake this score." },
  },
  commitment: {
    2: { meaning: "You'll run the framework as given and show your work weekly. That is the whole reason the guarantee can exist.", action: "Nothing. This is the part most people fail." },
    1: { meaning: "Framework yes, weekly 1:1 unsure. The 1:1 is where the price gets said out loud and the fear gets handled.", action: "Try it for seven days and decide with evidence." },
    0: { meaning: "Picking the parts you like is how the last course ended: notes, no launch.", action: "Come back when you're ready to run it in order. The framework only works whole." },
  },
};

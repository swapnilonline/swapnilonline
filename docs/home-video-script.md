# Home page video: "Consulting, Coaching or Services"

Length: about 3 minutes. One take is fine. Talk to one person, not an audience.

Where it goes: the home page, between the promise and "Who it's for". It appears as soon as you set `NEXT_PUBLIC_HOME_VIDEO_ID` to the YouTube id (the part after `v=`). Upload as unlisted if you don't want it on your channel page.

Setup: your desk at home, phone at eye level, window light in front of you, plain wall behind. Wear the black t-shirt. No slides, no music. Add captions in YouTube after upload; most people watch muted.

---

## 0:00 – 0:20 · Open with the claim

> Same skill, three businesses. Most people pick the wrong one, and then they wonder why nothing sells. I've built websites for 2,500 businesses from this desk, and I can usually tell in one conversation which model someone should be in. Let me show you the three.

## 0:20 – 1:00 · Services

> One. Services. You do the work for them. A designer builds the website. A writer writes the copy. A bookkeeper does the books.
>
> This is the fastest model to your first rupee, because the client pays for a finished thing and you already know how to make it.
>
> The trap: pricing by the hour. Hours are capped. Outcomes are not. Sell the finished website, not the forty hours.

## 1:00 – 1:40 · Consulting

> Two. Consulting. You tell them what to do, they do it. A GST consultant, a hiring advisor, a marketing strategist.
>
> This is for people with ten or twenty years of experience. You're selling judgement, and judgement gets more valuable every year.
>
> The trap: vague advice. "I help businesses grow" sells nothing. "I'll tell you which two of your six products to kill" sells.

## 1:40 – 2:20 · Coaching

> Three. Coaching. You teach them to do it themselves. Fitness, English speaking, LinkedIn for founders.
>
> Coaching scales best, because once you have a path, you can walk many people down it.
>
> The trap: coaching a topic instead of a result. Nobody buys "marketing coaching". They buy "your first ten customers".

## 2:20 – 2:50 · How to pick

> How do you pick? Not by what pays most. By how you like to help. If you'd rather do it, Services. If you'd rather advise, Consulting. If you want them to be able to do it without you, Coaching.
>
> That one question is the second question in my Fit Score.

## 2:50 – 3:05 · Close

> Take it. Eight questions, two minutes. It tells you your model, your stage, and the one thing to do this week. The link is right under this video.

---

## After recording

1. Upload to YouTube. Title: "Consulting, Coaching or Services: which business fits you?" Unlisted is fine.
2. Copy the id from the URL: `youtube.com/watch?v=THIS_PART`.
3. Add `NEXT_PUBLIC_HOME_VIDEO_ID=THIS_PART` in Vercel → Settings → Environment Variables, then redeploy.
4. Turn on captions in YouTube Studio → Subtitles → auto-generate, then fix any wrong words.

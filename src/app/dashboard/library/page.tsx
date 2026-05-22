"use client";

import { useState } from "react";
import Link from "next/link";

const VIRAL_FORMATS = [
  {
    id: "misdirect",
    name: "The Misdirect",
    hook: 'Everyone always asks me how to [do X]... well I don\'t know, but I do know [your product]',
    example: 'Everyone always asks me how to find trending stocks... well I don\'t know, but I do know stocksbrew finds you hidden gems before they blow up.',
    vibe: "Humorous, relatable, humble-brag",
    source: "TikTok — 2.3M+ views on similar formats",
    script: `[Person looking at camera, slightly confused]
"Everyone always asks me [question about your space]..."

[pause, shrug]

"Well I don't know, because I'm not [that thing].

But I do know [your product]."

[Cut to product footage / screenshots]

"It does [key feature 1], [key feature 2], and [key feature 3]."

[Back to person]

"Honestly. Just try it."

[CTA: Link in bio / Free trial]`,
  },
  {
    id: "discovery",
    name: "The Discovery",
    hook: "I just found the craziest [tool/app] for [use case]",
    example: "I just found the craziest app for stock research. It literally reads earnings calls and Reddit sentiment and tells you what to do.",
    vibe: "Excited, genuine, share-with-a-friend",
    source: "TikTok — 1.8M+ views on discovery formats",
    script: `[Person, slightly blown away]
"I just found the craziest [tool] for [use case]."

[Cut to screen recording / product demo]
"Look at this. It does [amazing thing]."

[Quick cuts of features]
"Also does [feature 2]."
"And [feature 3]."

[Back to person]
"I've been using it for [timeframe] and honestly..."

[shrug, smile]
"It's kinda insane."

[CTA: Link in bio]`,
  },
  {
    id: "contrarian",
    name: "The Contrarian",
    hook: "Stop using [common tool], use [your product] instead",
    example: "Stop using 5 different tabs for stock research. Use stocksbrew instead. One page, one read, done.",
    vibe: "Direct, confident, no-nonsense",
    source: "Instagram Reels — 500K+ likes on similar",
    script: `[Person, direct to camera]
"Stop using [common tool / old way]."

[Cut to product]
"Use [your product] instead."

[Show comparison — old vs new]
"It does [feature], [feature], and [feature]."

[Back to person]
"Same results. Less time. Less stress."

[CTA: Try it free]`,
  },
  {
    id: "hottake",
    name: "The Hot Take",
    hook: "[Topic] in 2026 is actually [unexpected take]",
    example: "Stock research in 2026 is actually insane. AI is reading earnings calls for you and telling you when to buy.",
    vibe: "Bold, opinionated, conversation-starter",
    source: "TikTok — 3.1M+ views on hot take formats",
    script: `[Person, strong eye contact]
"[Topic] in 2026 is actually [hot take]."

[Cut to proof / screenshots]
"Here's the thing. [Your product] does [key capability]."
"I've been using it for [timeframe]."

[Quick cuts showing results]
"Look at this — [specific result]."
"This alone saved me [time/money]."

[Back to person]
"Don't take my word for it. Try it."

[CTA: Free trial]`,
  },
  {
    id: "review",
    name: "The Honest Review",
    hook: "I tried [X] so you don't have to. Here's what actually works.",
    example: "I tried every stock research tool so you don't have to. Stocksbrew is the only one that actually tells you what to do instead of drowning you in data.",
    vibe: "Trustworthy, detailed, reviewer's POV",
    source: "YouTube Shorts — 2.5M+ views on review formats",
    script: `[Person, serious]
"I tried [category of tools] so you don't have to."

[Cut to showing the options]
"Most of them show you data but leave you confused."

[Cut to product]
"But [your product]? It actually [key differentiator]."

[Show key features quickly]
"[Feature 1] check, [Feature 2] check, [Feature 3] check."

[Back to person]
"Honestly? This is the one I'd pay for."

[CTA: Link to free trial]`,
  },
  {
    id: "secret",
    name: "The Secret Reveal",
    hook: "Nobody tells you this about [topic] but here's the truth",
    example: "Nobody tells you this about stock analysis but here's the truth. 90% of the data you're looking at is noise. You just need one clear signal.",
    vibe: "Insider knowledge, secret-sauce",
    source: "TikTok — 1.2M+ on insider formats",
    script: `[Person, whispering / conspiratorial]
"Nobody tells you this about [topic]."

[LEAN IN]
"But here's the truth."

[Cut to product]
"[Your product] cuts through all the noise and gives you [one clear thing]."

[Show it working]
"Instead of 10 tabs... one page."
"Instead of guesswork... [clear signal]."

[Back to person]
"Now you know."

[CTA: Link in bio]`,
  },
  {
    id: "experiment",
    name: "The 30-Day Challenge",
    hook: "I used [product] for [timeframe] and here's what happened",
    example: "I used stocksbrew for 2 weeks and here's what happened. I stopped wasting an hour every morning on research. Now it takes 3 minutes.",
    vibe: "Story-driven, evidence-based, transformation",
    source: "YouTube — 4M+ on experiment formats",
    script: `[Person, day 1 energy]
"I decided to use [product] for [timeframe]."

[Quick montage of using the product]
"Day 1: Set up my watchlist."
"Day 3: Got my first alert."
"Day 7: [specific win]."

[Cut to person, current day]
"The result?"

[Show stat / outcome]
"[Specific result]."

[Back to person]
"If you're still doing things the old way. Stop."

[CTA: Try it]`,
  },
  {
    id: "future",
    name: "The Future Prediction",
    hook: "[Year] is the year of [something] and here's why",
    example: "This is the year AI actually changes how we invest. Not hype. Real tools you can use right now.",
    vibe: "Visionary, trend-caster, big picture",
    source: "LinkedIn — growing format",
    script: `[Person, authoritative]
"[Year] is the year of [big trend]."

[Cut to concept / product]
"And here's why."

[Explain the shift]
"[Your product] is already doing [key thing].
Most people don't know about it yet."

[Show product as proof]
"But the ones who use it? They're already [outcome]."

[Back to person]
"Don't be late to this."

[CTA: Get early access / Try free]`,
  },
  {
    id: "rant",
    name: "The Relatable Rant",
    hook: "I'm so tired of [common frustration], so I built/found [solution]",
    example: "I'm so tired of news apps showing me celeb gossip when I just want tech news. So I built Trace. No noise. Just tech.",
    vibe: "Frustrated → relieved, relatable, personal",
    source: "TikTok — 5M+ on rant-to-solution formats",
    script: `[Person, frustrated]
"I'm so tired of [common frustration]."

[Cut to evidence / relatable problem]
"You know what I mean. [specific pain point]."

[Beat — lightbulb moment]
"So I [built/found] [your product]."

[Cut to solution in action]
"It does [key thing]. No [bad thing]. Just [good thing]."

[Back to person, now relieved]
"Honestly? Best decision I've made."

[CTA: Link — free trial]`,
  },
  {
    id: "comparison",
    name: "The Before & After",
    hook: "Here's what my [routine] looked like before vs after [product]",
    example: "Here's what my morning routine looked like before stocksbrew vs after. From 30 minutes of tab switching to 3 minutes of reading.",
    vibe: "Visual transformation, dramatic, clear win",
    source: "Instagram — 3M+ on comparison formats",
    script: `[Split screen or cut]
"Before [product]: [old painful routine]."

[Show old way — tab switching, confusion]
"After [product]: [new streamlined way]."

[Show product simplicity]
"The difference is [key metric]."
"I went from [X] to [Y]."

[Person, satisfied]
"Wish I had this sooner."

[CTA: Start your transformation]`,
  },
];

const FORMAT_CATEGORIES = [
  { id: "all", label: "All Formats" },
  { id: "tiktok", label: "TikTok Style" },
  { id: "review", label: "Reviews & Tests" },
  { id: "story", label: "Story-Driven" },
  { id: "hot-take", label: "Hot Takes" },
];

export default function LibraryPage() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [category, setCategory] = useState("all");

  const filtered = category === "all"
    ? VIRAL_FORMATS
    : VIRAL_FORMATS.filter((f) => {
        if (category === "tiktok") return ["misdirect", "discovery", "secret", "rant"].includes(f.id);
        if (category === "review") return ["review", "experiment", "comparison"].includes(f.id);
        if (category === "story") return ["experiment", "comparison", "discovery"].includes(f.id);
        if (category === "hot-take") return ["hottake", "contrarian", "future"].includes(f.id);
        return true;
      });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-stone-500">
            📚 Format Library
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-stone-900">
            Viral Video Formats
          </h2>
          <p className="mt-1 text-stone-600">
            Proven short-form video templates. Pick one, we&apos;ll generate a script for your SaaS.
          </p>
        </div>
        <Link
          href="/viral-video-ai/dashboard/create"
          className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800"
        >
          ← Back to Create
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {FORMAT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              category === cat.id
                ? "bg-stone-900 text-white"
                : "border-2 border-stone-200 bg-white text-stone-600 hover:border-stone-900"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Format cards */}
      {selectedFormat ? (
        /* Detail view */
        <div className="animate-fade-in-up">
          <button
            onClick={() => setSelectedFormat(null)}
            className="mb-6 flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900"
          >
            ← Back to library
          </button>

          {(() => {
            const f = VIRAL_FORMATS.find((x) => x.id === selectedFormat);
            if (!f) return null;
            return (
              <div className="space-y-6">
                <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-stone-900">{f.name}</h3>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                          {f.vibe}
                        </span>
                        <span className="rounded-full bg-wood/10 px-3 py-1 text-xs font-medium text-wood">
                          {f.source}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Step 3: Script generation with ${f.name} template coming next!`)}
                      className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800"
                    >
                      Use This Format →
                    </button>
                  </div>

                  <div className="mt-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Hook</p>
                    <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-4 italic text-stone-700">
                      "{f.hook}"
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Example for Your Product</p>
                    <div className="rounded-2xl border-2 border-wood/30 bg-wood/5 p-4 text-sm text-stone-700">
                      {f.example}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Full Script Template</p>
                    <pre className="whitespace-pre-wrap rounded-2xl border border-stone-200 bg-stone-50 p-6 text-sm leading-relaxed text-stone-700 font-sans">
                      {f.script}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* Grid view */
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className="card-hover group rounded-[24px] border-2 border-stone-200 bg-white p-6 text-left transition-all hover:border-stone-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-stone-900">
                    {format.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 line-clamp-2">
                    {format.hook}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                      {format.vibe.split(",")[0]}
                    </span>
                    <span className="text-xs text-stone-400">{format.source}</span>
                  </div>
                </div>
                <span className="ml-4 mt-1 text-2xl opacity-50 transition-all group-hover:opacity-100">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

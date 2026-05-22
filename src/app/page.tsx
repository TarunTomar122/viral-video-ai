"use client";

import { useState } from "react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    credits: "60 credits",
    desc: "For indie devs testing the waters",
    features: ["60 videos per month", "2 brand profiles", "720p export", "Basic voiceover"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/month",
    credits: "Unlimited",
    desc: "For serious content pipelines",
    features: ["Unlimited videos", "10 brand profiles", "1080p export", "Premium AI voiceover", "Auto-schedule via Postiz", "Priority support"],
    popular: true,
  },
  {
    id: "studio",
    name: "Studio",
    price: "$99",
    period: "/month",
    credits: "Unlimited + Team",
    desc: "For agencies & studios",
    features: ["Everything in Pro", "Unlimited brand profiles", "4K export", "Custom voice models", "Multi-platform scheduling", "API access", "Dedicated support"],
    popular: false,
  },
];

const FEATURES = [
  {
    title: "URL to Video",
    desc: "Paste your SaaS URL and we extract everything — brand colors, logo, value prop, features. One click to a full UGC video.",
    icon: "🔗",
  },
  {
    title: "Auto-Brand Identity",
    desc: "Our scraper reads your landing page, captures your brand voice, color palette, and key messaging. No manual setup.",
    icon: "🎨",
  },
  {
    title: "UGC-Style Generation",
    desc: "AI generates testimonial-style videos that feel authentic. No actors, no scripts, no studio time.",
    icon: "🎬",
  },
  {
    title: "Multi-Platform Scheduling",
    desc: "Schedule directly to TikTok, Instagram Reels, YouTube Shorts via Postiz integration. Set and forget.",
    icon: "📅",
  },
  {
    title: "Batch Create",
    desc: "Generate 10 video variations from one URL. Different hooks, different angles, same brand identity.",
    icon: "⚡",
  },
  {
    title: "Analytics",
    desc: "Track which videos perform. See views, engagement, and conversion data per video.",
    icon: "📊",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Paste Your URL", desc: "Enter your SaaS landing page URL. We scrape and extract everything." },
  { step: "02", title: "AI Generates Video", desc: "Our engine creates a UGC-style testimonial video with your branding, screenshots, and a compelling script." },
  { step: "03", title: "Review & Export", desc: "Watch your video, tweak if needed, export in your preferred format." },
  { step: "04", title: "Auto-Schedule", desc: "Send directly to your social platforms via Postiz. Consistent content, zero effort." },
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="min-h-full">
      {/* ─── HEADER ─── */}
      <header className="glass fixed top-0 left-0 right-0 z-50 h-20 border-b border-stone-200/50">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-display text-xl font-bold tracking-tight text-stone-900">
              Viral Video AI
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="/create" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
              Pricing
            </a>
            <a href="#how" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
              How It Works
            </a>
          </nav>
          <a href="/create" className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-stone-800 inline-block">
            Get Started
          </a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="material-bg relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="animate-fade-in-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-1.5 text-xs font-medium text-stone-600">
            🚀 Built for indie developers
          </div>
          <h1 className="animate-fade-in-up-1 font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-stone-900 md:text-7xl">
            Automate your{" "}
            <span className="relative">
              content pipeline
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-wood/20" />
            </span>
            <br />
            with AI videos
          </h1>
          <p className="animate-fade-in-up-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
            Just paste your SaaS URL. We generate UGC-style testimonial videos with your branding
            and schedule them on your platforms. No cameras, no actors, no scripts.
          </p>
          <div className="animate-fade-in-up-3 mt-10 flex items-center justify-center gap-4">
            <a href="/create" className="rounded-full bg-stone-900 px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800 inline-block">
              Start Free Trial
            </a>
            <button className="rounded-full border-2 border-stone-300 px-8 py-3.5 text-base font-semibold text-stone-700 transition-all hover:border-stone-900 hover:text-stone-900">
              See Examples
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="animate-fade-in-up-3 mx-auto mt-16 max-w-5xl px-6">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[32px] border border-stone-200 bg-stone-100 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">🎬</div>
                <p className="font-display text-2xl font-bold text-stone-400">Your video appears here</p>
                <p className="mt-2 text-sm text-stone-400">Paste your URL to preview</p>
              </div>
            </div>
            {/* Glass badge */}
            <div className="absolute top-6 left-6 glass-white rounded-2xl px-6 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">MATERIALS</p>
              <p className="mt-0.5 text-sm font-medium text-stone-700">Anodized aluminum / Warm grain</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-wood">
              Process
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
              From URL to scheduled video in 4 steps
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="card-hover rounded-[24px] border-2 border-transparent bg-white p-8 hover:border-stone-300">
                <span className="font-display text-5xl font-black text-stone-200">{item.step}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="bg-stone-900 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-wood">
              Capabilities
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-stone-100 md:text-5xl">
              Everything you need to go viral
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              No more staring at a blank timeline. From scraping to scheduling in one click.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="card-hover rounded-[24px] border border-stone-700/50 bg-stone-800/50 p-8"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-stone-100">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-wood">
              Pricing
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-600">
              Start with 60 videos. Upgrade when you outgrow us.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`card-hover cursor-pointer rounded-[24px] border-2 bg-white p-8 transition-all ${
                  selectedPlan === plan.id
                    ? "border-stone-900 shadow-xl"
                    : "border-transparent hover:border-stone-300"
                }`}
              >
                {plan.popular && (
                  <span className="mb-4 inline-block rounded-full bg-wood/10 px-3 py-1 text-xs font-semibold text-wood">
                    Most Popular
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-stone-900">{plan.price}</span>
                  <span className="text-sm text-stone-500">{plan.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-wood">{plan.credits}</p>
                <p className="mt-3 text-sm text-stone-600">{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-wood" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/create"
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    selectedPlan === plan.id
                      ? "bg-stone-900 text-white hover:bg-stone-800"
                      : "border-2 border-stone-200 text-stone-700 hover:border-stone-900"
                  }`}
                >
                  {plan.id === "starter" ? "Start Free Trial" : "Subscribe"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEC TABLE ─── */}
      <section className="border-t border-stone-200 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center font-display text-3xl font-extrabold tracking-tight text-stone-900">
            Compare Plans
          </h2>
          <div className="overflow-hidden rounded-[24px] border border-stone-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="p-5 font-medium text-stone-500">Feature</th>
                  <th className="p-5 font-medium text-stone-500">Starter</th>
                  <th className="bg-stone-100 p-5 font-semibold text-stone-900">
                    Pro
                  </th>
                  <th className="p-5 font-medium text-stone-500">Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="p-5 text-stone-700">Videos per month</td>
                  <td className="p-5 text-stone-600">60</td>
                  <td className="bg-stone-100 p-5 font-medium text-stone-900">Unlimited</td>
                  <td className="p-5 text-stone-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-5 text-stone-700">Brand profiles</td>
                  <td className="p-5 text-stone-600">2</td>
                  <td className="bg-stone-100 p-5 font-medium text-stone-900">10</td>
                  <td className="p-5 text-stone-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-5 text-stone-700">Export quality</td>
                  <td className="p-5 text-stone-600">720p</td>
                  <td className="bg-stone-100 p-5 font-medium text-stone-900">1080p</td>
                  <td className="p-5 text-stone-600">4K</td>
                </tr>
                <tr>
                  <td className="p-5 text-stone-700">Auto-schedule</td>
                  <td className="p-5 text-stone-600">—</td>
                  <td className="bg-stone-100 p-5 font-medium text-stone-900">✓</td>
                  <td className="p-5 text-stone-600">✓</td>
                </tr>
                <tr>
                  <td className="p-5 text-stone-700">Multi-platform</td>
                  <td className="p-5 text-stone-600">—</td>
                  <td className="bg-stone-100 p-5 font-medium text-stone-900">—</td>
                  <td className="p-5 text-stone-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="material-bg border-t border-stone-200 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
            Ready to automate your content?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-600">
            No cameras. No scripts. Just paste your URL and let AI do the work.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="/create" className="rounded-full bg-stone-900 px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800 inline-block">
              Start Free Trial
            </a>
            <button className="rounded-full border-2 border-stone-300 px-8 py-3.5 text-base font-semibold text-stone-700 transition-all hover:border-stone-900 hover:text-stone-900">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-stone-200 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-display font-bold tracking-tight text-stone-900">Viral Video AI</span>
            </div>
            <p className="text-sm text-stone-500">
              Built for indie developers who want to grow without the content grind.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── STICKY CHECKOUT BAR ─── */}
      <div className="glass-white fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-display text-lg font-bold text-stone-900">
                {PLANS.find((p) => p.id === selectedPlan)?.name}
              </span>
              <span className="ml-3 inline-flex items-center gap-1.5 text-sm text-green-600">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                In stock
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-display text-xl font-bold text-stone-900">
              {PLANS.find((p) => p.id === selectedPlan)?.price}
              <span className="text-sm font-normal text-stone-500">/mo</span>
            </span>
            <a href="/create" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800 inline-block">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

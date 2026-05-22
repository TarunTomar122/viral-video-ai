"use client";

import { useState } from "react";

type BrandData = {
  name: string;
  title: string;
  tagline: string;
  description: string;
  logo: string | null;
  colors: string[];
  headlines: string[];
  features: string[];
  pricing: string[];
};

type Step = "url" | "loading" | "review";

export default function CreatePage() {
  const [step, setStep] = useState<Step>("url");
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url.trim()) return;
    setStep("loading");
    setError("");

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setBrand(data.brand);
        setStep("review");
      } else {
        setError(data.error || "Failed to scrape URL");
        setStep("url");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setStep("url");
    }
  };

  return (
    <div className="min-h-full bg-stone-50">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 h-20 border-b border-stone-200/50">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-display text-xl font-bold tracking-tight text-stone-900">
              Viral Video AI
            </span>
          </div>
          <span className="text-sm font-medium text-stone-500">Step {step === "url" ? "1" : "2"} of 4</span>
        </div>
      </header>

      {/* Progress */}
      <div className="fixed top-20 left-0 right-0 z-40 h-1 bg-stone-200">
        <div
          className="h-full bg-stone-900 transition-all duration-700 ease-out"
          style={{ width: step === "url" ? "25%" : step === "loading" ? "50%" : "50%" }}
        />
      </div>

      <main className="pt-32 pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {/* Step 1: URL Input */}
          {step === "url" && (
            <div className="animate-fade-in-up">
              <div className="mb-8 text-center">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-wood">
                  Step 1 of 4
                </span>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-stone-900">
                  Enter your SaaS URL
                </h1>
                <p className="mx-auto mt-3 max-w-md text-stone-600">
                  We&apos;ll scrape your landing page and build your brand identity automatically.
                </p>
              </div>

              <div className="mx-auto max-w-xl">
                <div className="rounded-[24px] border-2 border-stone-200 bg-white p-2 transition-all focus-within:border-stone-900">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-3 px-4">
                      <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleScrape()}
                        placeholder="https://your-saas.com"
                        className="h-14 w-full bg-transparent text-lg text-stone-900 placeholder-stone-400 outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleScrape}
                      disabled={!url.trim()}
                      className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800 disabled:opacity-40 disabled:hover:scale-100"
                    >
                      Analyze →
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
                <p className="mt-4 text-center text-sm text-stone-400">
                  We&apos;ll extract: brand name, colors, logo, features, and value proposition
                </p>
              </div>
            </div>
          )}

          {/* Loading */}
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-8 h-12 w-12 animate-spin rounded-full border-3 border-stone-200 border-t-stone-900" />
              <p className="font-display text-xl font-bold text-stone-900">Analyzing your SaaS...</p>
              <p className="mt-2 text-sm text-stone-500">Extracting brand identity, features, and messaging</p>
            </div>
          )}

          {/* Step 2: Review */}
          {step === "review" && brand && (
            <div className="animate-fade-in-up space-y-8">
              <div className="text-center">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-wood">
                  Step 2 of 4
                </span>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-stone-900">
                  We found your brand
                </h1>
                <p className="mx-auto mt-3 max-w-md text-stone-600">
                  Review what we extracted. Edit anything that looks off.
                </p>
              </div>

              {/* Brand Card */}
              <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
                {/* Logo + Name */}
                <div className="flex items-center gap-6">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt=""
                      className="h-16 w-16 rounded-2xl border border-stone-200 object-contain p-2 mix-blend-multiply"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-stone-100">
                      <span className="font-display text-2xl font-bold text-stone-400">?</span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-stone-900">{brand.name}</h2>
                    <p className="mt-1 text-stone-600">{brand.tagline || brand.description.slice(0, 100)}</p>
                  </div>
                </div>

                {/* Colors */}
                {brand.colors.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Brand Colors</p>
                    <div className="flex gap-3">
                      {brand.colors.map((c) => (
                        <div key={c} className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full border border-stone-200" style={{ backgroundColor: c }} />
                          <span className="text-sm text-stone-500">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {brand.description && (
                  <div className="mt-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Description</p>
                    <p className="text-stone-700">{brand.description}</p>
                  </div>
                )}

                {/* Headlines */}
                {brand.headlines.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Key Headlines</p>
                    <div className="space-y-2">
                      {brand.headlines.map((h, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-700"
                        >
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {brand.features.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Detected Features</p>
                    <div className="flex flex-wrap gap-2">
                      {brand.features.map((f, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between rounded-[24px] border-2 border-stone-200 bg-white p-6">
                <div>
                  <p className="text-sm text-stone-600">Everything look right?</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("url")}
                    className="rounded-full border-2 border-stone-200 px-6 py-3 text-sm font-semibold text-stone-700 transition-all hover:border-stone-900"
                  >
                    ← Edit
                  </button>
                  <button
                    onClick={() => alert("Next: Video generation coming soon!")}
                    className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800"
                  >
                    Generate Video →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

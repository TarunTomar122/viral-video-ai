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
};

type Step = "url" | "loading" | "review";

function extractFromHTML(html: string, url: string): BrandData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const getMeta = (prop: string) =>
    doc.querySelector(`meta[property="${prop}"]`)?.getAttribute("content") ||
    doc.querySelector(`meta[name="${prop}"]`)?.getAttribute("content") ||
    "";

  const title =
    getMeta("og:title") || doc.title || doc.querySelector("h1")?.textContent?.trim() || "";

  const description = getMeta("og:description") || getMeta("description") || "";

  // Headlines
  const headlines: string[] = [];
  doc.querySelectorAll("h1, h2, h3").forEach((el) => {
    const text = el.textContent?.trim() || "";
    if (text.length > 5 && text.length < 200) headlines.push(text);
  });

  // Logo
  let logo =
    getMeta("og:image") ||
    doc.querySelector('link[rel="icon"]')?.getAttribute("href") ||
    doc.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
    "";
  if (logo && !logo.startsWith("http")) {
    try {
      logo = new URL(logo, url).href;
    } catch {}
  }

  // Colors from all style tags and inline styles
  const colors: string[] = [];
  const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g;
  let allStyle = "";
  doc.querySelectorAll("style").forEach((el) => (allStyle += el.innerHTML));
  doc.querySelectorAll("[style]").forEach((el) => (allStyle += el.getAttribute("style") || ""));
  const matches = allStyle.match(colorRegex);
  if (matches) {
    const unique = [...new Set(matches)];
    const meaningful = unique.filter(
      (c) => !["#fff", "#ffffff", "#000", "#000000", "#fff"].includes(c.toLowerCase())
    );
    colors.push(...meaningful.slice(0, 3));
  }

  // Features
  const features: string[] = [];
  doc.querySelectorAll('[class*="feature"], [class*="benefit"], [class*="card"]').forEach((el) => {
    const text = el.querySelector("h3, h4, strong")?.textContent?.trim() || "";
    if (text.length > 3 && text.length < 120 && !features.includes(text)) {
      features.push(text);
    }
  });

  // Tagline
  const tagline =
    getMeta("og:description") ||
    doc.querySelector(".hero h1, .hero h2, .banner h1, section:first-child h1")
      ?.textContent?.trim() ||
    "";

  return {
    name: title.split("—")[0]?.trim() || title.split("|")[0]?.trim() || title,
    title: title.slice(0, 120),
    tagline: tagline.slice(0, 200),
    description: description.slice(0, 500),
    logo: logo || null,
    colors: colors.length > 0 ? colors : ["#1C1917", "#A67B5B"],
    headlines: [...new Set(headlines)].slice(0, 8),
    features: [...new Set(features)].slice(0, 8),
  };
}

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
      // Use a CORS proxy to bypass restrictions
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url.trim())}`;
      const res = await fetch(proxyUrl);
      const data = await res.json();
      const html = data.contents || "";
      const brandData = extractFromHTML(html, url.trim());
      setBrand(brandData);
      setStep("review");
    } catch {
      // Fallback: try direct fetch
      try {
        const res = await fetch(url.trim(), {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; ViralVideoAI/1.0)" },
        });
        const html = await res.text();
        const brandData = extractFromHTML(html, url.trim());
        setBrand(brandData);
        setStep("review");
      } catch {
        // Ultimate fallback: show a mock so user can see the flow
        const domain = new URL(url.trim()).hostname;
        setBrand({
          name: domain.replace("www.", "").split(".")[0] || domain,
          title: `Welcome to ${domain}`,
          tagline: "Your SaaS value proposition",
          description: "We couldn't scrape this site directly. Try entering details manually in the next step.",
          logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
          colors: ["#1C1917", "#A67B5B"],
          headlines: ["Your main headline here"],
          features: ["Feature 1", "Feature 2", "Feature 3"],
        });
        setStep("review");
      }
    }
  };

  return (
    <div className="min-h-full bg-stone-50">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 h-20 border-b border-stone-200/50">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <a href="/viral-video-ai" className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-display text-xl font-bold tracking-tight text-stone-900">
                Viral Video AI
              </span>
            </a>
          </div>
          <span className="text-sm font-medium text-stone-500">
            Step {step === "url" ? "1" : "2"} of 4
          </span>
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
                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
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
              <p className="mt-2 text-sm text-stone-500">
                Extracting brand identity, features, and messaging
              </p>
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
                    <h2 className="font-display text-2xl font-bold text-stone-900">
                      {brand.name}
                    </h2>
                    <p className="mt-1 text-stone-600">
                      {brand.tagline || brand.description.slice(0, 100)}
                    </p>
                  </div>
                </div>

                {brand.colors.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Brand Colors
                    </p>
                    <div className="flex gap-3">
                      {brand.colors.map((c) => (
                        <div key={c} className="flex items-center gap-2">
                          <div
                            className="h-8 w-8 rounded-full border border-stone-200"
                            style={{ backgroundColor: c }}
                          />
                          <span className="text-sm text-stone-500">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {brand.description && (
                  <div className="mt-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Description
                    </p>
                    <p className="text-stone-700">{brand.description}</p>
                  </div>
                )}

                {brand.headlines.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Key Headlines
                    </p>
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

                {brand.features.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Detected Features
                    </p>
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
                    onClick={() => alert("Step 3: Video generation coming soon!")}
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

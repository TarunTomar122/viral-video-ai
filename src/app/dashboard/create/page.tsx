"use client";

import { useState } from "react";
import Link from "next/link";

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

  const headlines: string[] = [];
  doc.querySelectorAll("h1, h2, h3").forEach((el) => {
    const text = el.textContent?.trim() || "";
    if (text.length > 5 && text.length < 200) headlines.push(text);
  });

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

  const colors: string[] = [];
  const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g;
  let allStyle = "";
  doc.querySelectorAll("style").forEach((el) => (allStyle += el.innerHTML));
  doc.querySelectorAll("[style]").forEach((el) => (allStyle += el.getAttribute("style") || ""));
  const matches = allStyle.match(colorRegex);
  if (matches) {
    const unique = [...new Set(matches)];
    const meaningful = unique.filter(
      (c) => !["#fff", "#ffffff", "#000", "#000000"].includes(c.toLowerCase())
    );
    colors.push(...meaningful.slice(0, 3));
  }

  const features: string[] = [];
  doc.querySelectorAll('[class*="feature"], [class*="benefit"], [class*="card"]').forEach((el) => {
    const text = el.querySelector("h3, h4, strong")?.textContent?.trim() || "";
    if (text.length > 3 && text.length < 120 && !features.includes(text)) {
      features.push(text);
    }
  });

  const tagline =
    getMeta("og:description") ||
    doc.querySelector(".hero h1, .hero h2, section:first-child h1")
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
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url.trim())}`;
      const res = await fetch(proxyUrl);
      const html = await res.text();
      const brandData = extractFromHTML(html, url.trim());
      setBrand(brandData);
      setStep("review");
    } catch {
      try {
        const res = await fetch(url.trim(), {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; ViralVideoAI/1.0)" },
        });
        const html = await res.text();
        const brandData = extractFromHTML(html, url.trim());
        setBrand(brandData);
        setStep("review");
      } catch {
        const domain = new URL(url.trim()).hostname;
        setBrand({
          name: domain.replace("www.", "").split(".")[0] || domain,
          title: `Welcome to ${domain}`,
          tagline: "Could not scrape automatically. Edit details below.",
          description: "Enter your brand information manually in the text editor.",
          logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
          colors: ["#1C1917", "#A67B5B"],
          headlines: ["Your main headline"],
          features: ["Feature 1", "Feature 2", "Feature 3"],
        });
        setStep("review");
      }
    }
  };

  return (
    <div>
      {/* Progress stepper */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          {["URL", "Review", "Script", "Generate"].map((label, i) => {
            const idx = ["url", "review", "script", "generate"].indexOf(
              step === "loading" ? "url" : step
            );
            const done = i < (step === "review" ? 1 : step === "url" ? 0 : 0);
            const active = i === (step === "loading" ? 0 : step === "url" ? 0 : step === "review" ? 1 : 0);
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-stone-900 text-white"
                      : done
                      ? "bg-green-100 text-green-700"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${active ? "font-semibold text-stone-900" : "text-stone-400"}`}>
                  {label}
                </span>
                {i < 3 && <div className="mx-2 h-px w-8 bg-stone-200" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: URL */}
      {step === "url" && (
        <div className="mx-auto max-w-2xl pt-12">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-stone-500">
              🎬 Step 1 of 4
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-stone-900">
              Enter your SaaS URL
            </h1>
            <p className="mx-auto mt-2 max-w-md text-stone-600">
              We'll scrape your landing page and extract your brand identity automatically.
            </p>
          </div>

          <div className="mt-10">
            <div className="rounded-[24px] border-2 border-stone-200 bg-white p-2 transition-all focus-within:border-stone-900">
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-3 px-4">
                  <svg className="h-5 w-5 flex-shrink-0 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleScrape()}
                    placeholder="https://stocksbrew.online"
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
              We'll extract: brand name, colors, logo, features, and value proposition
            </p>

            {/* Quick test links */}
            <div className="mt-8 flex justify-center gap-4">
              {["stocksbrew.online", "yourtrace.online"].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setUrl(`https://${sample}`);
                    setTimeout(() => handleScrape(), 100);
                  }}
                  className="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-stone-500 transition-all hover:border-stone-900 hover:text-stone-900"
                >
                  Try {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {step === "loading" && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="mb-8 h-12 w-12 animate-spin rounded-full border-3 border-stone-200 border-t-stone-900" />
          <p className="font-display text-xl font-bold text-stone-900">Analyzing your SaaS...</p>
          <p className="mt-2 text-sm text-stone-500">Extracting brand identity, features, and messaging</p>
        </div>
      )}

      {/* Step 2: Review */}
      {step === "review" && brand && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-stone-500">
                🎬 Step 2 of 4
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-stone-900">
                Review your brand
              </h2>
              <p className="text-stone-600">We found this. Edit anything that looks off.</p>
            </div>
          </div>

          {/* Brand Card */}
          <div className="rounded-[24px] border-2 border-stone-200 bg-white p-8">
            <div className="flex items-center gap-6">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt=""
                  className="h-16 w-16 rounded-2xl border border-stone-200 object-contain p-2"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-stone-100">
                  <span className="font-display text-2xl font-bold text-stone-400">?</span>
                </div>
              )}
              <div>
                <input
                  defaultValue={brand.name}
                  className="w-full bg-transparent font-display text-2xl font-bold text-stone-900 outline-none"
                />
                <input
                  defaultValue={brand.tagline || brand.description.slice(0, 100)}
                  className="mt-1 w-full bg-transparent text-stone-600 outline-none"
                />
              </div>
            </div>

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

            {brand.description && (
              <div className="mt-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Description</p>
                <textarea
                  defaultValue={brand.description}
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-700 outline-none focus:border-stone-300"
                />
              </div>
            )}

            {brand.headlines.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Key Headlines</p>
                <div className="space-y-2">
                  {brand.headlines.map((h, i) => (
                    <input
                      key={i}
                      defaultValue={h}
                      className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-700 outline-none focus:border-stone-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {brand.features.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Detected Features</p>
                <div className="flex flex-wrap gap-2">
                  {brand.features.map((f, i) => (
                    <span key={i} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between rounded-[24px] border-2 border-stone-200 bg-white p-6">
            <p className="text-sm text-stone-600">Everything look right?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("url")}
                className="rounded-full border-2 border-stone-200 px-6 py-3 text-sm font-semibold text-stone-700 transition-all hover:border-stone-900"
              >
                ← Re-scan
              </button>
              <button
                onClick={() => alert("Step 3: Script generation coming next!")}
                className="rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-stone-800"
              >
                Generate Script →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

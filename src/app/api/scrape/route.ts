import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ViralVideoAI/1.0)" },
      signal: AbortSignal.timeout(10000),
    });
    const html = await resp.text();
    const $ = cheerio.load(html);

    // Extract title
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('h1').first().text() ||
      "";

    // Extract description
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    // Extract all headings for structure
    const headlines: string[] = [];
    $("h1, h2, h3").each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 5 && text.length < 200) {
        headlines.push(text);
      }
    });

    // Extract logo from og:image or first img in header/nav
    let logo =
      $('meta[property="og:image"]').attr("content") ||
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "";
    if (logo && !logo.startsWith("http")) {
      try {
        logo = new URL(logo, url).href;
      } catch {}
    }

    // Extract colors from inline styles and CSS
    const colors: string[] = [];
    const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g;
    const styleTexts: string[] = [];
    $('style').each((_i, el) => { styleTexts.push($(el).html() || ""); });
    $('[style]').each((_i, el) => { styleTexts.push($(el).attr("style") || ""); });
    const allStyle = styleTexts.join(" ");
    const matches = allStyle.match(colorRegex);
    if (matches) {
      const unique = [...new Set(matches)].slice(0, 5);
      // Filter common neutral colors
      const meaningful = unique.filter(
        (c) => !["#fff", "#ffffff", "#000", "#000000"].includes(c.toLowerCase())
      );
      colors.push(...meaningful.slice(0, 3));
    }

    // Extract tagline / value prop (first prominent text)
    const tagline =
      $('meta[property="og:description"]').attr("content") ||
      $(".hero h1, .hero h2, .banner h1, header h1, section:first h1")
        .first()
        .text()
        .trim() ||
      "";

    // Features: look for feature-like sections
    const features: string[] = [];
    $('[class*="feature"], [class*="benefit"], [class*="card"], [class*="grid"] > div').each((_, el) => {
      const text = $(el).find("h3, h4, strong").first().text().trim();
      if (text && text.length > 3 && text.length < 120 && !features.includes(text)) {
        features.push(text);
      }
    });

    // Pricing if visible
    const pricing: string[] = [];
    $('[class*="price"], [class*="pricing"], [class*="plan"]').each((_, el) => {
      const text = $(el).text().trim().slice(0, 100);
      if (text && text.match(/[\$€£₹]/)) pricing.push(text);
    });

    return NextResponse.json({
      success: true,
      brand: {
        name: title.split("—")[0]?.trim() || title.split("|")[0]?.trim() || title,
        title: title.slice(0, 120),
        tagline: tagline.slice(0, 200),
        description: description.slice(0, 500),
        logo: logo || null,
        colors: colors.length > 0 ? colors : ["#1C1917", "#A67B5B"],
        headlines: [...new Set(headlines)].slice(0, 8),
        features: [...new Set(features)].slice(0, 8),
        pricing: [...new Set(pricing)].slice(0, 3),
      },
      url: url,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message, success: false }, { status: 500 });
  }
}

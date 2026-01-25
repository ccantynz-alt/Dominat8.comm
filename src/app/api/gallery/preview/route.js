export const dynamic = "force-dynamic";

import { kv } from "@vercel/kv";

function pickFirstString(obj, keys) {
  if (!obj || typeof obj !== "object") return null;
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return null;
}

function safeText(s, max = 80) {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

function accentStops(accent) {
  // Simple gradient palettes that look "premium SaaS"
  switch (String(accent || "").toLowerCase()) {
    case "emerald":
    case "green":
      return ["#10b981", "#3b82f6", "#ffffff"];
    case "indigo":
    case "purple":
      return ["#6366f1", "#10b981", "#ffffff"];
    case "slate":
    case "gray":
      return ["#0f172a", "#3b82f6", "#ffffff"];
    case "blue":
    default:
      return ["#3b82f6", "#10b981", "#ffffff"];
  }
}

async function readAny(key) {
  try {
    return await kv.get(key);
  } catch {
    return null;
  }
}

function svgThumb({ title, desc, accent, projectId }) {
  const [c1, c2, c3] = accentStops(accent);
  const t = safeText(title, 42);
  const d = safeText(desc, 90);
  const pid = safeText(projectId, 28);

  // 900x540 is a nice ratio for cards; but we'll render at 1200x720 for crispness
  const w = 1200;
  const h = 720;

  // Minimal "site screenshot" illusion: top bar + hero headline + feature blocks
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.20"/>
      <stop offset="0.55" stop-color="${c2}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${c3}" stop-opacity="1"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="10%" r="70%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="20%" r="70%">
      <stop offset="0" stop-color="${c2}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.16"/>
    </filter>

    <style>
      .h1 { font: 700 54px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:#0f172a; letter-spacing:-0.5px; }
      .p  { font: 400 26px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:#334155; }
      .sm { font: 600 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:#475569; }
      .mono { font: 600 16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New"; fill:#64748b; }
    </style>
  </defs>

  <!-- background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow1)"/>
  <rect width="${w}" height="${h}" fill="url(#glow2)"/>

  <!-- card frame -->
  <g filter="url(#softShadow)">
    <rect x="80" y="70" rx="42" ry="42" width="${w - 160}" height="${h - 140}" fill="#ffffff" fill-opacity="0.88" stroke="#e2e8f0" stroke-width="2"/>
  </g>

  <!-- top nav -->
  <rect x="120" y="120" rx="18" ry="18" width="${w - 240}" height="72" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="150" y="138" rx="16" ry="16" width="40" height="40" fill="#0f172a"/>
  <text x="206" y="166" class="sm">Dominat8</text>

  <text x="${w - 520}" y="166" class="mono">/gallery</text>
  <rect x="${w - 300}" y="136" rx="16" ry="16" width="150" height="40" fill="#0f172a"/>
  <text x="${w - 223}" y="163" text-anchor="middle" class="sm" fill="#ffffff">Generate</text>

  <!-- hero -->
  <text x="150" y="290" class="mono">Project: ${pid}</text>
  <text x="150" y="360" class="h1">${t}</text>
  <text x="150" y="410" class="p">${d}</text>

  <!-- feature blocks -->
  <rect x="150" y="470" rx="26" ry="26" width="300" height="160" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="180" y="505" rx="14" ry="14" width="90" height="28" fill="#ecfeff" stroke="#a5f3fc" stroke-width="2"/>
  <text x="225" y="526" text-anchor="middle" class="sm" fill="#0f766e">Premium</text>

  <rect x="470" y="470" rx="26" ry="26" width="300" height="160" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="500" y="505" rx="14" ry="14" width="90" height="28" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="2"/>
  <text x="545" y="526" text-anchor="middle" class="sm" fill="#047857">SEO</text>

  <rect x="790" y="470" rx="26" ry="26" width="${w - 940}" height="160" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="820" y="505" rx="14" ry="14" width="130" height="28" fill="#eff6ff" stroke="#bfdbfe" stroke-width="2"/>
  <text x="885" y="526" text-anchor="middle" class="sm" fill="#1d4ed8">Ship Fast</text>

  <!-- small footer -->
  <text x="150" y="${h - 95}" class="mono" fill="#94a3b8">Generated thumbnail • SVG • Dominat8</text>
</svg>`;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const projectId = (searchParams.get("projectId") || "").trim();

  if (!projectId) {
    return new Response("Missing projectId", {
      status: 400,
      headers: { "cache-control": "no-store, max-age=0", "content-type": "text/plain; charset=utf-8" },
    });
  }

  // Try a few key patterns you’ve used
  const kPublishedSpec = `project:${projectId}:publishedSpec`;
  const kGenerated = `generated:project:${projectId}:latest`;
  const kSeoPlan = `project:${projectId}:seoPlan`;

  const publishedSpec = await readAny(kPublishedSpec);
  const generated = await readAny(kGenerated);
  const seoPlan = await readAny(kSeoPlan);

  const title =
    pickFirstString(publishedSpec, ["title", "siteTitle", "name"]) ||
    pickFirstString(generated, ["title", "siteTitle", "name"]) ||
    pickFirstString(seoPlan, ["title", "siteTitle", "name"]) ||
    `Project ${projectId}`;

  const desc =
    pickFirstString(publishedSpec, ["description", "tagline", "metaDescription"]) ||
    pickFirstString(generated, ["description", "tagline", "metaDescription"]) ||
    pickFirstString(seoPlan, ["description", "tagline", "metaDescription"]) ||
    "Published site preview";

  const accent =
    pickFirstString(publishedSpec, ["accent", "themeAccent"]) ||
    pickFirstString(generated, ["accent", "themeAccent"]) ||
    "blue";

  const svg = svgThumb({ title, desc, accent, projectId });

  return new Response(svg, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-d8-preview": "generated",
    },
  });
}

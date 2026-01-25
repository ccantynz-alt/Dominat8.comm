export const dynamic = "force-dynamic";

import { kv } from "@vercel/kv";

const THUMB_PREFIX = "gallery:thumb:";
const THUMB_VERSION = ":v1";

async function getCached(projectId) {
  try {
    return await kv.get(`${THUMB_PREFIX}${projectId}${THUMB_VERSION}`);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const projectId = (searchParams.get("projectId") || "").trim();
  const bust = searchParams.get("v") || "";

  if (!projectId) {
    return new Response("Missing projectId", {
      status: 400,
      headers: { "cache-control": "no-store, max-age=0", "content-type": "text/plain; charset=utf-8" },
    });
  }

  const cached = await getCached(projectId);
  if (typeof cached === "string" && cached.trim().startsWith("<")) {
    // Allow some browser caching, but you can bust with ?v=
    return new Response(cached, {
      status: 200,
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": bust ? "public, max-age=3600" : "public, max-age=86400",
        "x-d8-preview": "cached",
      },
    });
  }

  // Fallback: generate fresh preview (no-store)
  const base = process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "";
  const url = (base ? base : "") + `/api/gallery/preview?projectId=${encodeURIComponent(projectId)}`;

  const res = await fetch(url, { cache: "no-store" });
  const svg = await res.text();

  return new Response(svg, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-d8-preview": "generated",
    },
  });
}

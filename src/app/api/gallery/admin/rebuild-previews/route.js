export const dynamic = "force-dynamic";

import { kv } from "@vercel/kv";

const INDEX_KEY = "gallery:index:v1";
const THUMB_PREFIX = "gallery:thumb:";
const THUMB_VERSION = ":v1";

async function listIndex() {
  const ids = (await kv.get(INDEX_KEY)) || [];
  return Array.isArray(ids) ? ids.map((x) => String(x)).filter(Boolean) : [];
}

export async function POST(req) {
  const tokenRequired = process.env.GALLERY_ADMIN_TOKEN || null;
  const tokenProvided = req.headers.get("x-gallery-token") || null;

  if (tokenRequired && tokenProvided !== tokenRequired) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }, null, 2), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store, max-age=0" },
    });
  }

  let body = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const limit = Math.max(1, Math.min(200, Number(body && body.limit ? body.limit : 60)));
  const projectIds = (await listIndex()).slice(0, limit);

  const base = process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "";

  const results = [];
  for (const projectId of projectIds) {
    const url = (base ? base : "") + `/api/gallery/preview?projectId=${encodeURIComponent(projectId)}`;
    const res = await fetch(url, { cache: "no-store" });
    const svg = await res.text();

    await kv.set(`${THUMB_PREFIX}${projectId}${THUMB_VERSION}`, svg);

    results.push({ projectId, storedKey: `${THUMB_PREFIX}${projectId}${THUMB_VERSION}`, ok: res.ok });
  }

  return new Response(JSON.stringify({ ok: true, indexKey: INDEX_KEY, count: results.length, results }, null, 2), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store, max-age=0" },
  });
}

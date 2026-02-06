export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: any = null;
  try { body = await request.json(); } catch { body = null; }

  return new Response(JSON.stringify({
    ok: true,
    service: "dominat8.com",
    route: "/api/d8/repair",
    received: body,
    ts: Date.now()
  }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
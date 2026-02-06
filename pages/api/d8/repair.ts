export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }
  let body = null;
  try { body = req.body ?? null; } catch { body = null; }

  return res.status(200).json({
    ok: true,
    service: "dominat8.com",
    route: "/api/d8/repair",
    received: body,
    ts: Date.now()
  });
}
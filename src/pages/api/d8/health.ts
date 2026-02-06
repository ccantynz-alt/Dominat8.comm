export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "dominat8.com",
    route: "/api/d8/health",
    ts: Date.now()
  });
}
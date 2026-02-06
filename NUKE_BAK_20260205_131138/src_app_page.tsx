export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>DOMINAT8.COM — LIVE</h1>
      <p>If you can see this, the domain is fixed.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </main>
  );
}

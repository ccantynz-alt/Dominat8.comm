"use client";

import { useEffect, useMemo, useState } from "react";

type AgentItem = { id: string; file: string; hint?: string };
type RunResult = any;

function extractPatchFromResult(result: RunResult): string {
  const s = result?.patch?.script;
  if (typeof s === "string" && s.trim().length) return s;

  // fallback: scan outputText
  const t = result?.outputText;
  if (typeof t !== "string") return "";

  const markerStart = "BEGIN_POWERSHELL_PATCH";
  const markerEnd = "END_POWERSHELL_PATCH";
  const si = t.indexOf(markerStart);
  const ei = t.indexOf(markerEnd);
  if (si >= 0 && ei > si) return t.slice(si + markerStart.length, ei).trim();

  const m = t.match(/```(powershell|ps1)\s*([\s\S]*?)```/im);
  if (m && m[2]) return m[2].trim();

  return "";
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AgentsAdmin() {
  const [agents, setAgents] = useState<AgentItem[]>([]);
  const [agentId, setAgentId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("demo");
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/agents/list", { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        const list: AgentItem[] = d?.agents || [];
        setAgents(list);
        if (!agentId && list.length) setAgentId(list[0].id);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshHistory() {
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/agents/runs?projectId=${encodeURIComponent(projectId)}&limit=10`, { cache: "no-store" });
      const json = await res.json();
      setHistory(json?.runs || []);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    refreshHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const patchScript = useMemo(() => extractPatchFromResult(result), [result]);

  const patchTemplate = useMemo(() => {
    return [
      "You are the Builder Engineer for Dominat8.",
      "Goal: implement the requested change as ONE PowerShell patch script.",
      "",
      "Rules:",
      "- Output ONLY a PowerShell script inside a fenced block: ```powershell ... ```",
      "- The script must create/overwrite full files (no partial diffs).",
      "- Must be copy/paste safe for Windows PowerShell.",
      "- Must not use bash.",
      "- Must include verification commands at the end.",
      "",
      "Task:",
      "Generate a polished, SiteGround-level homepage upgrade (hero + benefits + how-it-works + CTA).",
      "Keep existing markers (HOME_OK / LIVE_OK / BUILD_STAMP).",
      "",
      "Deliverable:",
      "A single PowerShell patch script that I can run from repo root, then deploy to Vercel."
    ].join("\n");
  }, []);

  async function runAgent() {
    if (!agentId) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          projectId,
          input: {
            message,
            requestedOutput: "powershell_patch_script"
          }
        })
      });

      const json = await res.json();
      setResult(json);
      await refreshHistory();
    } catch (e: any) {
      setResult({ ok: false, error: String(e?.message || e) });
    } finally {
      setLoading(false);
    }
  }

  const applyHelper = useMemo(() => {
    const rid = result?.runId || "";
    const base = "https://www.dominat8.com";
    const fn = rid ? `AGENT_PATCH_${rid}.ps1` : "AGENT_PATCH.ps1";

    return [
      "### APPLY LOCALLY (PowerShell) — copy/paste",
      "",
      `$base = "${base}"`,
      `$projectId = "${projectId}"`,
      rid ? `$runId = "${rid}"` : "# $runId not available yet",
      "",
      "# Download latest patch (or specific runId) from your API (stored in KV)",
      rid
        ? `Invoke-RestMethod -Uri "$base/api/agents/patch?projectId=$projectId&runId=$runId" | ConvertTo-Json -Depth 50 | Out-File -LiteralPath ".\\upgrades\\_agent_patch_payload.json" -Encoding utf8`
        : `Invoke-RestMethod -Uri "$base/api/agents/patch?projectId=$projectId" | ConvertTo-Json -Depth 50 | Out-File -LiteralPath ".\\upgrades\\_agent_patch_payload.json" -Encoding utf8`,
      "",
      "# Extract script into a .ps1 file",
      `$payload = Get-Content -LiteralPath ".\\upgrades\\_agent_patch_payload.json" -Raw | ConvertFrom-Json`,
      `$script = $payload.patch.script`,
      `if (-not $script) { throw "No patch script found in payload." }`,
      `$out = ".\\upgrades\\${fn}"`,
      `$script | Out-File -LiteralPath $out -Encoding utf8`,
      `Write-Host "WROTE: $out"`,
      "",
      "# Run it (review first if you want)",
      `powershell -ExecutionPolicy Bypass -File $out`,
      "",
      "# Deploy",
      "vercel --prod --force"
    ].join("\n");
  }, [projectId, result]);

  return (
    <div style={{ padding: 24, maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Agents Admin — Patch Console</h1>
        <a href="/" style={{ opacity: 0.7 }}>Home</a>
      </div>

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Run an agent, extract a PowerShell patch script, and apply locally.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div style={{ border: "1px solid rgba(128,128,128,0.35)", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10, alignItems: "center" }}>
            <label>ProjectId</label>
            <input value={projectId} onChange={e => setProjectId(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)" }} />

            <label>Agent</label>
            <select value={agentId} onChange={e => setAgentId(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)" }}>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.id}{a.hint ? ` — ${a.hint}` : ""}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setMessage(patchTemplate)}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)", cursor: "pointer" }}
            >
              Use Patch Template
            </button>

            <button
              onClick={runAgent}
              disabled={loading}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Running…" : "Run Agent"}
            </button>

            <button
              onClick={refreshHistory}
              disabled={historyLoading}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)", cursor: historyLoading ? "not-allowed" : "pointer" }}
            >
              {historyLoading ? "Refreshing…" : "Refresh History"}
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <textarea
              rows={10}
              style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)" }}
              placeholder="Tell the agent what to do… (or click Use Patch Template)"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div style={{ border: "1px solid rgba(128,128,128,0.35)", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Recent Runs (KV)</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {history?.length ? history.map((r, idx) => (
              <button
                key={r?.runId || idx}
                onClick={() => setResult(r)}
                style={{ textAlign: "left", padding: 10, borderRadius: 10, border: "1px solid rgba(128,128,128,0.25)", cursor: "pointer" }}
              >
                <div style={{ fontWeight: 600 }}>{r?.agentId || "agent"} · {r?.runId || "run"}</div>
                <div style={{ opacity: 0.7, fontSize: 12 }}>{r?.finishedAt || r?.startedAt || ""}</div>
              </button>
            )) : (
              <div style={{ opacity: 0.7 }}>No recent runs yet.</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, border: "1px solid rgba(128,128,128,0.35)", borderRadius: 12, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Result</h3>

        {!result && <div style={{ opacity: 0.7 }}>Run an agent to see output.</div>}

        {result && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <h4>Agent Output (text)</h4>
                <pre style={{ whiteSpace: "pre-wrap", padding: 12, borderRadius: 10, border: "1px solid rgba(128,128,128,0.25)", minHeight: 180 }}>
{String(result?.outputText || "(no outputText)")}
                </pre>
              </div>

              <div>
                <h4>Extracted Patch Script</h4>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                  <button
                    onClick={() => navigator.clipboard.writeText(patchScript || "")}
                    disabled={!patchScript}
                    style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)", cursor: patchScript ? "pointer" : "not-allowed" }}
                  >
                    Copy Patch
                  </button>

                  <button
                    onClick={() => downloadText(`AGENT_PATCH_${result?.runId || "latest"}.ps1`, patchScript || "")}
                    disabled={!patchScript}
                    style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.35)", cursor: patchScript ? "pointer" : "not-allowed" }}
                  >
                    Download .ps1
                  </button>
                </div>

                <pre style={{ whiteSpace: "pre-wrap", padding: 12, borderRadius: 10, border: "1px solid rgba(128,128,128,0.25)", minHeight: 180 }}>
{patchScript || "(no patch extracted — ask the agent to output ```powershell ... ```)"}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <h4>Apply Locally Helper</h4>
              <pre style={{ whiteSpace: "pre-wrap", padding: 12, borderRadius: 10, border: "1px solid rgba(128,128,128,0.25)" }}>
{applyHelper}
              </pre>
            </div>

            <details style={{ marginTop: 16 }}>
              <summary style={{ cursor: "pointer" }}>Raw JSON</summary>
              <pre style={{ whiteSpace: "pre-wrap", padding: 12, borderRadius: 10, border: "1px solid rgba(128,128,128,0.25)" }}>
{JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </>
        )}
      </div>
    </div>
  );
}

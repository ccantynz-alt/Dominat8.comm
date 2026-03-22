"use client";

import React, { useState, useCallback } from "react";

type Mode = "instant" | "premium";
type Framework = "html" | "react" | "nextjs";

export default function BuilderClient() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<Mode>("instant");
  const [framework, setFramework] = useState<Framework>("html");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ templateName?: string; category?: string; note?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setMeta(null);

    try {
      const endpoint = mode === "instant" ? "/api/generate/instant" : "/api/generate/premium";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode, framework }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Generation failed");
      } else {
        setResult(data.html || null);
        setMeta({
          templateName: data.templateName,
          category: data.category,
          note: data.note,
        });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [prompt, mode, framework]);

  return (
    <div>
      {/* PROMPT INPUT */}
      <div style={{ marginTop: 30 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your website... e.g. 'A modern SaaS landing page for a project management tool'"
          rows={3}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.4)",
            color: "#EDEAF7",
            fontSize: 15,
            lineHeight: 1.5,
            fontFamily: "inherit",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16, alignItems: "center" }}>
        {/* Mode Toggle */}
        <div style={{ display: "flex", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          {(["instant", "premium"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                background: mode === m ? (m === "instant" ? "rgba(34,197,94,0.2)" : "rgba(168,85,247,0.2)") : "transparent",
                color: mode === m ? (m === "instant" ? "#22c55e" : "#a855f7") : "rgba(237,234,247,0.5)",
              }}
            >
              {m === "instant" ? "Instant (3s)" : "Premium (AI)"}
            </button>
          ))}
        </div>

        {/* Framework Selector */}
        <div style={{ display: "flex", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
          {(["html", "react", "nextjs"] as Framework[]).map((f) => (
            <button
              key={f}
              onClick={() => setFramework(f)}
              style={{
                padding: "8px 14px",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                background: framework === f ? "rgba(59,130,246,0.2)" : "transparent",
                color: framework === f ? "#3b82f6" : "rgba(237,234,247,0.5)",
              }}
            >
              {f === "nextjs" ? "Next.js" : f === "react" ? "React" : "HTML"}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          style={{
            padding: "10px 24px",
            borderRadius: 12,
            border: "none",
            cursor: loading ? "wait" : "pointer",
            fontWeight: 800,
            fontSize: 14,
            fontFamily: "inherit",
            color: "#07070B",
            background: loading
              ? "rgba(168,85,247,0.4)"
              : "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
            boxShadow: "0 12px 40px rgba(168,85,247,0.2)",
            opacity: !prompt.trim() ? 0.4 : 1,
          }}
        >
          {loading ? "Generating..." : "Generate Website"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* META */}
      {meta?.templateName && (
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap", fontSize: 12 }}>
          <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(168,85,247,0.15)", color: "rgba(168,85,247,0.9)", fontWeight: 700 }}>
            {meta.templateName}
          </span>
          {meta.category && (
            <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(59,130,246,0.15)", color: "rgba(59,130,246,0.9)", fontWeight: 700 }}>
              {meta.category}
            </span>
          )}
          {meta.note && (
            <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.05)", color: "rgba(237,234,247,0.5)" }}>
              {meta.note}
            </span>
          )}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ marginTop: 24, textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 14, color: "rgba(237,234,247,0.6)", fontWeight: 600 }}>
            {mode === "instant" ? "Matching template..." : "AI is generating your website..."}
          </div>
          <div style={{ marginTop: 12, width: 200, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", margin: "12px auto 0", overflow: "hidden" }}>
            <div style={{ width: "60%", height: "100%", borderRadius: 2, background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", animation: "none" }} />
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {result && !loading && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(246,242,255,0.9)" }}>Preview</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  const blob = new Blob([result], { type: "text/html" });
                  const url = URL.createObjectURL(blob);
                  window.open(url, "_blank");
                }}
                style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(237,234,247,0.8)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Open in New Tab
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([result], { type: "text/html" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "website.html";
                  a.click();
                }}
                style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(237,234,247,0.8)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Download HTML
              </button>
            </div>
          </div>
          <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", background: "#fff" }}>
            <iframe
              srcDoc={result}
              title="Website Preview"
              style={{ width: "100%", height: 600, border: "none", display: "block" }}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      )}
    </div>
  );
}

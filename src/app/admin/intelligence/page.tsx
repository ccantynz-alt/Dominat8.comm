"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { CompetitorProfile, MarketTrend, PositioningScore } from "@/lib/intelligence/types";

interface TrendsApiResponse {
  ok: boolean;
  generatedAt: string;
  trends: MarketTrend[];
  competitors: CompetitorProfile[];
  positioning: PositioningScore[];
  summary: {
    totalTrends: number;
    totalCompetitors: number;
    overallPositioningScore: number;
    dominat8Features: string[];
    dominat8FeatureCount: number;
  };
}

interface CrawlApiResponse {
  ok: boolean;
  crawledAt: string;
  count: number;
  results: Array<{
    competitor: CompetitorProfile;
    crawledAt: string;
    changes: string[];
    newFeatures: string[];
  }>;
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-builder": "#a78bfa",
  "no-code": "#60a5fa",
  "design-tool": "#f472b6",
  "cms": "#34d399",
};

const TREND_CATEGORY_COLORS: Record<string, string> = {
  ai: "#a78bfa",
  "no-code": "#60a5fa",
  design: "#f472b6",
  "developer-tools": "#34d399",
  market: "#fbbf24",
};

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 75 ? "#34d399" : score >= 55 ? "#fbbf24" : "#f87171";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
        <span>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{score}</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 99,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

function CompetitorCard({ competitor, positioning }: { competitor: CompetitorProfile; positioning?: PositioningScore }) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CATEGORY_COLORS[competitor.category] ?? "#a78bfa";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{competitor.name}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 99,
                background: `${catColor}22`,
                color: catColor,
                border: `1px solid ${catColor}44`,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {competitor.category}
            </span>
          </div>
          <a
            href={competitor.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2, display: "block" }}
          >
            {competitor.url}
          </a>
        </div>
        {competitor.pricing && (
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
            {competitor.pricing}
          </span>
        )}
      </div>

      {positioning && (
        <ScoreBar score={positioning.score} label="Dominat8 vs this competitor" />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Strengths</div>
          {competitor.strengths.slice(0, 2).map((s) => (
            <div key={s} style={{ fontSize: 11, color: "#34d39988", marginBottom: 2 }}>+ {s}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Weaknesses</div>
          {competitor.weaknesses.slice(0, 2).map((w) => (
            <div key={w} style={{ fontSize: 11, color: "#f8717188", marginBottom: 2 }}>- {w}</div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 8,
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          padding: "4px 10px",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        {expanded ? "Hide features ↑" : `Show ${competitor.features.length} features ↓`}
      </button>

      {expanded && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {competitor.features.map((f) => (
            <span
              key={f}
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {expanded && positioning && positioning.advantages.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: "#a78bfa88", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Dominat8 Advantages
          </div>
          {positioning.advantages.map((a) => (
            <div key={a} style={{ fontSize: 11, color: "#a78bfa", marginBottom: 2 }}>★ {a}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrendCard({ trend }: { trend: MarketTrend }) {
  const catColor = TREND_CATEGORY_COLORS[trend.category] ?? "#a78bfa";
  const scoreColor = trend.score >= 85 ? "#34d399" : trend.score >= 70 ? "#fbbf24" : "#60a5fa";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.35 }}>{trend.title}</div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: scoreColor,
            minWidth: 36,
            textAlign: "right",
          }}
        >
          {trend.score}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: 99,
            background: `${catColor}22`,
            color: catColor,
            border: `1px solid ${catColor}33`,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {trend.category}
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{trend.source}</span>
      </div>

      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0 }}>
        {trend.summary}
      </p>

      <ScoreBar score={trend.score} label="Momentum / Relevance" />
    </div>
  );
}

function FeatureMatrix({ competitors, ourFeatures }: { competitors: CompetitorProfile[]; ourFeatures: string[] }) {
  const keyFeatures = ourFeatures.slice(0, 8);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: 700 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 10px", color: "rgba(255,255,255,0.4)", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              Feature
            </th>
            <th style={{ padding: "8px 10px", color: "#a78bfa", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              Dominat8
            </th>
            {competitors.slice(0, 5).map((c) => (
              <th key={c.id} style={{ padding: "8px 10px", color: "rgba(255,255,255,0.5)", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keyFeatures.map((feature, i) => (
            <tr key={feature} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
              <td style={{ padding: "7px 10px", color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {feature}
              </td>
              <td style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#34d399", fontWeight: 700 }}>✓</span>
              </td>
              {competitors.slice(0, 5).map((c) => {
                const hasIt = c.features.some((f) =>
                  f.toLowerCase().includes(feature.toLowerCase().split(" ")[0]!) ||
                  feature.toLowerCase().includes(f.toLowerCase().split(" ")[0]!)
                );
                return (
                  <td key={c.id} style={{ padding: "7px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color: hasIt ? "#fbbf2499" : "#f8717155", fontWeight: 700 }}>
                      {hasIt ? "~" : "✗"}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>
        ✓ = confirmed &nbsp; ~ = partial / similar &nbsp; ✗ = absent
      </p>
    </div>
  );
}

export default function IntelligencePage() {
  const [data, setData] = useState<TrendsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<CrawlApiResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"competitors" | "trends" | "matrix" | "radar">("competitors");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/intelligence/trends");
      const json = await res.json() as TrendsApiResponse;
      setData(json);
    } catch {
      // silently fail, UI will show loading state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const runCrawl = async () => {
    setCrawling(true);
    setCrawlResult(null);
    try {
      const res = await fetch("/api/intelligence/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json() as CrawlApiResponse;
      setCrawlResult(json);
      void loadData();
    } catch {
      // silently fail
    } finally {
      setCrawling(false);
    }
  };

  const tabs = [
    { id: "competitors" as const, label: "Competitors" },
    { id: "trends" as const, label: "Market Trends" },
    { id: "matrix" as const, label: "Feature Matrix" },
    { id: "radar" as const, label: "Positioning" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/admin"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 16,
            }}
          >
            ← Back to Admin
          </Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#a78bfa", textTransform: "uppercase", marginBottom: 6 }}>
                PHASE 3 — INTELLIGENCE ENGINE
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", background: "linear-gradient(90deg, #fff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Market Intelligence
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
                Always-on competitor analysis, trend tracking, and strategic positioning
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {data && (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
                  <div>Overall Score</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#34d399" }}>
                    {data.summary.overallPositioningScore}
                    <span style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.3)" }}>/100</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => void runCrawl()}
                disabled={crawling}
                style={{
                  background: crawling
                    ? "rgba(167,139,250,0.15)"
                    : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "10px 18px",
                  cursor: crawling ? "not-allowed" : "pointer",
                  opacity: crawling ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {crawling ? "Crawling..." : "Run Crawl"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        {data && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Competitors Tracked", value: data.summary.totalCompetitors, color: "#a78bfa" },
              { label: "Trends Monitored", value: data.summary.totalTrends, color: "#60a5fa" },
              { label: "Dominat8 Features", value: data.summary.dominat8FeatureCount, color: "#34d399" },
              { label: "Positioning Score", value: `${data.summary.overallPositioningScore}/100`, color: "#fbbf24" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, marginTop: 4 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Crawl Result Banner */}
        {crawlResult && crawlResult.ok && (
          <div
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: 13,
              color: "#34d399",
            }}
          >
            Crawl complete — {crawlResult.count} competitors scanned at{" "}
            {new Date(crawlResult.crawledAt).toLocaleTimeString()}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #a78bfa" : "2px solid transparent",
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                padding: "8px 14px",
                cursor: "pointer",
                transition: "color 0.15s",
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⟳</div>
            Loading intelligence data...
          </div>
        )}

        {/* Competitors Tab */}
        {!loading && data && activeTab === "competitors" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
            {data.competitors.map((competitor) => {
              const pos = data.positioning.find((p) => p.competitorId === competitor.id);
              return (
                <CompetitorCard key={competitor.id} competitor={competitor} positioning={pos} />
              );
            })}
          </div>
        )}

        {/* Trends Tab */}
        {!loading && data && activeTab === "trends" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 14 }}>
            {data.trends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        )}

        {/* Feature Matrix Tab */}
        {!loading && data && activeTab === "matrix" && (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Feature Comparison Matrix</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                Dominat8 vs top 5 competitors across key differentiating features
              </div>
            </div>
            <FeatureMatrix
              competitors={data.competitors}
              ourFeatures={data.summary.dominat8Features}
            />
          </div>
        )}

        {/* Positioning / Radar Tab */}
        {!loading && data && activeTab === "radar" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                Dominat8 Positioning vs Each Competitor
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
                Score &gt; 70 = Dominat8 leads &nbsp;|&nbsp; Score &lt; 50 = gap to close
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {data.positioning.map((pos) => (
                  <div key={pos.competitorId}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                        vs {pos.competitorName}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {pos.advantages.length} advantages
                      </span>
                    </div>
                    <ScoreBar score={pos.score} label={`Dominat8 vs ${pos.competitorName}`} />
                    {pos.advantages.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {pos.advantages.slice(0, 3).map((adv) => (
                          <span
                            key={adv}
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 99,
                              background: "rgba(167,139,250,0.12)",
                              color: "#a78bfa",
                              border: "1px solid rgba(167,139,250,0.25)",
                            }}
                          >
                            {adv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dominat8 unique feature summary */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa", marginBottom: 12 }}>
                Dominat8 Unique Capabilities
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.summary.dominat8Features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: 12,
                      padding: "5px 12px",
                      borderRadius: 8,
                      background: "rgba(167,139,250,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(167,139,250,0.2)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

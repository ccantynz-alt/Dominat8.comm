"use client";

import { useState } from "react";
import Link from "next/link";
import { BUSINESS_KITS } from "@/lib/autopilot/kits";
import type { BusinessKit } from "@/lib/autopilot/types";

interface GeneratedResult {
  kit: BusinessKit;
  businessName: string;
  generated: {
    website: boolean;
    seo: boolean;
    emails: boolean;
    social: boolean;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Creative: "#f59e0b",
  "Food & Beverage": "#ef4444",
  "Professional Services": "#8b5cf6",
  "Health & Wellness": "#10b981",
  "Real Estate": "#06b6d4",
  Healthcare: "#3b82f6",
  Legal: "#6366f1",
  Coaching: "#ec4899",
};

const KIT_EMOJIS: Record<string, string> = {
  photographer: "📸",
  restaurant: "🍽️",
  consultant: "💼",
  "fitness-trainer": "💪",
  "real-estate-agent": "🏠",
  dentist: "🦷",
  lawyer: "⚖️",
  "life-coach": "🌟",
};

const GENERATED_ITEMS = [
  { key: "website", label: "Website", icon: "🌐" },
  { key: "seo", label: "SEO Setup", icon: "🔍" },
  { key: "emails", label: "Email Templates", icon: "📧" },
  { key: "social", label: "Social Assets", icon: "📲" },
];

export default function StarterKitsPage() {
  const [selectedKit, setSelectedKit] = useState<BusinessKit | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [launching, setLaunching] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(BUSINESS_KITS.map((k) => k.category)))];

  const filteredKits =
    filterCategory === "All"
      ? BUSINESS_KITS
      : BUSINESS_KITS.filter((k) => k.category === filterCategory);

  const handleLaunch = async () => {
    if (!selectedKit) return;
    if (!businessName.trim()) {
      setError("Please enter your business name.");
      return;
    }

    setError("");
    setLaunching(true);

    try {
      const res = await fetch("/api/business-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kitId: selectedKit.id,
          businessName: businessName.trim(),
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        kit?: BusinessKit;
        generated?: GeneratedResult["generated"];
        error?: string;
      };

      if (!data.ok || !data.kit || !data.generated) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult({
          kit: data.kit,
          businessName: businessName.trim(),
          generated: data.generated,
        });
        setSelectedKit(null);
        setBusinessName("");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLaunching(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f0a 100%)",
        color: "#e2e8f0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(139,92,246,0.2)",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Link
          href="/admin"
          style={{
            color: "#8b5cf6",
            textDecoration: "none",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          ← Admin
        </Link>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            One-Click Business Starter Kits
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
            Launch a complete online presence in minutes
          </p>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Success Result Banner */}
        {result && (
          <div
            style={{
              marginBottom: "32px",
              padding: "24px",
              borderRadius: "16px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>
                  🎉{" "}
                  <strong style={{ color: "#10b981" }}>{result.businessName}</strong> is ready!
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                  Your{" "}
                  <strong style={{ color: "#e2e8f0" }}>{result.kit.name}</strong> starter kit has
                  been generated successfully.
                </p>
              </div>
              <button
                onClick={() => setResult(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "16px",
                flexWrap: "wrap",
              }}
            >
              {GENERATED_ITEMS.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    fontSize: "13px",
                    color: "#6ee7b7",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label} ✓
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                background:
                  filterCategory === cat
                    ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
                    : "rgba(255,255,255,0.04)",
                border:
                  filterCategory === cat
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                color: filterCategory === cat ? "#fff" : "#9ca3af",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Kits Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredKits.map((kit) => {
            const accentColor = CATEGORY_COLORS[kit.category] ?? "#8b5cf6";
            return (
              <div
                key={kit.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${accentColor}33`,
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "all 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent glow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                  }}
                />

                {/* Kit Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    {KIT_EMOJIS[kit.id] ?? "🏢"}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#f1f5f9" }}>
                      {kit.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: accentColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {kit.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af", lineHeight: "1.5" }}>
                  {kit.description}
                </p>

                {/* Includes */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    What&apos;s included
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {kit.includes.slice(0, 5).map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "6px",
                        }}
                      >
                        <span style={{ color: accentColor, flexShrink: 0, marginTop: "1px" }}>✓</span>
                        {item}
                      </li>
                    ))}
                    {kit.includes.length > 5 && (
                      <li style={{ fontSize: "12px", color: "#4b5563" }}>
                        +{kit.includes.length - 5} more...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <div style={{ fontSize: "12px", color: "#4b5563" }}>
                    ⏱ {kit.estimatedTime}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedKit(kit);
                      setBusinessName("");
                      setError("");
                    }}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                      border: "none",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Launch Kit →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Launch Modal */}
      {selectedKit && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "24px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedKit(null);
              setError("");
            }
          }}
        >
          <div
            style={{
              background: "#0f0f1a",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "480px",
              width: "100%",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${CATEGORY_COLORS[selectedKit.category] ?? "#8b5cf6"}22`,
                  border: `1px solid ${CATEGORY_COLORS[selectedKit.category] ?? "#8b5cf6"}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                {KIT_EMOJIS[selectedKit.id] ?? "🏢"}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>
                  Launch {selectedKit.name} Kit
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                  Ready in {selectedKit.estimatedTime}
                </p>
              </div>
              <button
                onClick={() => { setSelectedKit(null); setError(""); }}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* What will be generated */}
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(139,92,246,0.05)",
                border: "1px solid rgba(139,92,246,0.15)",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Will be generated
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {GENERATED_ITEMS.map((item) => (
                  <span
                    key={item.key}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      fontSize: "12px",
                      color: "#c4b5fd",
                    }}
                  >
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Business Name Input */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#9ca3af", marginBottom: "8px" }}>
                Your Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") void handleLaunch(); }}
                placeholder={`e.g. ${selectedKit.name === "Photographer" ? "Smith Photography" : selectedKit.name === "Restaurant" ? "Casa del Sol" : `My ${selectedKit.name} Business`}`}
                autoFocus
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {error}
              </div>
            )}

            {/* Launching Progress */}
            {launching && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {GENERATED_ITEMS.map((item, i) => (
                    <div
                      key={item.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "rgba(139,92,246,0.06)",
                        animation: `fadeIn 0.3s ${i * 0.15}s both`,
                      }}
                    >
                      <span>{item.icon}</span>
                      <span style={{ flex: 1, fontSize: "13px", color: "#9ca3af" }}>
                        Generating {item.label}...
                      </span>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid rgba(139,92,246,0.3)",
                          borderTopColor: "#8b5cf6",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => { setSelectedKit(null); setError(""); }}
                disabled={launching}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ca3af",
                  fontSize: "14px",
                  cursor: launching ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => void handleLaunch()}
                disabled={launching || !businessName.trim()}
                style={{
                  flex: 2,
                  padding: "12px",
                  borderRadius: "10px",
                  background:
                    launching || !businessName.trim()
                      ? "rgba(139,92,246,0.3)"
                      : "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  border: "none",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: launching || !businessName.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {launching ? "Generating..." : "Launch Kit →"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

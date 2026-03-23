"use client";

import { useState } from "react";
import Link from "next/link";

type TaskType = "seo" | "performance" | "accessibility" | "content";

interface AutoPilotTask {
  id: string;
  projectId: string;
  type: TaskType;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
  createdAt: string;
  completedAt?: string;
}

const TASK_LABELS: Record<TaskType, string> = {
  seo: "SEO Optimization",
  performance: "Performance Audit",
  accessibility: "Accessibility Check",
  content: "Content Analysis",
};

const TASK_ICONS: Record<TaskType, string> = {
  seo: "🔍",
  performance: "⚡",
  accessibility: "♿",
  content: "📝",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#6b7280",
  running: "#f59e0b",
  completed: "#10b981",
  failed: "#ef4444",
};

export default function AutoPilotPage() {
  const [projectId, setProjectId] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<Set<TaskType>>(
    new Set(["seo", "performance", "accessibility", "content"])
  );
  const [tasks, setTasks] = useState<AutoPilotTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scheduled, setScheduled] = useState(false);

  const toggleTask = (task: TaskType) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(task)) {
        next.delete(task);
      } else {
        next.add(task);
      }
      return next;
    });
  };

  const runOptimization = async () => {
    if (!projectId.trim()) {
      setError("Please enter a project ID.");
      return;
    }
    if (selectedTasks.size === 0) {
      setError("Please select at least one task.");
      return;
    }
    setError("");
    setLoading(true);
    setTasks([]);

    try {
      const res = await fetch("/api/autopilot/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId.trim(),
          tasks: Array.from(selectedTasks),
        }),
      });

      const data = (await res.json()) as { ok: boolean; tasks?: AutoPilotTask[]; error?: string };

      if (!data.ok || !data.tasks) {
        setError(data.error ?? "Optimization failed.");
      } else {
        setTasks(data.tasks);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const statsCards = [
    { label: "Sites Optimized", value: "142", color: "#8b5cf6" },
    { label: "Issues Fixed", value: "1,847", color: "#06b6d4" },
    { label: "Avg SEO Improvement", value: "+18pts", color: "#10b981" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f0a 100%)",
        color: "#e2e8f0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(139,92,246,0.2)",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/admin"
            style={{
              color: "#8b5cf6",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(139,92,246,0.3)",
              transition: "all 0.2s",
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
              AI Auto-Pilot
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
              Automated optimization for your sites
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ fontSize: "13px", color: "#10b981" }}>Auto-Pilot Active</span>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {statsCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${card.color}33`,
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: 700, color: card.color }}>
                {card.value}
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Configuration Panel */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h2 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600, color: "#c4b5fd" }}>
              Run Optimization
            </h2>

            {/* Project ID Input */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", fontSize: "13px", color: "#9ca3af", marginBottom: "8px" }}
              >
                Project ID
              </label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="e.g. proj_abc123"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Task Selection */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{ display: "block", fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}
              >
                Select Tasks
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {(Object.keys(TASK_LABELS) as TaskType[]).map((task) => (
                  <label
                    key={task}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: selectedTasks.has(task)
                        ? "rgba(139,92,246,0.1)"
                        : "rgba(255,255,255,0.02)",
                      border: selectedTasks.has(task)
                        ? "1px solid rgba(139,92,246,0.4)"
                        : "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTasks.has(task)}
                      onChange={() => toggleTask(task)}
                      style={{ accentColor: "#8b5cf6", width: "16px", height: "16px" }}
                    />
                    <span style={{ fontSize: "16px" }}>{TASK_ICONS[task]}</span>
                    <span style={{ fontSize: "14px", color: "#e2e8f0" }}>{TASK_LABELS[task]}</span>
                  </label>
                ))}
              </div>
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

            <button
              onClick={runOptimization}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: loading
                  ? "rgba(139,92,246,0.3)"
                  : "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                border: "none",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Optimizing..." : "Run Optimization"}
            </button>

            {/* Schedule Section */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(6,182,212,0.05)",
                border: "1px solid rgba(6,182,212,0.2)",
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#67e8f9", marginBottom: "8px" }}>
                Nightly Schedule
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#6b7280" }}>
                Run automatically every night at 2:00 AM
              </p>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={() => setScheduled(!scheduled)}
                  style={{
                    width: "40px",
                    height: "22px",
                    borderRadius: "11px",
                    background: scheduled ? "#8b5cf6" : "rgba(255,255,255,0.1)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: scheduled ? "21px" : "3px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                    }}
                  />
                </div>
                <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                  {scheduled ? "Scheduled (nightly)" : "Enable nightly schedule"}
                </span>
              </label>
            </div>
          </div>

          {/* Results Panel */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#c4b5fd" }}>
                Results
              </h2>
              {tasks.length > 0 && (
                <span style={{ fontSize: "13px", color: "#10b981" }}>
                  {completedCount}/{tasks.length} completed
                </span>
              )}
            </div>

            {tasks.length === 0 && !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  color: "#4b5563",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🤖</div>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  Run an optimization to see results here.
                </p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚙️</div>
                <p style={{ color: "#8b5cf6", fontSize: "14px", margin: 0 }}>
                  AI is analyzing your site...
                </p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${STATUS_COLORS[task.status]}33`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>{TASK_ICONS[task.type]}</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#e2e8f0" }}>
                        {TASK_LABELS[task.type]}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: STATUS_COLORS[task.status],
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                  {task.result && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#9ca3af",
                        lineHeight: "1.5",
                      }}
                    >
                      {task.result}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

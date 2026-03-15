"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState(null);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => ({}));

    if (data.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setError(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8f9fc 0%, #fff 40%)",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7c3aed",
              marginBottom: 8,
            }}
          >
            Contact
          </div>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Talk to the team
          </h1>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.5,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tell us what you&apos;re building and we&apos;ll point you to the fastest path to a premium launch.
          </p>
        </div>

        {status === "sent" ? (
          <div
            style={{
              borderRadius: 24,
              border: "1px solid #d1fae5",
              background: "#ecfdf5",
              padding: 32,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>&#10003;</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#065f46" }}>
              Message sent!
            </h2>
            <p style={{ marginTop: 8, fontSize: 14, color: "#047857" }}>
              We&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{
                marginTop: 16,
                padding: "10px 20px",
                borderRadius: 14,
                border: "1px solid #d1fae5",
                background: "#fff",
                fontSize: 14,
                fontWeight: 600,
                color: "#065f46",
                cursor: "pointer",
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              borderRadius: 24,
              border: "1px solid #e2e8f0",
              background: "#fff",
              padding: 32,
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  color: "#0f172a",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  color: "#0f172a",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
                rows={5}
                placeholder="Tell us about your project..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  color: "#0f172a",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  fontSize: 13,
                  color: "#dc2626",
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 16,
                border: "none",
                background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              Or email us directly at{" "}
              <a href="mailto:support@dominat8.com" style={{ color: "#7c3aed" }}>
                support@dominat8.com
              </a>
            </div>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href="/pricing"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#7c3aed",
              textDecoration: "none",
            }}
          >
            View pricing &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}

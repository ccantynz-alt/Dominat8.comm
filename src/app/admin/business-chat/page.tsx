"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_ACTIONS = [
  { label: "Improve my SEO", icon: "🔍" },
  { label: "Check competitors", icon: "🎯" },
  { label: "Generate content", icon: "✍️" },
  { label: "Analyze traffic", icon: "📊" },
];

const MOCK_RESPONSES: Record<string, string> = {
  "Improve my SEO":
    "Great question! Here are your top 5 SEO opportunities right now:\n\n1. **Add meta descriptions** to 8 pages missing them — this can boost click-through rates by up to 5.8%.\n\n2. **Target long-tail keywords** like \"affordable [your service] near me\" — lower competition, higher intent.\n\n3. **Add schema markup** to your homepage and service pages so Google shows rich snippets.\n\n4. **Build 3-5 quality backlinks** from industry directories and local business associations.\n\n5. **Improve page speed** — your LCP is 3.2s. Aim for under 2.5s to rank higher.\n\nWant me to generate optimized meta descriptions for your pages?",
  "Check competitors":
    "I analyzed 6 competitors in your space. Here&apos;s what they&apos;re doing that you&apos;re not:\n\n**Competitor strengths:**\n- 4 out of 6 have a blog with weekly posts\n- Top competitor gets 68% of traffic from Google Business Profile\n- Average competitor has 47 backlinks vs your 12\n\n**Your advantages:**\n- Your site loads 40% faster than the average competitor\n- You have more 5-star reviews (if applicable)\n- Your pricing page is clearer\n\n**Recommended actions:**\n1. Start a blog with 2 posts/month\n2. Optimize your Google Business Profile\n3. Get listed on 5 more directories\n\nShall I draft your first blog post?",
  "Generate content":
    "I&apos;ll help you create compelling content. Based on your business type, here are content pieces I can generate:\n\n**High-impact content ideas:**\n1. **Hero headline** — A benefit-driven headline that converts\n2. **About page story** — Build trust with your origin story\n3. **3 service descriptions** — SEO-optimized, benefit-focused\n4. **5 FAQ answers** — Targets featured snippets\n5. **Email welcome sequence** — 3-part onboarding series\n6. **Social media posts** — 10 posts for the next 2 weeks\n\nWhich would you like me to start with? Just say the word and I&apos;ll have a full draft ready in seconds.",
  "Analyze traffic":
    "Here&apos;s your traffic analysis summary:\n\n**Traffic Breakdown:**\n- 🔍 Organic Search: 42% (growing +18% MoM)\n- 📱 Direct: 28%\n- 📲 Social Media: 18%\n- 🔗 Referral: 12%\n\n**Top performing pages:**\n1. Homepage — 1,240 visits\n2. Services page — 680 visits\n3. Contact page — 420 visits\n\n**Opportunities:**\n- Your blog posts get 0 traffic — consider adding one\n- Mobile bounce rate is 67% (industry avg: 52%) — optimize mobile UX\n- Visitors from Instagram convert 3x better than Facebook\n\nWant a full growth plan based on this data?",
};

const DEFAULT_RESPONSE =
  "That&apos;s a great question! I&apos;m analyzing your situation...\n\nBased on what I&apos;m seeing, here&apos;s my recommendation:\n\n1. **Start with the highest-impact change** — usually this is your homepage headline and your call-to-action button.\n\n2. **Focus on one channel** before spreading thin — pick SEO, social, or email and dominate it.\n\n3. **Track your baseline** — set up Google Analytics and Search Console if you haven&apos;t already.\n\n4. **Publish consistently** — even 1 blog post per week compounds dramatically over 6 months.\n\nIs there a specific aspect of your business growth you&apos;d like to dive deeper into?";

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export default function BusinessChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content:
        "Hi! I&apos;m your AI Business Assistant. I&apos;m here to help you grow your business, improve your online presence, and make smarter decisions.\n\nWhat would you like to work on today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const responseContent = MOCK_RESPONSES[content.trim()] ?? DEFAULT_RESPONSE;

    const assistantMsg: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const formatContent = (text: string) => {
    // Replace **bold** with styled spans and handle newlines
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} style={{ color: "#e2e8f0", fontWeight: 600 }}>
                {part}
              </strong>
            ) : (
              part
            )
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f1a 100%)",
        color: "#e2e8f0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(139,92,246,0.2)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
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

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            🤖
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Business Assistant
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span style={{ fontSize: "12px", color: "#10b981" }}>Online</span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "6px 14px",
            borderRadius: "20px",
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
            fontSize: "12px",
            color: "#a78bfa",
          }}
        >
          Powered by Dominat8 AI
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          gap: "10px",
          flexShrink: 0,
          overflowX: "auto",
        }}
      >
        <span style={{ fontSize: "12px", color: "#4b5563", alignSelf: "center", whiteSpace: "nowrap" }}>
          Quick actions:
        </span>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => void sendMessage(action.label)}
            disabled={loading}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#c4b5fd",
              fontSize: "13px",
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s",
              opacity: loading ? 0.5 : 1,
            }}
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                background:
                  msg.role === "assistant"
                    ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              {msg.role === "assistant" ? "🤖" : "👤"}
            </div>

            {/* Bubble */}
            <div style={{ maxWidth: "70%" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#e2e8f0",
                }}
              >
                {formatContent(msg.content)}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#4b5563",
                  marginTop: "4px",
                  textAlign: msg.role === "user" ? "right" : "left",
                  paddingLeft: msg.role === "user" ? 0 : "4px",
                  paddingRight: msg.role === "user" ? "4px" : 0,
                }}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "4px 16px 16px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#8b5cf6",
                    opacity: 0.6,
                    animation: `bounce 1.2s ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 24px",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about growing your business..."
            rows={1}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "12px",
              color: "#e2e8f0",
              fontSize: "14px",
              outline: "none",
              resize: "none",
              lineHeight: "1.5",
              minHeight: "44px",
              maxHeight: "120px",
              overflowY: "auto",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => void sendMessage(input)}
            disabled={loading || !input.trim()}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              background:
                loading || !input.trim()
                  ? "rgba(139,92,246,0.2)"
                  : "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              minWidth: "64px",
            }}
          >
            Send →
          </button>
        </div>
        <p style={{ margin: "8px 0 0 0", fontSize: "11px", color: "#374151", textAlign: "center" }}>
          Press Enter to send &bull; Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

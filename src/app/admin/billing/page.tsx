"use client";

import React, { useState } from "react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["1 project", "Community templates", "Dominat8 subdomain", "Basic analytics"],
    current: true,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: ["Unlimited projects", "All premium templates", "Custom domains + SSL", "AI video studio", "Priority support", "Advanced analytics"],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Everything in Pro", "Dedicated agent runners", "SLA guarantees", "Custom integrations", "White-label option"],
    contact: true,
  },
];

export default function AdminBilling() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade(priceId: string) {
    setLoading(priceId);
    setError(null);

    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json().catch(() => ({}));

    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Failed to create checkout session. Make sure STRIPE_SECRET_KEY is set.");
      setLoading(null);
    }
  }

  async function handleManage() {
    setLoading("portal");
    setError(null);

    const res = await fetch("/api/billing/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: "placeholder" }),
    });

    const data = await res.json().catch(() => ({}));

    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Failed to open billing portal. Make sure Stripe is configured.");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60">BILLING</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Plans & Billing</h1>
        <p className="mt-2 text-sm text-white/60">
          Manage your subscription and billing details.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 font-semibold">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-6 ${
              plan.highlight
                ? "border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-blue-500/5"
                : "border-white/10 bg-black/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold">{plan.name}</div>
              {plan.current && (
                <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-green-300">
                  Current
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-sm text-white/50">{plan.period}</span>}
            </div>

            <ul className="mt-5 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <svg className="h-4 w-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {plan.current && (
                <button
                  onClick={handleManage}
                  disabled={loading === "portal"}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition disabled:opacity-50"
                >
                  {loading === "portal" ? "Opening..." : "Manage Subscription"}
                </button>
              )}
              {plan.priceId && (
                <button
                  onClick={() => handleUpgrade(plan.priceId!)}
                  disabled={loading === plan.priceId}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading === plan.priceId ? "Redirecting..." : "Upgrade to Pro"}
                </button>
              )}
              {plan.contact && (
                <a
                  href="/contact"
                  className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold hover:bg-white/10 transition"
                >
                  Contact Sales
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="text-sm font-semibold">Billing History</div>
        <p className="mt-2 text-sm text-white/50">
          Invoice history will appear here once you subscribe to a paid plan.
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/40">
          No invoices yet
        </div>
      </div>
    </div>
  );
}

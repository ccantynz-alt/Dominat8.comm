"use client";

import React, { useEffect, useState } from "react";

type DomainRecord = {
  id: string;
  domain: string;
  txtRecord: string;
  status: "pending_dns" | "dns_verified" | "ssl_provisioning" | "ready" | "error";
  createdAt: string;
  updatedAt: string;
};

const statusConfig: Record<string, { label: string; color: string }> = {
  pending_dns: { label: "Pending DNS", color: "bg-yellow-500/20 text-yellow-300" },
  dns_verified: { label: "DNS Verified", color: "bg-blue-500/20 text-blue-300" },
  ssl_provisioning: { label: "Provisioning SSL", color: "bg-blue-500/20 text-blue-300" },
  ready: { label: "Ready", color: "bg-green-500/20 text-green-300" },
  error: { label: "Error", color: "bg-red-500/20 text-red-300" },
};

export default function AdminDomains() {
  const [domains, setDomains] = useState<DomainRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<any>(null);

  async function loadDomains() {
    setLoading(true);
    const res = await fetch("/api/domains/verify");
    const data = await res.json().catch(() => ({ domains: [] }));
    setDomains(data.domains ?? []);
    setLoading(false);
  }

  useEffect(() => { loadDomains(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newDomain.trim()) return;
    setAdding(true);
    setError(null);
    setInstructions(null);

    const res = await fetch("/api/domains/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: newDomain.trim() }),
    });

    const data = await res.json().catch(() => ({}));
    if (!data.ok) {
      setError(data.error ?? "Failed to add domain");
    } else if (data.instructions) {
      setInstructions(data.instructions);
    }
    setAdding(false);
    setNewDomain("");
    await loadDomains();
  }

  async function handleAction(domain: string, action: string) {
    const res = await fetch("/api/domains/verify", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, action }),
    });
    await res.json();
    await loadDomains();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60">DOMAINS</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Domain Management</h1>
        <p className="mt-2 text-sm text-white/60">
          Connect custom domains to your projects. Follow the wizard to verify DNS and provision SSL.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="text-sm font-semibold mb-4">Add Domain</div>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
          <button
            type="submit"
            disabled={adding}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add Domain"}
          </button>
        </form>
        {error && <div className="mt-3 text-sm text-red-400 font-semibold">{error}</div>}
      </div>

      {instructions && (
        <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6">
          <div className="text-sm font-semibold mb-3">DNS Configuration Required</div>
          <div className="space-y-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Step 1: TXT Record</div>
              <div className="text-white/80">
                <span className="text-white/50">Name:</span> <code className="bg-white/10 px-1.5 py-0.5 rounded">{instructions.name}</code>
              </div>
              <div className="text-white/80 mt-1">
                <span className="text-white/50">Value:</span> <code className="bg-white/10 px-1.5 py-0.5 rounded">{instructions.value}</code>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Step 2: CNAME Record</div>
              <div className="text-white/80">
                <span className="text-white/50">Name:</span> <code className="bg-white/10 px-1.5 py-0.5 rounded">{instructions.cname?.name}</code>
              </div>
              <div className="text-white/80 mt-1">
                <span className="text-white/50">Value:</span> <code className="bg-white/10 px-1.5 py-0.5 rounded">{instructions.cname?.value}</code>
              </div>
            </div>
          </div>
          <button
            onClick={() => setInstructions(null)}
            className="mt-4 text-xs text-white/50 hover:text-white/80 transition"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="space-y-3">
        {loading && <div className="text-sm text-white/50">Loading domains...</div>}
        {!loading && !domains.length && (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center text-sm text-white/40">
            No domains configured yet. Add one above to get started.
          </div>
        )}
        {domains.map((d) => {
          const cfg = statusConfig[d.status] ?? statusConfig.pending_dns;
          return (
            <div key={d.id} className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold">{d.domain}</span>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/40">
                    Added {new Date(d.createdAt).toLocaleDateString()}
                    {d.txtRecord && <> &middot; TXT: <code className="bg-white/5 px-1 rounded">{d.txtRecord}</code></>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {d.status === "pending_dns" && (
                    <button
                      onClick={() => handleAction(d.domain, "check_dns")}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/10 transition"
                    >
                      Verify DNS
                    </button>
                  )}
                  {d.status === "dns_verified" && (
                    <button
                      onClick={() => handleAction(d.domain, "provision_ssl")}
                      className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition"
                    >
                      Provision SSL
                    </button>
                  )}
                  {d.status === "ready" && (
                    <a
                      href={`https://${d.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-green-500/20 px-4 py-2 text-xs font-semibold text-green-300 hover:bg-green-500/30 transition"
                    >
                      Open Site
                    </a>
                  )}
                </div>
              </div>

              {/* Progress steps */}
              <div className="mt-4 flex items-center gap-1">
                {["pending_dns", "dns_verified", "ssl_provisioning", "ready"].map((step, i) => {
                  const steps = ["pending_dns", "dns_verified", "ssl_provisioning", "ready"];
                  const currentIdx = steps.indexOf(d.status);
                  const done = i <= currentIdx;
                  return (
                    <React.Fragment key={step}>
                      <div className={`h-1.5 flex-1 rounded-full ${done ? "bg-purple-500" : "bg-white/10"}`} />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-white/30 uppercase tracking-wider">
                <span>DNS</span>
                <span>Verified</span>
                <span>SSL</span>
                <span>Ready</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

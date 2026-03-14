"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Project name is required"); return; }

    setSaving(true);
    setError(null);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), description: description.trim(), domain: domain.trim() }),
    });

    const data = await res.json().catch(() => ({}));

    if (!data.ok) {
      setError(data.error ?? "Failed to create project");
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60">PROJECTS</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">Project name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Awesome Site"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the project..."
            rows={3}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/80 mb-1.5">Domain (optional)</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
        </div>

        {error && (
          <div className="text-sm text-red-400 font-semibold">{error}</div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

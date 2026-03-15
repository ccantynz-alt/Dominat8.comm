"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: "draft" | "building" | "live";
  createdAt: string;
  updatedAt: string;
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-300",
  building: "bg-yellow-500/20 text-yellow-300",
  live: "bg-green-500/20 text-green-300",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json().catch(() => ({ projects: [] }));
    setProjects(data.projects ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white/60 text-sm">Loading projects...</div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/30 p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="h-6 w-6 text-white/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-white">No projects yet</h1>
          <p className="mt-2 text-sm text-white/60">
            Create your first project to start building conversion-first sites with AI.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Create project
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/60">PROJECTS</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Projects</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          New project
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-semibold truncate">{p.name}</h2>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColors[p.status] ?? statusColors.draft}`}>
                    {p.status}
                  </span>
                </div>
                {p.description && (
                  <p className="mt-1 text-sm text-white/60 line-clamp-2">{p.description}</p>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-white/40">
                  {p.domain && <span>{p.domain}</span>}
                  <span>Created {new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/cockpit?projectId=${p.id}`}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/10 transition"
                >
                  Open in Cockpit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
                >
                  {deleting === p.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

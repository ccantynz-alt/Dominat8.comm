import { NextRequest, NextResponse } from "next/server";
import { kvGetJson, kvSetJson } from "@/lib/d8kv";

const PROJECTS_KEY = "d8:projects";

type ProjectRecord = {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: "draft" | "building" | "live";
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<ProjectRecord[]> {
  return (await kvGetJson<ProjectRecord[]>(PROJECTS_KEY)) ?? [];
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === params.id);
  if (!project) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, project });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === params.id);
  if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const allowed = ["name", "description", "domain", "status"] as const;
  for (const key of allowed) {
    if (body[key] !== undefined) {
      (projects[idx] as any)[key] = body[key];
    }
  }
  projects[idx].updatedAt = new Date().toISOString();

  await kvSetJson(PROJECTS_KEY, projects);
  return NextResponse.json({ ok: true, project: projects[idx] });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== params.id);
  if (filtered.length === projects.length) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  await kvSetJson(PROJECTS_KEY, filtered);
  return NextResponse.json({ ok: true });
}

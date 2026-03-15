import { NextRequest, NextResponse } from "next/server";
import { kvGetJson, kvSetJson } from "@/lib/d8kv";

const PROJECTS_KEY = "d8:projects";

export type ProjectRecord = {
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

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ ok: true, projects });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.name) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }

  const projects = await getProjects();
  const now = new Date().toISOString();
  const project: ProjectRecord = {
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name,
    description: body.description ?? "",
    domain: body.domain ?? "",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  projects.push(project);
  await kvSetJson(PROJECTS_KEY, projects);

  return NextResponse.json({ ok: true, project }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import type { AutoPilotTask } from "@/lib/autopilot/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TaskType = "seo" | "performance" | "accessibility" | "content";

const MOCK_RESULTS: Record<TaskType, string> = {
  seo:
    "SEO analysis complete. Found 3 missing meta descriptions, 2 pages without alt text on images, and 1 broken internal link. Recommended: Add structured data markup, compress images, and update title tags for target keywords. Estimated score improvement: +12 points.",
  performance:
    "Performance audit complete. Page load time reduced from 4.2s to 1.8s by enabling image lazy loading, deferring non-critical JavaScript, and setting up a CDN. Largest Contentful Paint improved by 54%. Core Web Vitals now in the green.",
  accessibility:
    "Accessibility scan complete. Fixed 7 WCAG 2.1 violations: missing ARIA labels on form inputs, insufficient color contrast ratios (4 instances), missing skip navigation link, and 2 images without descriptive alt text. Site now scores 97/100 on accessibility.",
  content:
    "Content analysis complete. Identified 5 pages with thin content (under 300 words). Generated SEO-optimized content suggestions for homepage, about page, and 3 service pages. Readability score improved from Grade 12 to Grade 8. Added 2 compelling CTAs.",
};

interface OptimizeRequest {
  projectId: string;
  tasks: TaskType[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OptimizeRequest;
    const { projectId, tasks } = body;

    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json(
        { ok: false, error: "projectId is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { ok: false, error: "tasks array is required and must not be empty" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const results: AutoPilotTask[] = tasks.map((taskType, index) => ({
      id: `task_${Date.now()}_${index}`,
      projectId,
      type: taskType,
      status: "completed" as const,
      result: MOCK_RESULTS[taskType] ?? "Task completed successfully.",
      createdAt: now,
      completedAt: new Date(Date.now() + (index + 1) * 500).toISOString(),
    }));

    return NextResponse.json({ ok: true, tasks: results });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

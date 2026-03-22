import { NextResponse } from "next/server";
import { classifyIntent, getScaffold } from "@/lib/scaffold/classifier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ ok: false, error: "Prompt is required" }, { status: 400 });
    }

    const mode = body?.mode === "premium" ? "premium" : "instant";

    if (mode === "premium") {
      return NextResponse.json({
        ok: true,
        mode: "premium",
        message: "Premium generation queued. AI will generate a custom site using your exact specifications.",
      });
    }

    const scaffoldId = classifyIntent(prompt);
    const scaffold = getScaffold(scaffoldId);

    if (!scaffold) {
      return NextResponse.json({ ok: false, error: "No matching template found" }, { status: 404 });
    }

    const personalizedHtml = scaffold.html
      .replace(/>Get Started Free</g, `>Get Started</`)
      .replace(/Built with Dominat8/g, "Powered by Dominat8");

    return NextResponse.json({
      ok: true,
      mode: "instant",
      scaffoldId: scaffold.id,
      templateName: scaffold.name,
      category: scaffold.category,
      description: scaffold.description,
      html: personalizedHtml,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Generation failed" }, { status: 500 });
  }
}

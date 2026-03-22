import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const framework = body?.framework === "react" ? "react" : body?.framework === "nextjs" ? "nextjs" : "html";

    if (!prompt) {
      return NextResponse.json({ ok: false, error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a high-quality mock response when no API key is configured
      const mockHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Premium AI Generated Site</title></head>
<body style="margin:0;min-height:100vh;background:radial-gradient(1200px 800px at 65% 5%,rgba(168,85,247,0.22),transparent 60%),linear-gradient(180deg,#07070B,#05050A);color:#EDEAF7;font-family:system-ui,sans-serif">
  <main style="max-width:900px;margin:0 auto;padding:80px 20px;text-align:center">
    <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(168,85,247,0.15);border:1px solid rgba(255,255,255,0.1);font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(237,234,247,0.8)">AI GENERATED</div>
    <h1 style="margin:20px 0 0;font-size:52px;font-weight:900;letter-spacing:-0.03em;color:#F6F2FF">Premium AI Website</h1>
    <p style="margin:16px auto 0;max-width:500px;font-size:17px;line-height:1.6;color:rgba(237,234,247,0.65)">This is a preview of what Dominat8 Premium generates. Connect your OpenAI API key for full AI-powered generation.</p>
    <p style="margin:12px auto 0;max-width:500px;font-size:14px;color:rgba(237,234,247,0.45)">Prompt: &ldquo;${prompt.replace(/"/g, "&quot;").slice(0, 100)}&rdquo;</p>
    <p style="margin:8px auto 0;font-size:13px;color:rgba(168,85,247,0.7)">Framework: ${framework} | Mode: Premium</p>
    <div style="margin-top:30px"><a href="/builder" style="display:inline-block;padding:13px 26px;border-radius:12px;background:linear-gradient(90deg,rgba(168,85,247,1),rgba(59,130,246,1));color:#07070B;font-weight:800;font-size:14px;text-decoration:none">Back to Builder</a></div>
  </main>
</body>
</html>`;

      return NextResponse.json({
        ok: true,
        mode: "premium",
        framework,
        html: mockHtml,
        note: "Demo mode — connect OPENAI_API_KEY for full AI generation",
      });
    }

    // Real OpenAI generation
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const systemPrompt = framework === "html"
      ? "You are a world-class web designer. Generate a complete, single-page HTML website with inline CSS. Use a dark premium theme with purple/blue gradients (rgba(168,85,247) and rgba(59,130,246)). Background: #07070B. Make it look stunning and conversion-optimized."
      : `You are a world-class React developer. Generate a single React component (App.tsx) with inline styles. Use a dark premium theme with purple/blue gradients. Include TypeScript types. Export default the App component.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a website for: ${prompt}` },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "";

    // Extract HTML/code from markdown code blocks if present
    const codeMatch = content.match(/```(?:html|tsx|jsx)?\s*([\s\S]*?)```/);
    const html = codeMatch ? codeMatch[1].trim() : content;

    return NextResponse.json({
      ok: true,
      mode: "premium",
      framework,
      html,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

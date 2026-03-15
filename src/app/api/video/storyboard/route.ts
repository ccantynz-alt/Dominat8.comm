import { NextRequest, NextResponse } from "next/server";
import type { D8Storyboard, D8VideoShot } from "@/lib/video/d8VideoTypes";

function fallbackStoryboard(topic: string, seconds: number): D8Storyboard {
  const shotCount = Math.max(3, Math.min(8, Math.round(seconds / 7)));
  const perShot = Math.round(seconds / shotCount);

  const templates: { title: string; lines: string[] }[] = [
    { title: "The Problem", lines: ["Most sites look the same", "Low conversions, high bounce"] },
    { title: "Meet Dominat8", lines: ["AI-powered site builder", "Conversion-first design"] },
    { title: "How It Works", lines: ["Pick a template", "AI generates your content", "Publish in minutes"] },
    { title: "Key Features", lines: ["Locked visual layer", "Inline-safe styling", "Works without Tailwind"] },
    { title: "AI Agents", lines: ["Creative Director", "Copy Chief", "SEO Optimizer"] },
    { title: "Real Results", lines: ["2x conversion rates", "90+ Lighthouse scores", "Zero downtime deploys"] },
    { title: "Custom Domains", lines: ["One-click SSL", "DNS verification", "Global CDN"] },
    { title: "Get Started", lines: [`Build with ${topic}`, "Start free today", "dominat8.com"] },
  ];

  const shots: D8VideoShot[] = templates.slice(0, shotCount).map((t, i) => ({
    id: `shot_${i}`,
    title: t.title,
    durationSec: perShot,
    lines: t.lines,
  }));

  return {
    brand: "Dominat8",
    title: topic,
    shots,
    voiceover: shots.map((s) => `${s.title}: ${s.lines.join(". ")}.`),
    createdAtIso: new Date().toISOString(),
    mode: "fallback",
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const topic = body?.topic ?? "How Dominat8 Works";
  const seconds = Math.max(15, Math.min(90, Number(body?.seconds) || 35));

  // Try OpenAI if available, otherwise use fallback
  const openaiKey = process.env.OPENAI_API_KEY;

  if (openaiKey) {
    try {
      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({ apiKey: openaiKey });

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You generate video storyboards for the Dominat8 AI website builder. Return valid JSON matching this schema: { brand: string, title: string, shots: [{ id: string, title: string, durationSec: number, lines: string[] }], voiceover: string[] }. The total duration of all shots should be approximately ${seconds} seconds. Each shot should have 2-4 lines. Create ${Math.round(seconds / 7)} shots.`,
          },
          { role: "user", content: `Create a storyboard about: ${topic}` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
      });

      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}");

      if (parsed.shots?.length) {
        const storyboard: D8Storyboard = {
          brand: parsed.brand ?? "Dominat8",
          title: parsed.title ?? topic,
          shots: parsed.shots,
          voiceover: parsed.voiceover ?? [],
          createdAtIso: new Date().toISOString(),
          mode: "ai",
        };
        return NextResponse.json({ ok: true, storyboard });
      }
    } catch {
      // Fall through to fallback
    }
  }

  const storyboard = fallbackStoryboard(topic, seconds);
  return NextResponse.json({ ok: true, storyboard });
}

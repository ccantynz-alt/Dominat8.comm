import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { kv } from "@vercel/kv";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function stamp(prefix: string) {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${prefix}_${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}_${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

function runId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function isSafeAgentId(agentId: string) {
  return /^[a-zA-Z0-9_-]+$/.test(agentId);
}

async function loadPromptMarkdown(agentId: string) {
  if (!isSafeAgentId(agentId)) {
    return { ok: false as const, status: 400, error: "Invalid agentId (allowed: letters, numbers, _ and -)." };
  }

  const agentsDir = path.join(process.cwd(), "agents");
  const mdPath = path.join(agentsDir, `${agentId}.md`);

  try {
    const promptMarkdown = await fs.readFile(mdPath, "utf8");
    return { ok: true as const, promptMarkdown, mdPath };
  } catch (e: any) {
    const code = e?.code || "READ_FAIL";
    return { ok: false as const, status: 404, error: `Agent markdown not found: ${agentId}.md (${code})`, mdPath };
  }
}

function envInt(name: string, fallback: number) {
  const v = process.env[name];
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function envStr(name: string, fallback: string) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : fallback;
}

/**
 * Convert unknown SDK objects into plain JSON if possible.
 */
function toPlainJson(raw: any): any {
  try {
    if (!raw) return raw;
    if (typeof raw.toJSON === "function") return raw.toJSON();
  } catch {}
  try {
    return JSON.parse(JSON.stringify(raw));
  } catch {
    return raw;
  }
}

/**
 * Extract text from many Responses API shapes.
 */
function extractOutputText(rawAny: any): string | null {
  try {
    const raw = rawAny;
    if (!raw) return null;

    // SDK convenience fields
    if (typeof raw.output_text === "string" && raw.output_text.trim()) return raw.output_text.trim();
    if (typeof raw.text === "string" && raw.text.trim()) return raw.text.trim();

    const out = raw.output;
    if (Array.isArray(out)) {
      const chunks: string[] = [];

      for (const item of out) {
        if (!item) continue;

        // { type:"output_text", text:"..." }
        if (item.type === "output_text" && typeof item.text === "string" && item.text.trim()) {
          chunks.push(item.text.trim());
        }

        // { type:"message", content:[...] }
        const content = item.content;
        if (Array.isArray(content)) {
          for (const c of content) {
            if (!c) continue;

            // { type:"output_text"|"text", text:"..." }
            if ((c.type === "output_text" || c.type === "text") && typeof c.text === "string" && c.text.trim()) {
              chunks.push(c.text.trim());
            }

            // { type:"text", text:{ value:"..." } }
            const v = (c as any)?.text?.value;
            if (typeof v === "string" && v.trim()) chunks.push(v.trim());
          }
        }

        // Some shapes: item.message?.content?
        const msgContent = (item as any)?.message?.content;
        if (Array.isArray(msgContent)) {
          for (const c of msgContent) {
            const v = (c as any)?.text?.value;
            if (typeof v === "string" && v.trim()) chunks.push(v.trim());
            if (typeof (c as any)?.text === "string" && (c as any).text.trim()) chunks.push((c as any).text.trim());
          }
        }
      }

      const joined = chunks.join("\n").trim();
      return joined.length ? joined : null;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Deep scan fallback: find any strings in keys commonly used for text.
 * This is a last resort so we never get "no outputText" without seeing why.
 */
function deepScanForText(rawAny: any): string | null {
  try {
    const raw = rawAny;
    if (!raw || typeof raw !== "object") return null;

    const seen = new Set<any>();
    const out: string[] = [];
    const MAX_OUT = 12000; // keep response safe
    const MAX_DEPTH = 8;

    const pick = (k: string, v: any) => {
      if (typeof v === "string" && v.trim()) {
        // Prefer likely fields
        if (k === "output_text" || k === "value" || k === "text" || k === "content") {
          out.push(v.trim());
        }
      }
    };

    const walk = (node: any, depth: number) => {
      if (!node || typeof node !== "object") return;
      if (seen.has(node)) return;
      seen.add(node);
      if (depth > MAX_DEPTH) return;

      if (Array.isArray(node)) {
        for (const it of node) walk(it, depth + 1);
        return;
      }

      for (const [k, v] of Object.entries(node)) {
        pick(k, v);

        // Special: text:{value:"..."}
        if (k === "text" && v && typeof v === "object" && typeof (v as any).value === "string") {
          const vv = String((v as any).value || "").trim();
          if (vv) out.push(vv);
        }

        if (typeof v === "object" && v !== null) walk(v, depth + 1);
      }
    };

    walk(raw, 0);

    const joined = out.join("\n").trim();
    if (!joined) return null;
    return joined.slice(0, MAX_OUT);
  } catch {
    return null;
  }
}

/**
 * Extract a PowerShell patch script from agent output.
 */
function extractPowerShellPatch(text: string | null): { ok: boolean; script: string | null; reason?: string } {
  if (!text || !text.trim()) return { ok: false, script: null, reason: "No output text" };

  const markerStart = "BEGIN_POWERSHELL_PATCH";
  const markerEnd = "END_POWERSHELL_PATCH";
  const si = text.indexOf(markerStart);
  const ei = text.indexOf(markerEnd);

  if (si >= 0 && ei > si) {
    const mid = text.slice(si + markerStart.length, ei).trim();
    if (mid.length) return { ok: true, script: mid };
  }

  const fence = /```(powershell|ps1)\s*([\s\S]*?)```/im;
  const m = text.match(fence);
  if (m && m[2] && m[2].trim().length) {
    return { ok: true, script: m[2].trim() };
  }

  return { ok: false, script: null, reason: "No powershell fenced block or markers found" };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get("agentId");
  const projectId = searchParams.get("projectId") || "demo";

  const info: any = {
    ok: true,
    mode: process.env.OPENAI_API_KEY ? "real-run" : "dry-run",
    stamp: stamp("AGENT_RUNNER_OK"),
    projectId,
    now: new Date().toISOString(),
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
  };

  if (agentId) {
    const md = await loadPromptMarkdown(agentId);
    info.agentId = agentId;
    info.promptLoad = md.ok ? { ok: true, mdPath: md.mdPath } : md;
  }

  return NextResponse.json(info);
}

export async function POST(req: Request) {
  const startedAt = new Date().toISOString();
  const rid = runId();

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const agentId = String(body?.agentId || "").trim();
  const projectId = String(body?.projectId || "demo").trim();
  const input = body?.input ?? {};

  if (!agentId) return NextResponse.json({ ok: false, error: "Missing agentId" }, { status: 400 });

  const md = await loadPromptMarkdown(agentId);
  if (!md.ok) {
    return NextResponse.json(
      { ok: false, agentId, projectId, status: md.status, error: md.error, mdPath: (md as any).mdPath },
      { status: md.status }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const modelName = envStr("OPENAI_MODEL", "gpt-5");
  const reasoningEffort = envStr("OPENAI_REASONING_EFFORT", "minimal");
  const maxOutputTokens = envInt("OPENAI_MAX_OUTPUT_TOKENS", 2400);

  const base: any = {
    ok: true,
    mode: apiKey ? "real-run" : "dry-run",
    stamp: stamp("AGENT_RUNNER_OK"),
    runId: rid,
    startedAt,
    finishedAt: null as string | null,
    agentId,
    projectId,
    mdPath: md.mdPath,
    model: { name: modelName, reasoningEffort, maxOutputTokens },
    input,
    outputText: null as string | null,
    patch: { ok: false as boolean, script: null as string | null, reason: "not_extracted" },
    openai: { ok: false, status: null as any, outputText: null as string | null, rawPreview: null as string | null },
    persistence: { ok: false, kvKeys: null as any },
    debug: { extractor: "v2_bulletproof", rawKeys: null as any, rawPreview: null as string | null }
  };

  if (!apiKey) {
    base.finishedAt = new Date().toISOString();
    return NextResponse.json({
      ...base,
      openai: { ok: false, status: 0, outputText: null, rawPreview: "No OPENAI_API_KEY set; dry-run only." }
    });
  }

  const client = new OpenAI({ apiKey });

  const instructions = [
    md.promptMarkdown,
    "",
    "If the user requests implementation, output a SINGLE PowerShell patch script inside a fenced code block:",
    "```powershell",
    "# ...script...",
    "```",
    "",
    "If you output a patch, it must be full overwrites (no partial diffs), PowerShell-only, copy/paste safe."
  ].join("\n");

  let raw: any = null;

  try {
    raw = await client.responses.create({
      model: modelName,
      instructions,
      input: String(typeof input === "string" ? input : JSON.stringify(input ?? {})),
      max_output_tokens: maxOutputTokens,
      reasoning: { effort: reasoningEffort as any },
      store: true,
      temperature: 0.6
    } as any);
  } catch (e: any) {
    base.finishedAt = new Date().toISOString();
    return NextResponse.json({
      ...base,
      openai: { ok: false, status: 500, outputText: null, rawPreview: String(e?.message || e) }
    }, { status: 500 });
  }

  const rawJson = toPlainJson(raw);
  const rawKeys = rawJson && typeof rawJson === "object" ? Object.keys(rawJson).slice(0, 60) : null;

  let preview: string | null = null;
  try {
    preview = JSON.stringify(rawJson, null, 2);
    if (preview.length > 8000) preview = preview.slice(0, 8000) + "\n...<truncated>...";
  } catch {
    preview = "rawJson not serializable";
  }

  // Try multiple extraction strategies
  const out1 = extractOutputText(raw);
  const out2 = out1 || extractOutputText(rawJson);
  const out3 = out2 || deepScanForText(rawJson);

  base.outputText = out3;
  base.openai = { ok: true, status: 200, outputText: out3, rawPreview: preview };
  base.debug = { extractor: "v2_bulletproof", rawKeys, rawPreview: preview };

  const patch = extractPowerShellPatch(out3);
  base.patch = { ok: patch.ok, script: patch.script, reason: patch.reason || null };

  base.finishedAt = new Date().toISOString();

  const keyLatest = `agentRun:project:${projectId}:latest`;
  const keyById = `agentRun:project:${projectId}:${rid}`;
  const keyGlobal = `agentRun:${rid}`;
  const keyIds = `agentRun:project:${projectId}:ids`;

  const patchLatest = `agentPatch:project:${projectId}:latest`;
  const patchById = `agentPatch:project:${projectId}:${rid}`;

  try {
    await kv.set(keyLatest, base);
    await kv.set(keyById, base);
    await kv.set(keyGlobal, base);

    await kv.lpush(keyIds, rid);
    await kv.ltrim(keyIds, 0, 24);

    if (patch.ok && patch.script) {
      await kv.set(patchLatest, { runId: rid, agentId, projectId, createdAt: base.finishedAt, script: patch.script });
      await kv.set(patchById, { runId: rid, agentId, projectId, createdAt: base.finishedAt, script: patch.script });
    }

    base.persistence = {
      ok: true,
      kvKeys: { keyLatest, keyById, keyGlobal, keyIds, patchLatest, patchById }
    };
  } catch (e: any) {
    base.persistence = {
      ok: false,
      kvKeys: { keyLatest, keyById, keyGlobal, keyIds, patchLatest, patchById },
      error: String(e?.message || e)
    };
  }

  return NextResponse.json(base);
}

/* =========================================================
 * INSTALL C3 — STRICT PER-AGENT TASK MODE (BUNDLE RUN)
 * Route: /api/agents/bundle/run
 * File:  src/app/api/agents/bundle/run/route.ts
 * ========================================================= */

import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import {
  STRICT_STEP_MAX_OUTPUT_TOKENS,
  buildStrictSystemPrompt,
  buildStrictUserPrompt,
  extractSinglePowershellFence,
  type StrictTaskSpec,
} from "@/lib/agents/bundleStrict";

function nowIso() { return new Date().toISOString(); }
function randId(prefix: string) {
  const s = Math.random().toString(36).slice(2, 10);
  const t = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${s}_${t}`;
}

type BundleRow = {
  agentId: string;
  status: "ok" | "contract_fail" | "error";
  reason?: string;
  bytes?: number;
};

type BundleRecord = {
  ok: boolean;
  mode: "strict-tasks";
  projectId: string;
  runId: string;
  goal: string;
  createdAt: string;
  finishedAt?: string;
  stepMaxOutputTokens: number;
  scriptsCount: number;
  rows: BundleRow[];
  patchKey?: string;
  patchBytes?: number;
};

function keyBundleRecord(projectId: string, runId: string) {
  return `agentBundle:project:${projectId}:${runId}`;
}
function keyBundlePatch(projectId: string, runId: string) {
  return `agentBundlePatch:project:${projectId}:${runId}`;
}

function buildTasks(): StrictTaskSpec[] {
  return [
    { agentId: "01_product_manager", title: "Tighten hero CTA copy (microcopy only)", task: "Edit marketing homepage hero CTAs (small string edits only). Prefer src/app/page.tsx or src/app/(marketing)/page.tsx." },
    { agentId: "02_creative_director", title: "Add 3-bullet value props (copy only)", task: "Add 3 bullet value props under hero headline (minimal JSX + strings only)." },
    { agentId: "03_brand_designer", title: "Add subtle gold sparkle entrance (CSS only)", task: "Add subtle gold sparkle entrance animation for hero (minimal CSS in globals.css or hero CSS module)." },
    { agentId: "04_frontend_engineer", title: "Fullscreen hero background image layer (safe)", task: "Make hero full-viewport and add background image layer (minimal CSS/JSX; must not break layout)." },
    { agentId: "05_ui_engineer", title: "Button hover polish (CSS only)", task: "Improve primary button hover/active states (tiny CSS only)." },
    { agentId: "06_seo_engineer", title: "Confirm meta title/description safety (small edit)", task: "Ensure homepage metadata title/description exist (minimal Next.js metadata edit)." },
    { agentId: "07_growth_marketer", title: "Add trust strip (logos/text only)", task: "Add small trust strip below hero (text-only or simple placeholder logos; minimal JSX)." },
    { agentId: "08_fullstack_engineer", title: "Preserve proof box; polish spacing (tiny)", task: "Keep LIVE_OK / BUILD_STAMP proof box; only polish spacing/typography (no removals)." },
    { agentId: "09_release_engineer", title: "Add tiny bundle patch note (<=10 lines)", task: "Add a very short note under /upgrades about running bundle patches (<=10 lines)." },
  ];
}

async function runSingleAgentStrict(baseUrl: string, projectId: string, agentId: string, systemPrompt: string, userPrompt: string) {
  const body = {
    projectId,
    agentId,
    systemPromptOverride: systemPrompt,
    userPromptOverride: userPrompt,
    stepMaxOutputTokens: STRICT_STEP_MAX_OUTPUT_TOKENS,
    strict: true,
  };

  const res = await fetch(`${baseUrl}/api/agents/run`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, json };
}

function toBaseUrl(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const startedAt = nowIso();
  let projectId = "demo";
  let goal = "";

  try {
    const body = await req.json().catch(() => ({}));
    projectId = (body?.projectId || "demo").toString();
    goal = (body?.goal || "").toString();
  } catch {}

  const runId = randId("bundle");
  const baseUrl = toBaseUrl(req);

  const record: BundleRecord = {
    ok: true,
    mode: "strict-tasks",
    projectId,
    runId,
    goal,
    createdAt: startedAt,
    stepMaxOutputTokens: STRICT_STEP_MAX_OUTPUT_TOKENS,
    scriptsCount: 0,
    rows: [],
  };

  await kv.set(keyBundleRecord(projectId, runId), record);

  const tasks = buildTasks();
  const system = buildStrictSystemPrompt();

  const scripts: string[] = [];
  const rows: BundleRow[] = [];

  for (const t of tasks) {
    try {
      const user = buildStrictUserPrompt(goal, t);
      const r = await runSingleAgentStrict(baseUrl, projectId, t.agentId, system, user);

      const raw =
        (r.json?.patchScript as string) ||
        (r.json?.patch as string) ||
        (r.json?.script as string) ||
        (r.json?.text as string) ||
        (r.json?.output as string) ||
        (r.json?.raw as string) ||
        "";

      const extracted = extractSinglePowershellFence(raw);

      if (!extracted.ok) {
        rows.push({ agentId: t.agentId, status: "contract_fail", reason: extracted.reason });
        continue;
      }

      const code = extracted.code;

      if (code.trim().toUpperCase().includes("CONTRACT_FAIL")) {
        rows.push({ agentId: t.agentId, status: "contract_fail", reason: "agent_declined" });
        continue;
      }

      scripts.push(code);
      rows.push({ agentId: t.agentId, status: "ok", bytes: Buffer.byteLength(code, "utf8") });
    } catch (e: any) {
      rows.push({ agentId: t.agentId, status: "error", reason: (e?.message || "error").toString() });
    }
  }

  const combined = [
    "Set-StrictMode -Version Latest",
    '$ErrorActionPreference = "Stop"',
    "",
    "# =====================================================",
    "# Dominat8 Bundle Patch (STRICT C3)",
    `# projectId: ${projectId}`,
    `# runId: ${runId}`,
    `# createdAt: ${startedAt}`,
    "# =====================================================",
    "",
    ...scripts.map((s, i) => [
      "",
      "# ------------------------------",
      `# Agent Script ${i + 1}`,
      "# ------------------------------",
      s.trim(),
      "",
    ].join("\\n")),
    "",
    "# Final proof artifact (guaranteed)",
    "Set-Content -LiteralPath '.\\\\PATCH_BUNDLE_VERIFY.txt' -Value 'BUNDLE_OK' -Encoding utf8",
    "",
  ].join("\\n");

  const patchKey = keyBundlePatch(projectId, runId);
  await kv.set(patchKey, combined);

  record.finishedAt = nowIso();
  record.rows = rows;
  record.scriptsCount = scripts.length;
  record.patchKey = patchKey;
  record.patchBytes = Buffer.byteLength(combined, "utf8");

  await kv.set(keyBundleRecord(projectId, runId), record);

  return NextResponse.json({
    ok: true,
    mode: record.mode,
    projectId,
    runId,
    goal,
    scriptsCount: record.scriptsCount,
    stepMaxOutputTokens: record.stepMaxOutputTokens,
    patchKey,
    patchBytes: record.patchBytes,
    rows,
    startedAt,
    finishedAt: record.finishedAt,
  });
}
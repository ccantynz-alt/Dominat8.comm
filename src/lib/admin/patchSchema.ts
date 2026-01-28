export type D8PatchFile = {
  // repo-relative path only (e.g. "src/app/page.tsx")
  path: string;
  // full file content (complete replacement)
  content: string;
};

export type D8PatchPack = {
  version: "d8_patch_v1";
  projectId: string;
  title: string;
  note?: string;
  files: D8PatchFile[];
};

function isNonEmptyString(x: any) {
  return typeof x === "string" && x.trim().length > 0;
}

function normalizeRepoRel(p: string) {
  // Convert Windows slashes to forward slashes, strip leading ./, prevent ../
  let s = p.replace(/\\/g, "/").replace(/^\.\//, "");
  s = s.replace(/^\/+/, "");
  // prevent traversal
  if (s.includes("..")) throw new Error(`Invalid path (.. not allowed): ${p}`);
  return s;
}

export function parsePatchPackFromText(text: string): D8PatchPack | null {
  if (!isNonEmptyString(text)) return null;

  // Try to find a JSON object in the text:
  // - If the whole text is JSON, parse it
  // - Else find the first {...} block that parses
  const candidates: string[] = [];

  const trimmed = text.trim();
  candidates.push(trimmed);

  // Heuristic: attempt to extract JSON blocks
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    candidates.push(trimmed.slice(start, end + 1));
  }

  for (const c of candidates) {
    try {
      const j = JSON.parse(c);

      if (j?.version !== "d8_patch_v1") continue;
      if (!isNonEmptyString(j?.projectId)) continue;
      if (!isNonEmptyString(j?.title)) continue;
      if (!Array.isArray(j?.files) || j.files.length < 1) continue;

      const files = j.files.map((f: any) => {
        if (!isNonEmptyString(f?.path)) throw new Error("files[].path missing");
        if (typeof f?.content !== "string") throw new Error("files[].content must be string");

        return {
          path: normalizeRepoRel(String(f.path)),
          content: String(f.content),
        };
      });

      // Enforce uniqueness
      const seen = new Set<string>();
      for (const f of files) {
        if (seen.has(f.path)) throw new Error(`Duplicate file path: ${f.path}`);
        seen.add(f.path);
      }

      const pack: D8PatchPack = {
        version: "d8_patch_v1",
        projectId: String(j.projectId),
        title: String(j.title),
        note: isNonEmptyString(j.note) ? String(j.note) : undefined,
        files,
      };

      return pack;
    } catch {
      // ignore
    }
  }

  return null;
}

export function makePatchWriterInstruction(projectId: string) {
  return `
You are "05_patch_writer". Produce a STRICT JSON patch pack ONLY.

Return ONLY valid JSON (no markdown, no commentary).

Schema:
{
  "version": "d8_patch_v1",
  "projectId": "${projectId}",
  "title": "short title",
  "note": "optional",
  "files": [
    {
      "path": "repo-relative path like src/app/....ts(x)",
      "content": "FULL file contents, complete replacement"
    }
  ]
}

Rules:
- Use repo-relative paths ONLY (no absolute paths, no ../)
- contents must be complete file text
- If you are unsure, output an empty patch is NOT allowed: you must output at least 1 file.
`.trim();
}
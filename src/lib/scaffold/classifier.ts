import { SCAFFOLD_TEMPLATES, type ScaffoldTemplate } from "./templates";

export type { ScaffoldTemplate };

export function classifyIntent(prompt: string): string {
  const lower = prompt.toLowerCase();
  let bestId = "saas";
  let bestScore = 0;

  for (const t of SCAFFOLD_TEMPLATES) {
    let score = 0;
    for (const kw of t.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (lower.includes(t.category.toLowerCase())) {
      score += 10;
    }
    if (score > bestScore) {
      bestScore = score;
      bestId = t.id;
    }
  }

  return bestId;
}

export function getScaffold(id: string): ScaffoldTemplate | null {
  return SCAFFOLD_TEMPLATES.find((t) => t.id === id) ?? null;
}

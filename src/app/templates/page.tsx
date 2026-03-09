import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES } from "@/lib/marketing/catalog";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Premium templates, ready to ship. Pick a direction and generate a complete site.",
};

export default function TemplatesPage() {
  return (
    <div className="section">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Premium templates, ready to ship
        </h1>
        <p className="mt-3 text-white/60 max-w-lg mx-auto">
          Pick a direction. The system generates a complete site from your
          brief — then polishes it into something that looks expensive.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {TEMPLATES.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="card group hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="pill text-[10px]">{t.category}</span>
              <span className="pill text-[10px]">{t.vibe}</span>
            </div>
            <h2 className="text-lg font-bold group-hover:text-white transition-colors">
              {t.name}
            </h2>
            <p className="text-sm text-white/60 mt-1 leading-relaxed">
              {t.description}
            </p>
            <ul className="mt-3 space-y-1">
              {t.bullets.map((b) => (
                <li key={b} className="text-xs text-white/45">
                  &bull; {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}

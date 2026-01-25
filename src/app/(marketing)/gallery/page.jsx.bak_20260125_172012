import {
  PageHeader,
  SectionHeader,
  LogoCloud,
  GalleryFilters,
  ShowcaseCard,
} from "../../../components/marketing/MarketingShell";
import { showcaseSites } from "../../../lib/marketing/galleryData";

export default function GalleryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="Generated site showcases"
        subtitle="These are curated outputs that follow premium SaaS rhythm: clean hierarchy, trust signals, strong CTAs. Next step: wire this to real published projects."
        rightSlot={
          <a
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm"
            href="/p/new"
          >
            Generate my site
          </a>
        }
      />

      <LogoCloud label="Premium structure that converts" />

      <div className="mx-auto max-w-6xl px-6 pb-6">
        <div className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-600">Filter</div>
          <div className="mt-3">
            <GalleryFilters />
          </div>
          <div className="mt-3 text-xs text-slate-500">
            (UI-only for now. Next upgrade: URL query filtering + tags.)
          </div>
        </div>
      </div>

      <SectionHeader
        eyebrow="Showcases"
        title="Pick a vibe — then generate yours"
        subtitle="Each card is a pattern. Your content + brand makes it unique."
        linkText="Explore templates"
        linkHref="/templates"
      />

      <div className="mx-auto max-w-6xl px-6 pt-8 pb-14">
        <div className="grid gap-5 md:grid-cols-3">
          {showcaseSites.map((s) => (
            <ShowcaseCard
              key={s.id}
              title={s.title}
              template={s.template}
              tags={s.tags}
              outcome={s.outcome}
              accent={s.accent}
              href={s.href}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-slate-900 p-10 text-white shadow-sm">
          <div className="text-xs text-white/70">Next step</div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Turn this gallery into real published projects
          </h3>
          <p className="mt-3 text-sm text-white/75">
            Next upgrade can connect this page to your KV keys (published specs / HTML) and render real previews.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/p/new"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90"
            >
              Generate my site
            </a>
            <a
              href="/__status"
              className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
            >
              Check deploy status
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

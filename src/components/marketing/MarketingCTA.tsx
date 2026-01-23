import Link from "next/link";

export default function MarketingCTA(props: {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const title = props.title ?? "Ready to ship your next site?";
  const subtitle =
    props.subtitle ??
    "Generate a complete marketing site + SEO plan, then publish in minutes.";
  const primaryHref = props.primaryHref ?? "/sign-up";
  const primaryLabel = props.primaryLabel ?? "Start free";
  const secondaryHref = props.secondaryHref ?? "/projects";
  const secondaryLabel = props.secondaryLabel ?? "Open dashboard";

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm opacity-80">{subtitle}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={primaryHref}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-2xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

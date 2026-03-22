import Link from "next/link";

function Card(props: { title: string; desc: string; href: string; cta: string; accent?: boolean }) {
  return (
    <Link
      href={props.href}
      className="block rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
      style={props.accent ? { borderColor: "rgba(168,85,247,0.3)", background: "linear-gradient(180deg, rgba(168,85,247,0.06), rgba(59,130,246,0.03))" } : undefined}
    >
      <div className="text-lg font-semibold tracking-tight">{props.title}</div>
      <div className="mt-2 text-sm text-white/60">{props.desc}</div>
      <div className="mt-5 inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">
        {props.cta} →
      </div>
    </Link>
  );
}

function StatCard(props: { label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[11px] text-white/50">{props.label}</div>
      <div className="mt-1 text-sm font-semibold">{props.value}</div>
      <div className="mt-2 text-[11px]" style={{ color: props.color || "rgba(255,255,255,0.6)" }}>{props.sub}</div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* HERO HEADER */}
      <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
        <div className="text-xs font-semibold tracking-wide text-white/60">DOMINAT8 COMMAND CENTER</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Your AI website factory
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          Build, optimize, and dominate. Everything you need to generate, publish, and grow premium websites — powered by AI.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <StatCard label="Status" value="All Systems GO" sub="GREEN" color="rgba(74,222,128,0.8)" />
          <StatCard label="Websites Built" value="0" sub="Start building" />
          <StatCard label="Auto-Pilot" value="Ready" sub="AI optimization engine" />
          <StatCard label="Market Intel" value="Active" sub="8 competitors tracked" />
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="text-sm font-semibold mb-4">Quick Actions</div>
        <div className="flex gap-3 flex-wrap">
          <Link href="/builder" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-black" style={{ background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))" }}>
            Build New Site →
          </Link>
          <Link href="/admin/intelligence" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10">
            Market Intel
          </Link>
          <Link href="/admin/autopilot" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10">
            Run Auto-Pilot
          </Link>
          <Link href="/admin/starter-kits" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10">
            Starter Kits
          </Link>
        </div>
      </div>

      {/* CORE TOOLS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title="AI Website Builder"
          desc="Generate complete websites from a prompt. Instant or Premium mode."
          href="/builder"
          cta="Open Builder"
          accent
        />
        <Card
          title="Projects"
          desc="Manage generated sites, publish, and view status."
          href="/admin/projects"
          cta="Open Projects"
        />
        <Card
          title="AI Agents"
          desc="Run strict bundles and apply safe patches."
          href="/admin/agents"
          cta="Open Agents"
        />
        <Card
          title="Domains"
          desc="Custom domain status + verification checklist."
          href="/admin/domains"
          cta="Open Domains"
        />
        <Card
          title="Billing"
          desc="Plans and Stripe integration surface."
          href="/admin/billing"
          cta="Open Billing"
        />
        <Card
          title="Settings"
          desc="Account preferences and configuration."
          href="/admin/settings"
          cta="Open Settings"
        />
      </div>

      {/* GROWTH TOOLS */}
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60 mb-4">GROWTH &amp; INTELLIGENCE</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Market Intelligence"
            desc="Track competitors, discover trends, find market gaps. 8 competitors monitored."
            href="/admin/intelligence"
            cta="Open Intel"
            accent
          />
          <Card
            title="AI Auto-Pilot"
            desc="AI agents optimize your sites overnight — SEO, performance, accessibility."
            href="/admin/autopilot"
            cta="Open Auto-Pilot"
          />
          <Card
            title="Business Chat"
            desc="Context-aware AI assistant for all your business operations."
            href="/admin/business-chat"
            cta="Open Chat"
          />
          <Card
            title="Starter Kits"
            desc="One-click business setup: website + SEO + emails + social in 5 minutes."
            href="/admin/starter-kits"
            cta="Browse Kits"
          />
          <Card
            title="Marketing Queue"
            desc="Schedule and manage marketing content generation."
            href="/admin/marketing-queue"
            cta="Open Queue"
          />
          <Card
            title="Cockpit"
            desc="Operational cockpit and system monitoring."
            href="/admin/cockpit"
            cta="Open Cockpit"
          />
        </div>
      </div>
    </div>
  );
}

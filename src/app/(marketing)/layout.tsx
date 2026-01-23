import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dominat8 — AI Website Builder that ships",
  description:
    "Generate a complete website + SEO plan in minutes. Publish fast. Iterate with AI agents.",
  metadataBase: new URL("https://www.dominat8.com"),
};

function NavLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="text-sm opacity-80 hover:opacity-100 transition"
    >
      {props.children}
    </Link>
  );
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-semibold tracking-tight">
            Dominat8<span className="opacity-60">.com</span>
          </Link>

          <nav className="flex items-center gap-4">
            <NavLink href="/templates">Templates</NavLink>
            <NavLink href="/use-cases">Use cases</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <a
              href="/sign-in"
              className="rounded-xl border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 transition"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm opacity-70">
              © {new Date().getFullYear()} Dominat8. Build fast. Ship faster.
            </div>
            <div className="flex gap-4 text-sm opacity-70">
              <Link href="/templates" className="hover:opacity-100">Templates</Link>
              <Link href="/use-cases" className="hover:opacity-100">Use cases</Link>
              <Link href="/pricing" className="hover:opacity-100">Pricing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

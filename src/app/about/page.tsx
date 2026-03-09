import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dominat8 is an AI website automation builder for generating, optimizing, and publishing high-converting websites.",
};

export default function AboutPage() {
  return (
    <div className="section">
      <h1 className="text-3xl font-black tracking-tight">About Dominat8</h1>
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
        Dominat8 helps you build and ship websites faster using AI agents.
        Generate a complete site foundation, run SEO + conversion passes, then
        publish to your custom domain.
      </p>

      <h2 className="text-xl font-bold mt-12">What we focus on</h2>
      <ul className="mt-4 space-y-3 text-white/70">
        <li><strong className="text-white">Speed:</strong> get from idea to published site fast</li>
        <li><strong className="text-white">Growth:</strong> SEO structure, metadata, and conversion-first pages</li>
        <li><strong className="text-white">Automation:</strong> repeatable agent-driven workflows</li>
        <li><strong className="text-white">Quality:</strong> clean output that&apos;s easy to refine and publish</li>
      </ul>

      <div className="mt-12">
        <Link className="btn btn-primary" href="/templates">
          Start building
        </Link>
      </div>
    </div>
  );
}

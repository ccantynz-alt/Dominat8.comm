import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Dominat8 team.",
};

export default function ContactPage() {
  return (
    <div className="section max-w-2xl mx-auto">
      <h1 className="text-3xl font-black tracking-tight">Talk to the team</h1>
      <p className="mt-3 text-white/60 leading-relaxed">
        Tell us what you&apos;re building and we&apos;ll point you to the
        fastest path to a premium launch.
      </p>

      <div className="grid gap-6 mt-10">
        <div className="card">
          <p className="text-[10px] font-black tracking-[0.14em] uppercase text-white/50">
            Email
          </p>
          <p className="text-lg font-bold mt-2">support@dominat8.com</p>
          <p className="text-sm text-white/60 mt-1">
            We aim to reply within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link className="btn btn-primary" href="/templates">
          Start building
        </Link>
      </div>
    </div>
  );
}

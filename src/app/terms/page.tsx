import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Dominat8 terms of service.",
};

export default function TermsPage() {
  return (
    <div className="section max-w-3xl mx-auto prose prose-invert">
      <h1 className="text-3xl font-black tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-white/70 leading-relaxed">
        By using Dominat8, you agree to these terms. This page will be updated
        with our full terms of service. The platform is provided as-is while
        in early access.
      </p>
      <p className="mt-4 text-white/50 text-sm">
        Last updated: {new Date().getFullYear()}
      </p>
    </div>
  );
}

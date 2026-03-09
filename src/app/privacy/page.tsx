import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Dominat8 privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="section max-w-3xl mx-auto prose prose-invert">
      <h1 className="text-3xl font-black tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-white/70 leading-relaxed">
        Your privacy matters. This page will be updated with our full privacy
        policy. In the meantime, we collect minimal data needed to operate
        the service and never sell your information to third parties.
      </p>
      <p className="mt-4 text-white/50 text-sm">
        Last updated: {new Date().getFullYear()}
      </p>
    </div>
  );
}

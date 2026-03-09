import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/marketing/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Dominat8: AI website generation, SEO, publishing, and domains.",
};

export default function FaqPage() {
  return (
    <div className="section max-w-3xl mx-auto">
      <h1 className="text-3xl font-black tracking-tight">FAQ</h1>
      <p className="mt-3 text-white/60">
        Quick answers about how Dominat8 works.
      </p>

      <dl className="mt-10 space-y-8">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q}>
            <dt className="text-lg font-bold">{item.q}</dt>
            <dd className="mt-2 text-white/70 leading-relaxed">{item.a}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <p className="text-white/60">
          Still have questions?{" "}
          <Link href="/contact" className="text-accent-purple hover:underline">
            Get in touch
          </Link>{" "}
          or{" "}
          <Link href="/templates" className="text-accent-purple hover:underline">
            start free
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

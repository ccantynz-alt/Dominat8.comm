import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dominat8.com"),
  title: {
    default: "Dominat8 — Dominate or Be Dominated",
    template: "%s — Dominat8",
  },
  description:
    "AI-powered website builder for agencies and developers who refuse to lose. Build in 90 seconds. Deploy in 5. No excuses.",
  applicationName: "Dominat8",
  openGraph: {
    type: "website",
    url: "https://www.dominat8.com",
    siteName: "Dominat8",
    title: "Dominat8 — Dominate or Be Dominated",
    description:
      "Your competitors are already using AI. 90 seconds to live. 5 seconds to deploy.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dominat8" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominat8 — Dominate or Be Dominated",
    description:
      "Your competitors are already using AI. 90 seconds to live. 5 seconds to deploy.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

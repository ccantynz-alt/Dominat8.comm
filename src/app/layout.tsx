import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dominat8 — The WOW website builder",
    template: "%s — Dominat8",
  },
  description:
    "The WOW website builder. Built by AI. Shipped fast. Generate premium sites and publish with confidence.",
  metadataBase: new URL("https://www.dominat8.com"),
  applicationName: "Dominat8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

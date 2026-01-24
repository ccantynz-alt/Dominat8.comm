// src/components/marketing/LuxuryShell.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function LuxuryShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grounded, premium background (no neon, no 'cyber') */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Soft sunrise wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.10),transparent_55%)]" />
        {/* Subtle warm vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_50%)]" />
        {/* Quiet texture grid (wider, calmer) */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
        {/* Bottom fade for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function HeroGlow({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "40%");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      el.style.setProperty("--mx", (x * 100).toFixed(2) + "%");
      el.style.setProperty("--my", (y * 100).toFixed(2) + "%");
      el.classList.add("glow-active");
    };

    const onLeave = () => {
      el.classList.remove("glow-active");
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "40%");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={"glow-wrap " + className}>
      {children}
    </div>
  );
}

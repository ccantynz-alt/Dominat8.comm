"use client";

import { useEffect, useRef } from "react";

/**
 * HeroGlow
 * - Tracks pointer position inside the wrapper and updates CSS vars:
 *   --d8-mx, --d8-my (percent)
 * - CSS uses those vars to position radial gradients = real cursor-follow glow.
 * - Safe + tiny: no deps, pointer events only.
 */
export default function HeroGlow({ className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Default center (useful for touch/mobile)
    el.style.setProperty("--d8-mx", "50%");
    el.style.setProperty("--d8-my", "40%");

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      el.style.setProperty("--d8-mx", (x * 100).toFixed(2) + "%");
      el.style.setProperty("--d8-my", (y * 100).toFixed(2) + "%");
      el.classList.add("d8-glow-active");
    };

    const onLeave = () => {
      el.classList.remove("d8-glow-active");
      // ease back toward a nice "hero" spot
      el.style.setProperty("--d8-mx", "50%");
      el.style.setProperty("--d8-my", "40%");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={"d8-glow-wrap d8-glow-true " + className}>
      {children}
    </div>
  );
}

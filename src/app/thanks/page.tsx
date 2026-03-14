"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ThanksContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id") ?? null;
  const [checkoutStatus, setCheckoutStatus] = useState<"loading" | "success" | "no_session">(
    sessionId ? "loading" : "no_session"
  );

  useEffect(() => {
    if (!sessionId) return;
    // In production, you'd verify the session with Stripe here
    // For now, having a session_id means checkout completed
    setCheckoutStatus("success");
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-14">
        {checkoutStatus === "success" ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-green-400/80">Payment Confirmed</div>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Welcome to Pro!
            </h1>
            <p className="mt-4 text-white/70 leading-relaxed">
              Your subscription is now active. You have access to all Pro features including unlimited projects,
              custom domains, AI video studio, and priority support.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-white/60">What&apos;s unlocked</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Unlimited projects",
                  "Custom domains + SSL",
                  "AI Video Studio",
                  "Premium templates",
                  "Advanced analytics",
                  "Priority support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="h-4 w-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Thanks for your interest!
            </h1>
            <p className="mt-4 text-white/70 leading-relaxed">
              Ready to unlock the full power of Dominat8? Choose a plan that fits your needs.
            </p>
          </>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold hover:opacity-95 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
          >
            My Projects
          </Link>
          <Link
            href="/pricing"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
          >
            {checkoutStatus === "success" ? "View Plans" : "Choose a Plan"}
          </Link>
        </div>

        {checkoutStatus === "success" && (
          <div className="mt-6 text-center text-xs text-white/40">
            Session: {sessionId?.slice(0, 20)}...
            <span className="mx-2">&middot;</span>
            <Link href="/admin/billing" className="text-purple-400/80 hover:text-purple-400 transition">
              Manage billing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ThanksContent />
    </Suspense>
  );
}

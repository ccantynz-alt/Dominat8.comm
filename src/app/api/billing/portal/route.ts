import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2023-10-16" as any });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const customerId = body?.customerId;

  if (!customerId) {
    return NextResponse.json(
      { ok: false, error: "customerId is required" },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.nextUrl.origin}/admin/billing`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Portal session failed" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2023-10-16" as any });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const priceId = body?.priceId;
  const returnUrl = body?.returnUrl ?? `${req.nextUrl.origin}/thanks`;

  if (!priceId) {
    return NextResponse.json({ ok: false, error: "priceId is required" }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/pricing`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Stripe checkout failed" },
      { status: 500 }
    );
  }
}

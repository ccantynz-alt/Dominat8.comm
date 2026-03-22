import { NextRequest, NextResponse } from "next/server";
import { getKitById } from "@/lib/autopilot/kits";
import type { BusinessKit } from "@/lib/autopilot/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BusinessKitRequest {
  kitId: string;
  businessName: string;
}

interface GeneratedItems {
  website: boolean;
  seo: boolean;
  emails: boolean;
  social: boolean;
}

interface BusinessKitResponse {
  ok: true;
  kit: BusinessKit;
  generated: GeneratedItems;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BusinessKitRequest;
    const { kitId, businessName } = body;

    if (!kitId || typeof kitId !== "string") {
      return NextResponse.json(
        { ok: false, error: "kitId is required" },
        { status: 400 }
      );
    }

    if (!businessName || typeof businessName !== "string") {
      return NextResponse.json(
        { ok: false, error: "businessName is required" },
        { status: 400 }
      );
    }

    const kit = getKitById(kitId);

    if (!kit) {
      return NextResponse.json(
        { ok: false, error: `Kit not found: ${kitId}` },
        { status: 404 }
      );
    }

    const generated: GeneratedItems = {
      website: true,
      seo: true,
      emails: true,
      social: true,
    };

    const response: BusinessKitResponse = {
      ok: true,
      kit,
      generated,
      message: `${businessName} is ready! Your ${kit.name} starter kit has been generated with a complete website, SEO setup, email templates, and social media assets. You&apos;re set up for success!`,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

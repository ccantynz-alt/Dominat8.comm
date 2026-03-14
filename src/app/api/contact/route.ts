import { NextRequest, NextResponse } from "next/server";
import { kvGetJson, kvSetJson } from "@/lib/d8kv";

const CONTACTS_KEY = "d8:contacts";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 400 }
    );
  }

  const submission: ContactSubmission = {
    id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name.slice(0, 200),
    email: body.email.slice(0, 200),
    message: body.message.slice(0, 5000),
    createdAt: new Date().toISOString(),
  };

  const existing = (await kvGetJson<ContactSubmission[]>(CONTACTS_KEY)) ?? [];
  existing.push(submission);
  // Keep only the last 500 submissions
  const trimmed = existing.slice(-500);
  await kvSetJson(CONTACTS_KEY, trimmed);

  return NextResponse.json({ ok: true, id: submission.id });
}

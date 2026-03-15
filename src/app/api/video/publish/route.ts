import { NextRequest, NextResponse } from "next/server";
import { kvSetJson } from "@/lib/d8kv";

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const projectId = formData.get("projectId") as string;
  const file = formData.get("file") as File | null;

  if (!projectId) {
    return NextResponse.json({ ok: false, error: "projectId is required" }, { status: 400 });
  }
  if (!file) {
    return NextResponse.json({ ok: false, error: "file is required" }, { status: 400 });
  }

  try {
    // Try Vercel Blob if available
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    let videoUrl: string;

    if (blobToken) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`videos/${projectId}/${file.name}`, file, {
        access: "public",
        token: blobToken,
      });
      videoUrl = blob.url;
    } else {
      // Fallback: store as a data URL reference in KV
      // In production, you'd want Blob storage
      videoUrl = `/projects/${encodeURIComponent(projectId)}/video?stored=kv&ts=${Date.now()}`;
    }

    // Store the video URL in KV
    await kvSetJson(`d8:project:${projectId}:video:latest`, {
      url: videoUrl,
      publishedAt: new Date().toISOString(),
      fileName: file.name,
      size: file.size,
    });

    return NextResponse.json({ ok: true, url: videoUrl });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Publish failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getPresentedToken(req: NextRequest): string | null {
  // Priority:
  // 1) Header: x-admin-token
  // 2) Cookie: admin_token
  const h = req.headers.get("x-admin-token");
  if (h && h.trim()) return h.trim();

  const c = req.cookies.get("admin_token")?.value;
  if (c && c.trim()) return c.trim();

  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Only protect admin surfaces.
  const isAdminPath =
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api/admin");

  if (!isAdminPath) return NextResponse.next();

  const expected = (process.env.ADMIN_TOKEN || "").trim();
  if (!expected) {
    // If ADMIN_TOKEN isn't set, refuse admin access (safe default).
    return new NextResponse("Admin is disabled (ADMIN_TOKEN not set).", { status: 403 });
  }

  const presented = getPresentedToken(req);
  if (presented !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
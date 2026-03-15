import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/projects(.*)",
  "/api/billing(.*)",
  "/api/domains(.*)",
  "/api/video(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const p = (req as NextRequest).nextUrl.pathname;

  // Anti-cache headers for probe endpoints
  if (p === "/__probe__" || p === "/api/__probe__") {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, max-age=0");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  }

  // Protect admin and API routes - redirect to sign-in if not authenticated
  if (isProtectedRoute(req as NextRequest)) {
    const { userId } = auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", (req as NextRequest).url);
      signInUrl.searchParams.set("redirect_url", (req as NextRequest).url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

export const runtime = "nodejs";

import { redirect } from "next/navigation";

/**
 * (marketing) group root page
 * This exists to ensure Next generates the client reference manifest for the route group,
 * preventing Vercel trace errors like:
 *   ENOENT ... /.next/server/app/(marketing)/page_client-reference-manifest.js
 *
 * We redirect to the main homepage ("/") for now.
 */
export default function MarketingGroupRootPage() {
  redirect("/");
}

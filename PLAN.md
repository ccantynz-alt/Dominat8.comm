# DOMINAT8.COM - FULL REBUILD PLAN

## ROOT CAUSE: WHY THE SITE IS 404/403

The site is DOWN because **Vercel builds are failing**. No successful deployment = no site. Here are ALL the build-breaking issues:

---

## PHASE 1: CRITICAL BUILD FIXES (Get the site LIVE)

### 1.1 Duplicate Route Conflicts (FATAL)
Next.js cannot have both `.tsx` AND `.jsx` for the same route. These DUPLICATE routes crash the build:
- `src/app/page.tsx` + `src/app/page.jsx` → CONFLICT at `/`
- `src/app/(marketing)/faq/page.tsx` + `page.jsx` → CONFLICT at `/faq`
- `src/app/(marketing)/pricing/page.tsx` + `page.jsx` → CONFLICT at `/pricing`
- `src/app/(marketing)/templates/page.tsx` + `page.jsx` → CONFLICT at `/templates`
- `src/app/(marketing)/use-cases/page.tsx` + `page.jsx` → CONFLICT at `/use-cases`

**FIX:** Remove ALL `.jsx` duplicates, keep the `.tsx` versions (TypeScript = superior).

### 1.2 Intentional Broken Import on Home Page (FATAL)
`src/app/page.tsx` line 4 imports `AutoRepairDemoWidget` which DOES NOT EXIST.
**FIX:** Remove the demo import. Ship real code, not demos.

### 1.3 Syntax Error in Probe API Route (FATAL)
`src/app/api/__probe__/route.ts` line 7: `try: any {` is invalid TypeScript.
**FIX:** Change to `try {`

### 1.4 Syntax Error in D8TV Component (FATAL)
`src/app/_client/D8TV.tsx` has orphaned type annotations inside function body.
**FIX:** Remove the stray type annotations.

### 1.5 Async Client Component (FATAL)
`src/app/admin/projects/page.tsx` is marked `"use client"` but uses `async function`.
**FIX:** Remove `"use client"` (make it server component) or remove `async`.

### 1.6 ESLint Rule Error
`src/lib/kv.ts` references non-existent ESLint rule.
**FIX:** Remove the eslint-disable comment.

---

## PHASE 2: SITE QUALITY & POLISH (Make it #1)

### 2.1 Home Page - World-Class Hero
### 2.2 Marketing Pages - All routes functional
### 2.3 Gallery - Real template showcase
### 2.4 SEO - robots.ts, sitemap.ts, OG images
### 2.5 Admin Dashboard - Functional cockpit
### 2.6 Performance - Core Web Vitals optimization

---

## PHASE 3: APP BUILDER FEATURES

### 3.1 AI Website Builder flow
### 3.2 Template system
### 3.3 Project management
### 3.4 Publishing pipeline

---

## EXECUTION ORDER
1. Fix ALL build errors (Phase 1) → Deploy → Site goes LIVE
2. Then iterate on quality (Phase 2-3)

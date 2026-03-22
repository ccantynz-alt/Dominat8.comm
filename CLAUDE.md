# Dominat8.com — CLAUDE.md

## Project Overview
Dominat8 is an AI-powered website builder/factory. The stack is Next.js 14 (App Router) + Tailwind CSS v4 + TypeScript, deployed on Vercel. Auth via Clerk, payments via Stripe, data via Vercel KV, storage via Vercel Blob, AI via OpenAI.

## Build & Dev Commands
- `npm run dev` — local dev server
- `npm run build` — production build (strict locally, lenient on Vercel)
- `npm run lint` — ESLint
- `npm start` — serve production build

## Architecture
- **App Router**: All pages under `src/app/`
- **Route Groups**: `(marketing)` for public pages, `admin` for dashboard
- **Components**: `src/components/` (marketing/, dxl/, admin/, terminal/)
- **Lib**: `src/lib/` (marketing/, admin/, agents/, engine/, ace/, domains/)
- **Styling**: Tailwind CSS + inline fallback styles in root layout (crash-safe)
- **DXL System**: Dominat8 eXtended Layer — atmosphere, toasts, status pill, world pulse

## Path Aliases
- `@/*` resolves to `./src/*` and `./`

## Critical Rules
1. **NO duplicate route files** — never have both `.tsx` and `.jsx` for the same route
2. **NO "use client" on async components** — client components cannot be async in Next.js
3. **TypeScript strict mode** — all code must compile without type errors
4. **Inline fallback styles** — the root layout has CSS-in-JS fallbacks so the app renders even if Tailwind fails
5. **Build must pass locally** before pushing — `npm run build` must exit 0
6. **Disabled/archived code** lives in `_archive/`, `._app_disabled/`, `.d8_bak/` — these are excluded from tsconfig and eslint

## Excluded Directories (do NOT modify or import from)
- `_archive/**`
- `._app_disabled/**`
- `_app_disabled/**`
- `.d8_bak/**`
- `BOOTSTRAP/**`
- `disabled_projects/**`
- `disabled_runs/**`
- `pages__DISABLED/**`

## Key Files
- `src/app/layout.tsx` — Root layout with DXL atmosphere and fallback styles
- `src/app/page.tsx` — Home page (inline-styled, Tailwind-safe)
- `src/app/(marketing)/layout.tsx` — Marketing SEO metadata
- `middleware.ts` — Probe endpoint handling
- `next.config.js` — Skips lint/typecheck on Vercel, strict locally
- `vercel.json` — Build config for Vercel

## Deployment
- Platform: Vercel
- Branch: main (production)
- Build: `npm run build`
- Domain: dominat8.com / www.dominat8.com

## Environment Variables Required
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk auth
- `CLERK_SECRET_KEY` — Clerk server
- `KV_REST_API_URL` — Vercel KV
- `KV_REST_API_TOKEN` — Vercel KV
- `STRIPE_SECRET_KEY` — Stripe payments
- `OPENAI_API_KEY` — AI features

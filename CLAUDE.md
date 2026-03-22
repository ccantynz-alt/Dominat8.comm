# Dominat8.com — CLAUDE.md

## Project Overview
Dominat8 is an AI-powered website builder/factory that generates, optimizes, and publishes high-converting websites. The stack is Next.js 14 (App Router) + Tailwind CSS v4 + TypeScript, deployed on Vercel. Auth via Clerk, payments via Stripe, data via Vercel KV, storage via Vercel Blob, AI via OpenAI.

## Build & Dev Commands
- `npm run dev` — local dev server
- `npm run build` — production build (strict locally, lenient on Vercel)
- `npm run lint` — ESLint
- `npm start` — serve production build

## Architecture
- **App Router**: All pages under `src/app/`
- **Route Groups**: `(marketing)` for public pages, `admin` for dashboard
- **Components**: `src/components/` (marketing/, dxl/, admin/, terminal/, builder/)
- **Lib**: `src/lib/` (marketing/, admin/, agents/, engine/, ace/, domains/, scaffold/, intelligence/, autopilot/)
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
7. **Escape JSX entities** — use `&apos;` `&quot;` `&ldquo;` `&rdquo;` instead of raw quotes in JSX text

## Excluded Directories (do NOT modify or import from)
- `_archive/**`
- `._app_disabled/**`
- `_app_disabled/**`
- `.d8_bak/**`
- `BOOTSTRAP/**`
- `disabled_projects/**`
- `disabled_runs/**`
- `pages__DISABLED/**`

## Product Architecture

### Core Product: AI Website Builder (`/builder`)
- **Instant Mode** (3s): 15 pre-built scaffold templates matched via intent classifier
- **Premium Mode** (AI): Full OpenAI-powered generation with custom prompts
- **Framework Support**: HTML, React, Next.js output modes
- **App Templates**: SaaS Dashboard, CRM, Project Manager, Analytics Dashboard
- **Scaffold Engine**: `src/lib/scaffold/` — templates, classifier, app templates

### Marketing Pages (`/src/app/(marketing)/`)
- **BUILT**: Home `/`, About `/about`, FAQ `/faq`, Pricing `/pricing`, Templates `/templates`, Use Cases `/use-cases`, Gallery `/gallery`, Contact `/contact`, Privacy `/privacy`, Terms `/terms`
- **SEO**: Complete sitemap.ts (10 routes), robots.ts, OpenGraph metadata, structured data (JSON-LD)
- **404 Page**: Custom branded not-found page

### Admin Dashboard (`/admin`)
- **Command Center**: `/admin` — unified dashboard with quick actions and stats
- **Projects**: `/admin/projects` — manage generated sites
- **Agents**: `/admin/agents` — AI agent control panel
- **Domains**: `/admin/domains` — custom domain management
- **Billing**: `/admin/billing` — Stripe integration surface
- **Settings**: `/admin/settings` — account preferences
- **Marketing Queue**: `/admin/marketing-queue` — content scheduling
- **Cockpit**: `/admin/cockpit` — system monitoring

### Intelligence Engine (`/admin/intelligence`)
- **Competitor Tracking**: 8 competitors monitored (Lovable, Bolt, v0, Framer, Webflow, Wix, Squarespace, WordPress)
- **Market Trends**: Trend discovery and tracking system
- **Crawl API**: `/api/intelligence/crawl` — competitor data collection
- **Trends API**: `/api/intelligence/trends` — market trend data
- **Lib**: `src/lib/intelligence/` — types, competitors, trends

### AI Auto-Pilot (`/admin/autopilot`)
- **Optimization**: SEO, performance, accessibility, content improvement
- **API**: `/api/autopilot/optimize` — run optimization tasks
- **Lib**: `src/lib/autopilot/` — types, kits

### Business Starter Kits (`/admin/starter-kits`)
- **8 Kits**: Photographer, Restaurant, Consultant, Fitness, Real Estate, Dentist, Lawyer, Coach
- **One-Click Launch**: Website + SEO + Emails + Social in 5 minutes
- **API**: `/api/business-kit` — kit generation endpoint

### AI Business Chat (`/admin/business-chat`)
- **Context-Aware Assistant**: Chat interface for business operations
- **Quick Actions**: SEO improvement, competitor analysis, content generation, traffic analysis

### API Routes (`/src/app/api/`)
- `POST /api/generate/instant` — Instant scaffold generation
- `POST /api/generate/premium` — Premium AI generation (OpenAI)
- `POST /api/intelligence/crawl` — Competitor crawling
- `GET /api/intelligence/trends` — Market trends
- `POST /api/autopilot/optimize` — AI optimization
- `POST /api/business-kit` — Business kit generation
- `GET /api/__probe__` — Health check
- `POST /api/__d8__/agent-runs` — Agent run logging

## Key Files
- `src/app/layout.tsx` — Root layout with DXL atmosphere and fallback styles
- `src/app/page.tsx` — Home page (inline-styled, crash-safe)
- `src/app/builder/page.tsx` — AI Website Builder
- `src/app/admin/page.tsx` — Admin Command Center
- `src/app/(marketing)/layout.tsx` — Marketing SEO metadata
- `middleware.ts` — Probe endpoint handling
- `next.config.js` — Skips lint/typecheck on Vercel, strict locally
- `vercel.json` — Build config for Vercel

## Competitive Positioning
- **vs Lovable** ($6.6B): Dominat8 offers instant scaffolding (3s vs 95s), business starter kits, market intelligence
- **vs Bolt/v0**: Full business OS vs code-only output
- **vs Webflow/Framer**: AI-first generation vs manual drag-and-drop
- **vs Wix/Squarespace**: Developer-grade output vs template limitations

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
- `OPENAI_API_KEY` — AI features (Premium mode)

# CLAUDE.md — Dominat8 Master Guide
### Separate codebase. Separate brand. Same engine as Zoobicon underneath.

---

> **HOW TO USE THIS FILE EVERY MORNING:**
> 1. Scroll to CURRENT STATUS at the very bottom
> 2. Read the "Next action" line
> 3. Open a new Claude session, paste this whole file, say:
>    *"I'm working on Dominat8. Here is my CLAUDE.md. Continue from where I left off."*
> 4. Claude will know everything. No explanation needed.

---

## WHAT DOMINAT8 IS

Dominat8 is a **separate product** from Zoobicon. Separate GitHub repo. Separate Vercel project. Separate Supabase database. Separate brand. The AI engine underneath is forked from Zoobicon — same 7-agent pipeline, same Opus quality, same stack — but everything the customer sees is pure Dominat8.

**The two products serve completely different markets:**

| | Zoobicon | Dominat8 |
|---|---|---|
| Audience | SMBs, small businesses, friendly | Agencies, developers, power users |
| Tone | Approachable, helpful, clean | Aggressive, bold, confrontational |
| Message | "We make this easy for you" | "Dominate or be dominated" |
| Price | Same tiers | Same tiers, positioned as premium |
| Feel | A helpful business partner | A weapon |

**Customers never know the two are related. That is intentional.**

---

## THE TWO DOMINAT8 DOMAINS

| Domain | Role | What It Does |
|---|---|---|
| dominat8.com | The killer marketing machine | Shock and awe landing page. Makes visitors feel they're falling behind. Converts hard. Funnels to dominat8.io. |
| dominat8.io | The AI builder product | The actual product. Technical, fast, no-nonsense. Powered by the Zoobicon engine underneath. |

---

## BRAND RULES — THIS IS WHAT MAKES DOMINAT8 DIFFERENT

**These rules override any default "clean and friendly" instincts. Dominat8 is a weapon.**

### Visual Identity
- Dark backgrounds always — near-black (#0a0a0a or #080808), never white or light grey
- Electric accent colour — choose ONE and own it: toxic green (#00ff41), electric blue (#0066ff), or hot red (#ff0022). NOT purple. Purple is Zoobicon's territory.
- Glitch effects on key moments — text glitch on hover, glitch transition between sections
- Heavy typography — display fonts only, 900 weight where possible
- Neon glow on CTAs and key elements — subtle, not garish
- Angular shapes, sharp edges — no soft rounded corners on hero elements
- Grid overlays, scanline textures — technical, almost military aesthetic

### Typography Rules
- Headlines: Minimum 5rem on desktop. Maximum aggression.
- Display font options: Space Grotesk Bold, Bebas Neue, Druk, or similar heavy condensed
- NO serif fonts anywhere
- Sentence fragments are fine: "Built to dominate." "No excuses." "Ship or die."
- Numbers and stats get oversized treatment — make them impossible to ignore

### Copy Tone — Forbidden and Mandatory

**NEVER use:**
- "Easy", "simple", "effortless"
- "We help you", "we support you"
- "Get started today"
- "Trusted by businesses worldwide"
- Anything apologetic or soft

**ALWAYS use:**
- Power verbs: crush, dominate, obliterate, outpace, destroy, win
- Direct address: "You're either ahead or you're behind."
- Competitive framing: "Your competitors are already using AI. Are you?"
- Hard metrics: "10,000 sites. 0 apologies." "Builds in 90 seconds. Deploys in 5."
- Urgency without desperation: "The market doesn't wait. Neither should you."

### Section Personalities

**Hero (dominat8.com):**
- Full dark viewport, electric accent colour bleeding in from edges
- ONE massive headline — confrontational, not welcoming
- Sub-headline with hard metric or competitive statement
- CTA button glows — impossible to miss
- Background: subtle animated grid or scanline effect, NOT particles

**Social proof:**
- No "Acme Corp" placeholders — ever
- Metrics must be specific: "23% more conversions in 30 days"
- Testimonials sound like victories, not thank-you notes

**Features section:**
- Frame every feature as a competitive weapon: "While your competitors manually build — you deploy in 90 seconds"
- Icons are sharp, angular — no rounded friendly icons
- Dark cards with electric accent borders on hover

**CTA sections:**
- Create urgency through competitive fear, not countdown timers
- "Every day you wait is a day your competitor gets ahead"

---

## TECH STACK — FORKED FROM ZOOBICON

**This is a fork, not a copy-paste.** The engine is identical but the repo is clean and independent. Any improvements made to Dominat8 do not automatically apply to Zoobicon and vice versa. They evolve separately.

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Same as Zoobicon |
| Deployment | Vercel — separate project | New Vercel project: dominat8 |
| Database | Supabase — separate instance | New Supabase project: dominat8 |
| AI — Core | Claude API (claude-sonnet-4-6) | Same models |
| AI — Pipeline | 7-agent pipeline (forked from Zoobicon) | Same agents, same Opus for builds |
| Email | Mailgun — separate domain | mg.dominat8.com sending domain |
| DNS | Cloudflare — existing account | dominat8.com + dominat8.io already active |
| Payments | Stripe — separate account or same | Separate products in Stripe |
| Styling | Tailwind CSS | Same, but dark theme by default |
| Components | shadcn/ui | Same library, dark variant |

**HARD RULES — same as Zoobicon:**
- No old technology. Ever.
- No static HTML output — React/Next.js components only
- Most advanced stack available at all times
- Opus for the Developer agent — non-negotiable
- No secrets committed to GitHub — zero tolerance

---

## FORK SETUP — HOW TO CREATE THE DOMINAT8 REPO

### Step 1 — Fork the Zoobicon repo
1. Go to github.com → your Zoobicon repo
2. Click the repo name dropdown → duplicate/fork to new repo named `dominat8`
3. Or: download Zoobicon codebase as ZIP → create new GitHub repo `dominat8` → upload

### Step 2 — Set up Vercel
1. Go to vercel.com → Add New Project
2. Import from GitHub → select `dominat8` repo
3. Project name: `dominat8`
4. Connect dominat8.com and dominat8.io as custom domains

### Step 3 — Set up Supabase
1. Go to supabase.com → New Project
2. Project name: `dominat8`
3. Copy the new `SUPABASE_URL` and `SUPABASE_ANON_KEY`
4. Run the same database migrations as Zoobicon

### Step 4 — Set up Mailgun sending domain
1. In Mailgun → Add Domain → `mg.dominat8.com`
2. Add DNS records in Cloudflare for dominat8.com
3. Test sending from `noreply@dominat8.com`

### Step 5 — Environment variables
Create `.env.local` in dominat8 repo with all new credentials:
```
NEXT_PUBLIC_SITE_URL=https://dominat8.io
ANTHROPIC_API_KEY=same as Zoobicon
OPENAI_API_KEY=same as Zoobicon
GOOGLE_AI_API_KEY=same as Zoobicon
SUPABASE_URL=new dominat8 Supabase URL
SUPABASE_ANON_KEY=new dominat8 key
MAILGUN_API_KEY=same or new
MAILGUN_DOMAIN=mg.dominat8.com
STRIPE_SECRET_KEY=same or new products
NEXT_PUBLIC_ENV=production
```

### Step 6 — Brand config update
Update `src/lib/brand-config.ts` in the Dominat8 repo so it only knows about Dominat8 — no Zoobicon brand detection needed. This is a single-brand codebase.

### Step 7 — Remove Zoobicon references
Search codebase for "Zoobicon" and replace with "Dominat8" where customer-facing. Internal code comments can stay as-is.

---

## PRICING TIERS — SAME AS ZOOBICON, POSITIONED AS PREMIUM

| Plan | Price | Positioning |
|---|---|---|
| Starter | $49/mo | "Stop losing to competitors who already have AI" |
| Pro | $129/mo | "The weapon your agency's been missing" |
| Agency | $299/mo | "Dominate your entire client roster" |
| White-label | $499/mo | "Put your name on the most advanced builder on the market" |

**Same clip-the-ticket model as Zoobicon:**
- Domain registration + renewal (Tucows wholesale)
- DNS management (Cloudflare)
- Business email hosting
- AI auto-reply ($29/mo add-on)
- AI SEO monitor ($19/mo add-on)
- AI video content ($39/mo add-on)
- Booking + payments transaction clip (1.5%)

---

## PHASE 1 BUILD PLAN — DOMINAT8

Running in parallel with Zoobicon Phase 1. Do these in order.

### STEP 1 — Fork and Infrastructure Setup
- [ ] Create new GitHub repo: `dominat8`
- [ ] Fork Zoobicon codebase into it
- [ ] Create new Vercel project: dominat8
- [ ] Connect dominat8.com and dominat8.io in Vercel
- [ ] Create new Supabase project: dominat8
- [ ] Set up Mailgun sending domain: mg.dominat8.com
- [ ] Set all environment variables in Vercel
- [ ] Confirm deployment live at dominat8.io

### STEP 2 — Brand Transformation
- [ ] Update `src/lib/brand-config.ts` — single brand, Dominat8 only
- [ ] Global find + replace "Zoobicon" → "Dominat8" in all customer-facing files
- [ ] Set dark theme as global default in `tailwind.config.ts` and `globals.css`
- [ ] Choose and install display font (Bebas Neue or Space Grotesk 900)
- [ ] Define electric accent colour in CSS variables — commit to ONE colour
- [ ] Update logo/wordmark to Dominat8
- [ ] Update all meta titles, descriptions, OG images

### STEP 3 — dominat8.com Landing Page (The Killer Marketing Machine)
- [ ] Hero: dark full-viewport, massive confrontational headline, electric CTA
- [ ] Section 2: Competitive framing — "Your competitors are already using AI"
- [ ] Section 3: Speed proof — "90 seconds to live. 5 seconds to deploy."
- [ ] Section 4: Feature weapons — each feature framed as competitive advantage
- [ ] Section 5: Social proof — specific metrics, zero placeholder names
- [ ] Section 6: Pricing — same tiers, aggressive positioning copy
- [ ] Section 7: Final CTA — urgency through competitive fear
- [ ] Glitch effect on hero headline
- [ ] Animated grid background on hero
- [ ] All CTAs funnel to dominat8.io/builder

### STEP 4 — dominat8.io Product Interface
- [ ] Builder UI rebranded — dark default theme
- [ ] Dashboard rebranded
- [ ] All emails sending from @dominat8.com
- [ ] AI pipeline confirmed working (same Zoobicon engine)
- [ ] Test full build → deploy flow end to end
- [ ] Confirm zoobicon.sh → change to dominat8.sh for hosting subdomain OR keep .sh on Zoobicon and use dominat8.io/sites for hosted URLs

### STEP 5 — AI Auto-Reply (Dominat8 tone)
- [ ] Same Mailgun + Cloudflare Worker architecture as Zoobicon
- [ ] Different Claude system prompt — aggressive, direct, confident tone
- [ ] Never mention Claude, AI, or Anthropic
- [ ] Never mention Zoobicon

**Dominat8 AI support tone example:**
```
You are the Dominat8 support team. You are direct, confident, and fast.
No fluff. No filler. Answer the question. If you don't know, say so and escalate.
You never apologise for the product — it is the best builder on the market.
Copy tone: professional but aggressive. Like a top agency account manager.
```

---

## PHASE 2 — AFTER PHASE 1 COMPLETE

Same as Zoobicon Phase 2 but independent:
- Intellectual crawlers (separate instance, same logic)
- Postal self-hosted email on Hetzner (can share the same VPS as Zoobicon)
- White-label reseller panel (different market — target larger agencies)
- Geographic expansion — Dominat8 targets English-speaking markets first: US, UK, AU, CA

---

## INTELLECTUAL CRAWLERS — DOMINAT8 SPECIFIC

Dominat8's crawlers have a sharper competitive focus:
- Watch: v0, Bolt, Lovable, Emergent, Cursor — the technical builders
- Alert on: new model integrations, new speed improvements, new pricing
- Dominat8 must be FASTER than Bolt and SMARTER than Lovable — always
- Response time: match a competitor feature within 48 hours, surpass within 7 days

---

## IMPORTANT DECISIONS — DOMINAT8

| Date | Decision | Reason |
|---|---|---|
| 2026-03-28 | Separate codebase from Zoobicon | Two different markets, two different brands, two different products. Cannot share a repo — they must evolve independently. |
| 2026-03-28 | Fork Zoobicon engine | 80% of the work is done. Don't rebuild what already works. Rebrand and redirect. |
| 2026-03-28 | Same pricing as Zoobicon | Tested model. Same margins. Different positioning language. |
| 2026-03-28 | Both projects in parallel | Craig runs both simultaneously. Zoobicon targets SMB. Dominat8 targets agencies + developers. Different customers = no cannibalisation. |
| 2026-03-28 | Electric accent — NOT purple | Purple is Zoobicon. Dominat8 needs its own signature colour. Choose at brand setup and never change it. |
| 2026-03-28 | dominat8.com = marketing, dominat8.io = product | .com is the weapon that acquires. .io is the product that retains. Traffic flows .com → .io. |

---

## NOTES TO SELF

- Dominat8 and Zoobicon serve completely different customers. They are not competitors to each other. They are two weapons aimed at two different markets.
- When working on Dominat8, forget Zoobicon exists. The brand, the tone, the design — completely different world.
- The fork means you get a head start. The engine works. Your job is the brand transformation and the killer landing page.
- dominat8.com has to stop someone mid-scroll. If it doesn't make someone feel something in 3 seconds, it isn't done.

---

## CURRENT STATUS — UPDATE THIS EVERY EVENING

**Date last updated:** 2026-03-28
**Current phase:** Phase 1
**Current step:** STEP 1 — Fork and Infrastructure Setup

**Completed today:**
- ✅ Decided on separate codebase — confirmed correct decision
- ✅ Confirmed fork of Zoobicon as foundation
- ✅ Created this CLAUDE.md

**Blockers:** Need to create the GitHub repo and Vercel project first

**NEXT ACTION:**
Go to github.com → your Zoobicon repo → download as ZIP (or fork) → create new repo called `dominat8` → that is Step 1, Checkbox 1.

---

*Dominat8 is its own world. This file is its source of truth.*
*When you work on Dominat8, use this file. When you work on Zoobicon, use the Zoobicon CLAUDE.md.*
*Never mix them up.*

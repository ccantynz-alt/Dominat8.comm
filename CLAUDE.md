# Dominat8.com — Claude Code Configuration

## Repo

- Owner: `ccantynz-alt`
- Repo: `Dominat8.com`
- Role: Marketing site for Dominat8. All builder/billing lives on Dominat8.io.

## Tech Stack Rules (STRICT)

> **We only use the most advanced, latest components. No exceptions.**

### Mandatory Standards

- **React**: Always use the latest stable major version (currently React 19.x). Never ship on an outdated major.
- **Next.js**: Always use the latest stable major version (currently Next.js 15.x). Leverage Turbopack, RSC, and latest optimisations.
- **TypeScript**: Latest stable version. Target ES2020+ minimum.
- **Tailwind CSS**: Latest major (currently v4). Use the new @theme directive and modern patterns.
- **AI Models**: Always use the most capable models available — Claude Opus/Sonnet latest, GPT-4o latest. Never use deprecated model IDs.
- **Node.js**: Use the current LTS or later.

### Banned Patterns

- **No raw HTML pages** — Everything must be React components. No plain `.html` files, no inline `<style>` tags in generated output meant for production.
- **No outdated dependencies** — If a dependency is more than 1 major version behind, it must be upgraded before shipping new features.
- **No "coming soon" placeholders** — If a feature is shown to customers, it must work. Don't ship disabled buttons or waitlist CTAs for features that have real pricing.
- **No internal debug markers in production** — No `PRICING_V2`, `WOW_HOME_V3`, or similar internal markers visible to users.

### When Upgrading

- Upgrade framework + runtime deps (Next.js, React) as a dedicated change, not buried in a feature PR.
- Run full build + type check after every upgrade.

### Pricing (Source of Truth — must match Dominat8.io)

All pricing across every surface must match these values:

| Plan | Price | Generations/mo |
|------|-------|----------------|
| Free | $0 | 3 |
| Starter | $9/mo | 20 |
| Pro | $29/mo | 100 |
| Agency | $99/mo | 500 |
| Overage | $0.49/gen | All paid plans |

Dominat8.io is the source of truth for pricing (it's wired to Stripe). If pricing changes on .io, update ALL surfaces on .com: homepage, /pricing, PricingCompare, PricingTeaser, PricingFAQ, MarketingHomeV2.

## Design Guidelines

- Clean, professional, sleek design that appeals to everyone — not just the cyberpunk market
- Confident but professional copy — no aggressive/hostile language ("dominate or die", "no mercy", etc.)
- Dark theme is fine, but keep it polished and modern
- All CTAs link to https://dominat8.io/builder

## Environment notes

- Git proxy: auto-configured per session (port changes each time — do not hardcode)
- GitHub API proxy: use `HTTPS_PROXY=$GLOBAL_AGENT_HTTP_PROXY`

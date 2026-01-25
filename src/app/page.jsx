import Link from "next/link";
import { buildMarker } from "@/src/lib/buildMarker";
import HeroGlow from "@/src/components/marketing/HeroGlow";

/**
 * Force dynamic rendering to avoid “stale/static/cached HTML” confusion on homepage.
 * This makes updates show up reliably after deploy.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <main className="d8-page">
      {/* Deploy-proof marker (view-source / curl grep friendly) */}
      <span className="d8-marker" aria-hidden="true">
        {buildMarker()}
      </span>

      {/* FULL-SCREEN HERO TAKEOVER */}
      <section className="d8-hero-full">
        {/* WOW background layers (CSS-only) */}
        <div className="d8-wow-bg" aria-hidden="true">
          <div className="d8-orb d8-orb-a" />
          <div className="d8-orb d8-orb-b" />
          <div className="d8-orb d8-orb-c" />
          <div className="d8-grid" />
          <div className="d8-noise" />
          <div className="d8-vignette" />
        </div>

        {/* V8: TRUE cursor-follow glow (tiny JS sets CSS vars) */}
        <HeroGlow>
          <div className="d8-hero-inner">
            <header className="d8-hero-copy">
              <div className="d8-pill">
                <span className="d8-dot" />
                <span>Dominat8 — AI Website Automation Builder</span>
              </div>

              <h1 className="d8-h1">
                The <span className="d8-grad">wow</span> website builder.
                <br />
                Built by AI. Shipped fast.
              </h1>

              <p className="d8-sub">
                Describe your business. Dominat8 generates a premium homepage, pages, and structure —
                ready to publish on your domain.
              </p>

              <div className="d8-cta-row">
                <Link className="d8-btn d8-btn-primary" href="/sign-in">
                  Start building
                </Link>
                <Link className="d8-btn d8-btn-ghost" href="/templates">
                  Explore templates
                </Link>
              </div>

              <div className="d8-trust">
                <div className="d8-trust-item">⚡ Fast publish</div>
                <div className="d8-trust-item">🔎 SEO-ready</div>
                <div className="d8-trust-item">🌐 Custom domains</div>
                <div className="d8-trust-item">🧠 Agent pipeline</div>
              </div>
            </header>

            <aside className="d8-hero-card" aria-label="Preview card">
              <div className="d8-card-top">
                <div className="d8-card-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="d8-card-title">Live Preview</div>
              </div>

              <div className="d8-card-body">
                <div className="d8-card-kicker">AI-generated site blueprint</div>

                <div className="d8-mock">
                  <div className="d8-mock-hero">
                    <div className="d8-mock-title" />
                    <div className="d8-mock-sub" />
                    <div className="d8-mock-sub d8-mock-sub2" />
                    <div className="d8-mock-btnrow">
                      <div className="d8-mock-btn" />
                      <div className="d8-mock-btn d8-mock-btn2" />
                    </div>
                  </div>
                  <div className="d8-mock-grid">
                    <div className="d8-mock-tile" />
                    <div className="d8-mock-tile" />
                    <div className="d8-mock-tile" />
                    <div className="d8-mock-tile" />
                  </div>
                </div>

                <div className="d8-card-foot">
                  <span className="d8-tag">V8 True Glow</span>
                  <span className="d8-tag">Full-screen</span>
                  <span className="d8-tag">Build-gated</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Scroll hint */}
          <div className="d8-scroll-hint" aria-hidden="true">
            <span className="d8-scroll-dot" />
            <span className="d8-scroll-text">Scroll</span>
          </div>
        </HeroGlow>
      </section>

      {/* SITEGROUND-STYLE STRUCTURE BELOW THE FOLD */}
      <section className="d8-logos">
        <div className="d8-wrap">
          <div className="d8-logos-title">Trusted by builders who want a premium look</div>
          <div className="d8-logos-row" aria-label="Logo strip">
            <div className="d8-logo-pill">Agencies</div>
            <div className="d8-logo-pill">Founders</div>
            <div className="d8-logo-pill">Local business</div>
            <div className="d8-logo-pill">Creators</div>
            <div className="d8-logo-pill">E-commerce</div>
          </div>
        </div>
      </section>

      <section className="d8-how">
        <div className="d8-wrap">
          <h2 className="d8-h2">How it works</h2>
          <p className="d8-lead">Three steps. Clean output. Fast publishing.</p>

          <div className="d8-how-grid">
            <div className="d8-step">
              <div className="d8-step-num">1</div>
              <div className="d8-step-title">Describe</div>
              <div className="d8-step-sub">Tell us what you do and the vibe you want.</div>
            </div>
            <div className="d8-step">
              <div className="d8-step-num">2</div>
              <div className="d8-step-title">Generate</div>
              <div className="d8-step-sub">Agents build pages, layout, and SEO structure.</div>
            </div>
            <div className="d8-step">
              <div className="d8-step-num">3</div>
              <div className="d8-step-title">Publish</div>
              <div className="d8-step-sub">Push live on your domain. Iterate instantly.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="d8-proof">
        <div className="d8-wrap">
          <div className="d8-proof-grid">
            <div className="d8-proof-card">
              <div className="d8-proof-kicker">Premium by default</div>
              <div className="d8-proof-title">Design that looks expensive</div>
              <div className="d8-proof-sub">Modern lighting, depth, and typography — without a designer.</div>
            </div>

            <div className="d8-proof-card">
              <div className="d8-proof-kicker">Built to rank</div>
              <div className="d8-proof-title">SEO-ready structure</div>
              <div className="d8-proof-sub">Clean metadata, headings, and page structure from day one.</div>
            </div>

            <div className="d8-proof-card">
              <div className="d8-proof-kicker">Fast execution</div>
              <div className="d8-proof-title">Agents do the heavy lifting</div>
              <div className="d8-proof-sub">From spec to publish — streamlined and repeatable.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="d8-final-cta">
        <div className="d8-wrap">
          <div className="d8-final-box">
            <div>
              <div className="d8-final-title">Ready to build your best site?</div>
              <div className="d8-final-sub">Generate a premium homepage and publish it fast.</div>
            </div>
            <div className="d8-final-actions">
              <Link className="d8-btn d8-btn-primary" href="/sign-in">Start building</Link>
              <Link className="d8-btn d8-btn-ghost" href="/pricing">See pricing</Link>
            </div>
          </div>

          <footer className="d8-footer">
            <div className="d8-footer-left">© {new Date().getFullYear()} Dominat8</div>
            <div className="d8-footer-right">
              <Link className="d8-footer-link" href="/templates">Templates</Link>
              <span className="d8-footer-dot">•</span>
              <Link className="d8-footer-link" href="/use-cases">Use cases</Link>
              <span className="d8-footer-dot">•</span>
              <Link className="d8-footer-link" href="/pricing">Pricing</Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

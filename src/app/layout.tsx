import PolishShell from "@/app/_client/PolishShell";
import "./globals.css";
import type { Metadata } from "next";
import DxlAtmosphere from "@/components/dxl/DxlAtmosphere";
import DxlStatusPill from "@/components/dxl/DxlStatusPill";
import DxlWorldPulseSync from "@/components/dxl/DxlWorldPulseSync";
import DxlToasts from "@/components/dxl/DxlToasts";

export const metadata: Metadata = {
  title: "Dominat8",
  description: "AI-powered website factory.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-dxl="DXL01_20260128">
      <body className="dxl-body min-h-screen bg-black text-white antialiased">
      <DxlAtmosphere />
      <div className="dxl-content">
        {/* D8_PHASE1_LOCK_DEPLOY_STYLING_v1_20260128 */}
        <PolishShell />
        <div
          id="d8-proof"
          data-stamp="D8_PHASE1_LOCK_DEPLOY_STYLING_v1_20260128"
          data-git={process.env.VERCEL_GIT_COMMIT_SHA ?? ""}
          data-deploy={process.env.VERCEL_DEPLOYMENT_ID ?? ""}
          style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0 }}
        />
        <div className="d8-app-shell"><main className="d8-app-main"><div className="d8-page d8-surface">{children}</div></main></div>
      {/* INLINE_FALLBACK_STYLES_V1
   Goal: If Tailwind/classes fail, the app still looks intentional.
   Scope: Safe baseline for cockpit + marketing + general UI elements.
*/}
<style>{`
  :root{
    color-scheme: dark;
    --bg0:#141428;
    --bg1:#181835;
    --card:rgba(255,255,255,.08);
    --card2:rgba(255,255,255,.06);
    --border:rgba(255,255,255,.16);
    --border2:rgba(255,255,255,.14);
    --text:#F0EDFA;
    --muted:rgba(240,237,250,.76);
    --muted2:rgba(240,237,250,.65);
    --accent1:rgba(178,100,255,1);
    --accent2:rgba(80,150,255,1);
    --shadow:0 30px 90px rgba(0,0,0,.35);
    --shadow2:0 18px 55px rgba(178,100,255,.22), 0 10px 24px rgba(80,150,255,.14);
    --r16:16px;
    --r20:20px;
    --r24:24px;
  }

  html,body{height:100%}
  body{
    margin:0;
    background:
      radial-gradient(1200px 800px at 65% 5%, rgba(178,100,255,.28), rgba(0,0,0,0) 60%),
      radial-gradient(900px 700px at 15% 20%, rgba(80,150,255,.18), rgba(0,0,0,0) 62%),
      linear-gradient(180deg, var(--bg0) 0%, var(--bg0) 40%, #101024 100%);
    color:var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a{color:rgba(210,190,255,.95); text-decoration:none}
  a:hover{color:rgba(220,220,255,.98); text-decoration:underline}

  /* Generic layout helpers if Tailwind fails */
  .container, .mx-auto{
    width:100%;
    max-width:1160px;
    margin-left:auto;
    margin-right:auto;
  }

  /* Card baseline */
  .card, .panel, .surface{
    background: linear-gradient(180deg, var(--card), var(--card2));
    border:1px solid var(--border);
    border-radius: var(--r20);
    box-shadow: var(--shadow);
  }

  /* Buttons baseline */
  button, .btn, a.btn{
    font: inherit;
    border-radius: 14px;
    padding: 10px 14px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,.06);
    color: rgba(240,237,250,.92);
    cursor: pointer;
  }
  button:hover, .btn:hover, a.btn:hover{
    background: rgba(255,255,255,.10);
  }
  .btn-primary{
    background: linear-gradient(90deg, var(--accent1), var(--accent2));
    color: #141428 !important;
    box-shadow: var(--shadow2);
    border: 1px solid rgba(255,255,255,.10);
    text-decoration:none !important;
  }
  .btn-primary:hover{
    filter: brightness(1.05);
  }

  /* Inputs baseline (admin/cockpit forms) */
  input, select, textarea{
    font: inherit;
    color: rgba(240,237,250,.94);
    background: rgba(0,0,0,.22);
    border: 1px solid var(--border2);
    border-radius: 14px;
    padding: 10px 12px;
    outline: none;
  }
  input:focus, select:focus, textarea:focus{
    border-color: rgba(178,100,255,.60);
    box-shadow: 0 0 0 4px rgba(178,100,255,.18);
  }
  ::placeholder{color: rgba(240,237,250,.50)}

  /* Tables baseline */
  table{border-collapse:collapse; width:100%}
  th,td{
    border-bottom: 1px solid rgba(255,255,255,.10);
    padding: 10px 10px;
    text-align:left;
    color: rgba(240,237,250,.88);
  }
  th{color: rgba(240,237,250,.75); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 12px}

  /* Headings baseline */
  h1{font-size:40px; line-height:1.05; letter-spacing:-.02em; margin: 0}
  h2{font-size:26px; line-height:1.15; margin: 0}
  h3{font-size:18px; line-height:1.25; margin: 0}
  p{color: var(--muted); line-height:1.6}

  /* Soft separators */
  hr{border:0; border-top:1px solid rgba(255,255,255,.12); margin:18px 0}

  /* If something renders totally naked, this keeps content readable */
  main{display:block}
`}</style>
      
      {process.env.DXL_STATUS_PILL === "0" ? null : <DxlStatusPill />}

      <DxlWorldPulseSync />

      {process.env.DXL_TOASTS === "0" ? null : <DxlToasts />}
</div>
    </body>
    </html>
  );
}
'use client';

import React from 'react';

/**
 * Minimal fallback global CSS used only if Tailwind / primary styles fail.
 * Must remain valid TS/TSX (previous file contained raw CSS tokens).
 */
export default function FallbackStyles(): JSX.Element {
  const css = 
:root{
  color-scheme: dark;
  --bg0:#07070B;
  --bg1:#0B0B12;
  --card:rgba(255,255,255,.06);
  --card2:rgba(255,255,255,.04);
  --border:rgba(255,255,255,.12);
  --border2:rgba(255,255,255,.10);
  --text:#EDEAF7;
  --muted:rgba(237,234,247,.72);
  --muted2:rgba(237,234,247,.60);
  --accent1:rgba(168,85,247,1);
  --accent2:rgba(59,130,246,1);
  --shadow:0 30px 90px rgba(0,0,0,.45);
  --shadow2:0 18px 55px rgba(168,85,247,.18), 0 10px 24px rgba(59,130,246,.10);
  --r16:16px;
  --r20:20px;
  --r24:24px;
}

html,body{height:100%}
body{
  margin:0;
  background:
    radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,.20), rgba(0,0,0,0) 60%),
    radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,.12), rgba(0,0,0,0) 62%),
    linear-gradient(180deg, var(--bg0) 0%, var(--bg0) 40%, #05050A 100%);
  color:var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a{color:rgba(200,180,255,.95); text-decoration:none}
a:hover{color:rgba(210,210,255,.98); text-decoration:underline}

/* Generic layout helpers if Tailwind fails */
.container, .mx-auto{
  width:100%;
  max-width:1160px;
  margin-left:auto;
  margin-right:auto;
}
;
  return <style jsx global>{css}</style>;
}

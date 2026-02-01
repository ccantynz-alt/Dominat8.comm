'use client';

import React from 'react';

export default function FallbackStyles(): JSX.Element {
  const css = 
:root{
  color-scheme: dark;
  --bg0:#07070B;
  --bg1:#0B0B12;
  --card:rgba(255,255,255,.06);
  --border:rgba(255,255,255,.12);
  --text:#EDEAF7;
  --muted:rgba(237,234,247,.72);
  --accent1:rgba(168,85,247,1);
  --accent2:rgba(59,130,246,1);
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
}
a{color:rgba(200,180,255,.95); text-decoration:none}
a:hover{color:rgba(210,210,255,.98); text-decoration:underline}
;
  return <style jsx global>{css}</style>;
}

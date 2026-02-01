"use client";

import * as React from "react";

/**
 * Minimal, build-safe fallback styles injector.
 * This file exists to prevent hard TSX parse failures from accidental CSS/templating edits.
 * It should not change the UI unless the app explicitly renders it.
 */
export default function FallbackStyles(): JSX.Element {
  const css = `
/* D8_FALLBACK_STYLES_SAFE_20260201_132227 */
:root { color-scheme: dark; }
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

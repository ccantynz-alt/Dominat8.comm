/// UPGRADE_20260201_CI_GREEN_20260201_172248
import * as React from "react";

export type D8SectionTone = "plain" | "glass" | "dark" | string;

export type D8SectionProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: D8SectionTone;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

/**
 * Minimal, compile-safe section wrapper.
 * Intentionally avoids changing layout/styling decisions beyond what callers provide.
 */
export function D8Section(props: D8SectionProps) {
  const { eyebrow, title, lead, tone, children, className, style, id } = props;

  // Tone hook: we only annotate via data-attr (no forced styling).
  return (
    <section
      id={id}
      className={className}
      style={style}
      data-d8-section
      data-tone={tone || "plain"}
    >
      {(eyebrow || title || lead) ? (
        <header>
          {eyebrow ? <div data-d8-eyebrow>{eyebrow}</div> : null}
          {title ? <h2 data-d8-title>{title}</h2> : null}
          {lead ? <p data-d8-lead>{lead}</p> : null}
        </header>
      ) : null}

      {children}
    </section>
  );
}

export default D8Section;

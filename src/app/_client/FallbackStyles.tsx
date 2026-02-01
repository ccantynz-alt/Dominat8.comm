/// UPGRADE_20260201_CI_GREEN_20260201_172248
import * as React from "react";

/**
 * This component previously contained an invalid/unterminated template literal,
 * breaking the build. We replace it with a compile-safe no-op.
 *
 * If you later want fallback CSS again, add it back as a well-formed string.
 */
export default function FallbackStyles(): JSX.Element | null {
  return null;
}

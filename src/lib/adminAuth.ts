export function getAdminTokenFromEnv(): string | null {
  const t = process.env.ADMIN_TOKEN;
  if (!t) return null;
  const trimmed = t.trim();
  if (!trimmed) return null;
  return trimmed;
}

export function isValidAdminToken(presented: string | null | undefined): boolean {
  const expected = getAdminTokenFromEnv();
  if (!expected) return false;
  if (!presented) return false;
  return presented === expected;
}
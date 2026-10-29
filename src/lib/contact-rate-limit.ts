const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 15 * 60 * 1000;
const maxAttempts = 5;

// Best-effort per-instance protection; production can additionally use Vercel Firewall rules.
export function checkContactRateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  for (const [entryKey, entry] of attempts) if (entry.resetAt <= now) attempts.delete(entryKey);
  const current = attempts.get(key);
  if (!current) {
    // Keep memory bounded if many different addresses reach one warm instance.
    if (attempts.size >= 5000) return { allowed: false, retryAfter: 60 };
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= maxAttempts) return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

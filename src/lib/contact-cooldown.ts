import { createHmac, timingSafeEqual } from "node:crypto";

const cooldownMs = 5 * 60 * 1000;
export const contactCooldownCookie = "just-dev-contact-cooldown";
const reservations = new Map<string, { token: symbol; until: number; sent: boolean }>();

// The signed HttpOnly cookie survives server restarts. These additional limits
// prevent overlapping sends and repeat email/address sends in a warm instance.
export function reserveContactSend(keys: string[], now = Date.now()) {
  for (const [key, entry] of reservations) if (entry.until <= now) reservations.delete(key);
  const until = Math.max(0, ...keys.map(key => reservations.get(key)?.until ?? 0));
  if (until > now) return { allowed: false as const, retryAfter: Math.ceil((until - now) / 1000) };
  if (reservations.size + keys.length > 10000) return { allowed: false as const, retryAfter: 60 };
  const token = Symbol("contact-send");
  for (const key of keys) reservations.set(key, { token, until: now + 60000, sent: false });
  return {
    allowed: true as const,
    complete(completedAt = Date.now()) {
      for (const key of keys) if (reservations.get(key)?.token === token) reservations.set(key, { token, until: completedAt + cooldownMs, sent: true });
    },
    release() {
      for (const key of keys) if (reservations.get(key)?.token === token && !reservations.get(key)?.sent) reservations.delete(key);
    },
  };
}

export function createContactCooldownToken(secret: string, now = Date.now()) {
  const deadline = String(now + cooldownMs);
  return `${deadline}.${createHmac("sha256", secret).update(deadline).digest("hex")}`;
}

export function readContactCooldown(token: string | undefined, secret: string, now = Date.now()): number {
  if (!token || !/^\d{13}\.[a-f0-9]{64}$/.test(token)) return 0;
  const [deadline, signature] = token.split(".");
  const expected = createHmac("sha256", secret).update(deadline).digest();
  if (!timingSafeEqual(Buffer.from(signature, "hex"), expected)) return 0;
  const remaining = Number(deadline) - now;
  return remaining > 0 && remaining <= cooldownMs ? Math.ceil(remaining / 1000) : 0;
}

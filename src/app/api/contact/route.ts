import { createHash } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import { contactCooldownSeconds, createContactEmail, isContactEmail, validateContactForm } from "@/lib/contact-form";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import { contactCooldownCookie, createContactCooldownToken, readContactCooldown, reserveContactSend } from "@/lib/contact-cooldown";
import { profile } from "@/data/profile";

const maxBodyBytes = 16 * 1024;
const responseHeaders = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

function cooldownSecret() {
  return process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "");
}

function cooldownResponse(retryAfter: number) {
  return Response.json({ error: "Please wait before sending another message.", retryAfter }, { status: 429, headers: { ...responseHeaders, "Retry-After": String(retryAfter) } });
}

export async function GET(request: NextRequest) {
  const secret = cooldownSecret();
  return Response.json({ retryAfter: secret ? readContactCooldown(request.cookies.get(contactCooldownCookie)?.value, secret) : 0 }, { headers: responseHeaders });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") return Response.json({ error: "This request could not be accepted." }, { status: 403, headers: responseHeaders });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ error: "Send the form as JSON." }, { status: 415, headers: responseHeaders });

  const secret = cooldownSecret();
  const remaining = secret ? readContactCooldown(request.cookies.get(contactCooldownCookie)?.value, secret) : 0;
  if (remaining > 0) return cooldownResponse(remaining);

  const address = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const key = createHash("sha256").update(address.trim()).digest("hex");
  const limit = checkContactRateLimit(key);
  if (!limit.allowed) return Response.json({ error: "Too many messages. Please try again later.", retryAfter: limit.retryAfter }, { status: 429, headers: { ...responseHeaders, "Retry-After": String(limit.retryAfter) } });

  if (Number(request.headers.get("content-length")) > maxBodyBytes) return Response.json({ error: "Your message is too long." }, { status: 413, headers: responseHeaders });
  let payload: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, "utf8") > maxBodyBytes) return Response.json({ error: "Your message is too long." }, { status: 413, headers: responseHeaders });
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "The form could not be read. Please try again." }, { status: 400, headers: responseHeaders });
  }

  const validation = validateContactForm(payload);
  if (!validation.success) return Response.json({ error: "Please check the highlighted fields.", errors: validation.errors }, { status: 400, headers: responseHeaders });
  if (validation.data.website) return Response.json({ success: true }, { headers: responseHeaders });

  const sender = process.env.GMAIL_SMTP_USER?.trim();
  const password = process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_EMAIL_TO?.trim() || profile.email;
  if (!sender || !password || !isContactEmail(sender) || !isContactEmail(recipient)) return Response.json({ error: "The contact form is not available yet. Please use the email link below." }, { status: 503, headers: responseHeaders });

  const emailKey = createHash("sha256").update(validation.data.email.toLowerCase()).digest("hex");
  const reservation = reserveContactSend([`address:${key}`, `email:${emailKey}`]);
  if (!reservation.allowed) return cooldownResponse(reservation.retryAfter);

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: sender, pass: password },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const result = await transport.sendMail(createContactEmail(validation.data, sender, recipient));
    if (!result.accepted?.length || result.rejected?.length) throw new Error("Recipient was not accepted");
    reservation.complete();
    const response = NextResponse.json({ success: true, retryAfter: contactCooldownSeconds }, { headers: responseHeaders });
    response.cookies.set(contactCooldownCookie, createContactCooldownToken(password), { httpOnly: true, sameSite: "strict", secure: new URL(request.url).protocol === "https:", path: "/api/contact", maxAge: contactCooldownSeconds });
    return response;
  } catch (error) {
    // Log only a diagnostic code, never SMTP credentials or the visitor's message.
    console.error("Contact email failed", { code: error && typeof error === "object" && "code" in error ? String(error.code) : "UNKNOWN" });
    return Response.json({ error: "Your message could not be sent. Please try again or use the email link below." }, { status: 502, headers: responseHeaders });
  } finally {
    reservation.release();
  }
}

export const contactLimits = { name: 80, email: 254, subject: 120, message: 4000 } as const;
export const contactCooldownSeconds = 5 * 60;

export function formatContactCooldown(seconds: number) {
  const remaining = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;
}

export type ContactFields = { name: string; email: string; subject: string; message: string; website: string };
export type ContactFieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
export type ContactValidation = { success: true; data: ContactFields } | { success: false; errors: ContactFieldErrors };

export function isContactEmail(value: string): boolean {
  return value.length <= contactLimits.email && !/[\r\n\u0000-\u001f\u007f]/.test(value) && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/.test(value) && !value.startsWith(".") && !value.includes("..") && !value.includes(".@");
}

export function validateContactForm(input: unknown): ContactValidation {
  const values = input !== null && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const field = (key: keyof ContactFields) => typeof values[key] === "string" ? values[key].trim() : "";
  const data: ContactFields = { name: field("name"), email: field("email"), subject: field("subject"), message: field("message"), website: field("website") };
  const errors: ContactFieldErrors = {};
  if (!data.name || data.name.length > contactLimits.name || /[<>\u0000-\u001f\u007f]/.test(data.name)) errors.name = "Enter your name as plain text (up to 80 characters).";
  if (!isContactEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!data.subject || data.subject.length > contactLimits.subject || /[<>\u0000-\u001f\u007f]/.test(data.subject)) errors.subject = "Enter a subject as plain text (up to 120 characters).";
  if (data.message.length < 10 || data.message.length > contactLimits.message || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(data.message)) errors.message = "Write a message between 10 and 4,000 characters.";
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}

export function createContactEmail(data: ContactFields, sender: string, recipient: string) {
  // Keep user content in a text/plain MIME part, never HTML, URLs, or templates.
  // Literal code in the message is data and cannot execute as markup.
  return {
    from: { name: "JustDev Portfolio", address: sender },
    to: recipient,
    replyTo: { name: data.name, address: data.email },
    subject: `[JustDev] ${data.subject}`,
    text: `New portfolio message\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

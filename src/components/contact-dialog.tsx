"use client";

import { CheckCircleIcon, MailIcon, PaperAirplaneIcon, XIcon } from "@primer/octicons-react";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactCooldownSeconds, contactLimits, formatContactCooldown, validateContactForm, type ContactFieldErrors, type ContactFields } from "@/lib/contact-form";
import { startContactCooldown, useContactCooldown } from "@/components/contact-cooldown";
import { profile } from "@/data/profile";

const emptyFields: ContactFields = { name: "", email: "", subject: "", message: "", website: "" };
const fieldNames = ["name", "email", "subject", "message"] as const;
type FieldName = typeof fieldNames[number];

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sendingRef = useRef(false);
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const fieldId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fields, setFields] = useState<ContactFields>(emptyFields);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<ContactFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const remaining = useContactCooldown();
  const validation = validateContactForm(fields);
  const canSend = validation.success && status !== "sending" && remaining === 0;
  const errors = Object.fromEntries(fieldNames.map(name => [name, serverErrors[name] || (touched[name] && !validation.success ? validation.errors[name] : undefined)])) as ContactFieldErrors;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controller = new AbortController();
    // Recover the server-signed cooldown even if local browser storage was cleared.
    void fetch("/api/contact", { cache: "no-store", signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(result => { if (!controller.signal.aborted && typeof result?.retryAfter === "number") startContactCooldown(result.retryAfter); })
      .catch(() => {});
    return () => {
      document.body.style.overflow = previousOverflow;
      controller.abort();
    };
  }, [isOpen]);

  function openDialog() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function updateField(name: keyof ContactFields, value: string) {
    setFields(previous => ({ ...previous, [name]: value }));
    if (name !== "website") setServerErrors(previous => ({ ...previous, [name]: undefined }));
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current || remaining > 0) return;
    const checked = validateContactForm(fields);
    setServerErrors({});
    setErrorMessage("");
    if (!checked.success) {
      setTouched({ name: true, email: true, subject: true, message: true });
      const firstInvalidField = fieldNames.find(name => checked.errors[name]);
      event.currentTarget.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }
    sendingRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(checked.data) });
      const result = await response.json();
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After")) || result.retryAfter;
        startContactCooldown(typeof retryAfter === "number" ? retryAfter : contactCooldownSeconds);
      }
      if (!response.ok || result.success !== true) {
        setServerErrors(Object.fromEntries(fieldNames.filter(name => typeof result.errors?.[name] === "string").map(name => [name, result.errors[name]])));
        throw new Error(typeof result.error === "string" ? result.error : "Your message could not be sent. Please try again.");
      }
      startContactCooldown(contactCooldownSeconds);
      setStatus("sent");
      setFields(emptyFields);
      setTouched({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error && !(error instanceof TypeError) ? error.message : "Your message could not be sent. Please try again or email me directly.");
    } finally {
      sendingRef.current = false;
    }
  }

  function renderField(name: FieldName, label: string, placeholder: string) {
    const id = `${fieldId}-${name}`;
    const props = {
      id, name, placeholder, required: true,
      value: fields[name], maxLength: contactLimits[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(name, event.target.value),
      onBlur: () => setTouched(previous => ({ ...previous, [name]: true })),
      "aria-invalid": !!errors[name],
      "aria-describedby": [name === "message" ? `${id}-help` : "", errors[name] ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined,
    };
    return (
      <div className="contact-field">
        <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
        {name === "message" ? <textarea {...props} rows={5} minLength={10} /> : <input {...props} type={name === "email" ? "email" : "text"} autoComplete={name === "name" || name === "email" ? name : "off"} />}
        {name === "message" && <p id={`${id}-help`} className="contact-field-hint">Plain text · 10–4,000 characters. All fields are required.</p>}
        {errors[name] && <p id={`${id}-error`} className="contact-field-error">{errors[name]}</p>}
      </div>
    );
  }

  return (
    <>
      <button className="header-icon-button contact-toggle" type="button" aria-label="Send a message" title="Send a message" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={dialogId} onClick={openDialog}><MailIcon size={16} aria-hidden="true" /></button>
      <dialog ref={dialogRef} id={dialogId} className="contact-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClose={() => setIsOpen(false)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <div className="contact-dialog-heading">
          <h2 id={titleId}><MailIcon size={18} aria-hidden="true" />Send a message</h2>
          <button className="contact-close" type="button" aria-label="Close contact form" onClick={() => dialogRef.current?.close()}><XIcon size={18} aria-hidden="true" /></button>
        </div>
        <p className="contact-intro" id={descriptionId}>Have a project in mind or a question? Let’s talk.</p>

        {status === "sent" ? (
          <div className="contact-success">
            <div role="status"><CheckCircleIcon size={32} aria-hidden="true" /><h3>Message sent</h3><p>Thanks for reaching out. I’ll reply to the email you provided.</p></div>
            <button className="contact-secondary-button" type="button" disabled={remaining > 0} onClick={() => { setStatus("idle"); setServerErrors({}); setErrorMessage(""); }}>Write another message</button>
          </div>
        ) : (
          <form className="contact-form" noValidate onSubmit={submitMessage}>
            <fieldset disabled={status === "sending"}>
              <legend className="sr-only">Your message details</legend>
              <div className="contact-field-row">
                {renderField("name", "Name", "Your name")}
                {renderField("email", "Email", "you@example.com")}
              </div>
              {renderField("subject", "Subject", "What would you like to discuss?")}
              {renderField("message", "Message", "Tell me a little about your project or question…")}
              <div className="contact-honeypot" aria-hidden="true"><label htmlFor={`${fieldId}-website`}>Leave this field empty</label><input id={`${fieldId}-website`} name="website" value={fields.website} onChange={event => updateField("website", event.target.value)} autoComplete="off" tabIndex={-1} /></div>
            </fieldset>
            {errorMessage && <p className="contact-form-error" role="alert">{errorMessage}</p>}
            <div className="contact-form-actions"><span role="status" aria-live="polite">{status === "sending" ? "Sending your message…" : "I’ll reply to the email you provide."}</span><button className="contact-send-button" type="submit" disabled={!canSend}><PaperAirplaneIcon size={15} aria-hidden="true" />{status === "sending" ? "Sending…" : "Send message"}</button></div>
          </form>
        )}
        {remaining > 0 && <p className="contact-cooldown">You can send another message in <span role="timer" aria-live="off" aria-label={`${remaining} seconds remaining`}>{formatContactCooldown(remaining)}</span>.</p>}
        <div className="contact-direct-email"><span>Prefer email?</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
      </dialog>
    </>
  );
}

import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { contactLimits, createContactEmail, formatContactCooldown, validateContactForm } from '../src/lib/contact-form.ts';
import { checkContactRateLimit } from '../src/lib/contact-rate-limit.ts';
import { createContactCooldownToken, readContactCooldown, reserveContactSend } from '../src/lib/contact-cooldown.ts';

const fields = { name: 'Alex Rivera', email: 'alex@example.com', subject: 'Portfolio project enquiry', message: 'Hello Justin, I would like to discuss a website project.', website: '' };

test('contact validation preserves multiline messages and normalizes surrounding spaces', () => {
  const result = validateContactForm({ ...fields, name: ' Alex Rivera ', message: ' Hello Justin,\nCan we discuss a project? ' });
  assert.equal(result.success, true);
  assert.equal(result.data.name, 'Alex Rivera');
  assert.equal(result.data.message, 'Hello Justin,\nCan we discuss a project?');
});

test('contact validation rejects injected headers, malformed addresses, and oversized fields', () => {
  for (const input of [
    { ...fields, email: 'alex@example.com\r\nBcc: other@example.com' },
    { ...fields, email: 'alex@example.com,other@example.com' },
    { ...fields, name: 'Alex\nOther' },
    { ...fields, subject: 'Project\r\nBcc: other@example.com' },
    { ...fields, message: 'x'.repeat(contactLimits.message + 1) },
    { ...fields, message: 'short' },
    null,
    { ...fields, email: ['alex@example.com'] },
  ]) assert.equal(validateContactForm(input).success, false);
});

test('contact email uses a fixed sender and recipient, with the visitor only as reply-to', async () => {
  const mail = createContactEmail(fields, 'sender@example.com', 'owner@example.com');
  const transport = nodemailer.createTransport({ jsonTransport: true });
  // JSON transport serializes locally and makes no network connection.
  const result = await transport.sendMail(mail);
  const serialized = JSON.parse(result.message);
  assert.equal(serialized.from.address, 'sender@example.com');
  assert.equal(serialized.to[0].address, 'owner@example.com');
  assert.equal(serialized.replyTo[0].address, fields.email);
  assert.equal(serialized.subject, '[JustDev] Portfolio project enquiry');
  assert(serialized.text.includes(fields.message));
  assert.equal(serialized.html, undefined);
});

test('contact rate limit blocks repeated requests and resets after the window', () => {
  const start = 1000;
  for (let i = 0; i < 5; i++) assert.equal(checkContactRateLimit('test-sender', start).allowed, true);
  assert.deepEqual(checkContactRateLimit('test-sender', start), { allowed: false, retryAfter: 900 });
  assert.equal(checkContactRateLimit('different-sender', start).allowed, true);
  assert.equal(checkContactRateLimit('test-sender', start + 900000).allowed, true);
});

test('required fields, whitespace, malformed emails, and markup in header fields stay invalid', () => {
  for (const name of ['name', 'email', 'subject', 'message']) {
    assert.equal(validateContactForm({ ...fields, [name]: '   ' }).success, false);
    assert.equal(validateContactForm({ ...fields, [name]: { html: '<script>alert(1)</script>' } }).success, false);
  }
  for (const input of [
    { ...fields, name: '<img src=x onerror=alert(1)>' },
    { ...fields, email: '"<svg/onload=alert(1)>"@example.com' },
    { ...fields, email: 'alex@-example.com' },
    { ...fields, email: 'alex..other@example.com' },
    { ...fields, subject: '<script>alert(1)</script>' },
    { ...fields, message: 'Invalid control\u0007 character' },
  ]) assert.equal(validateContactForm(input).success, false);
  assert.equal(validateContactForm({ ...fields, name: "José O’Connor", message: 'Can you compare pricing < 100 and > 50?\nThanks!' }).success, true);
});

test('script-like message content is delivered only in a plain text MIME part', async () => {
  const payload = '<script>alert("xss")</script><img src=x onerror=alert(1)><svg/onload=alert(1)>';
  const validation = validateContactForm({ ...fields, message: payload });
  assert.equal(validation.success, true);
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  const result = await transport.sendMail(createContactEmail(validation.data, 'sender@example.com', 'owner@example.com'));
  const mime = result.message.toString();
  assert.match(mime, /Content-Type: text\/plain; charset=utf-8/);
  assert.doesNotMatch(mime, /Content-Type: text\/html/);
  assert.equal(createContactEmail(validation.data, 'sender@example.com', 'owner@example.com').text.includes(payload), true);
  assert.equal(createContactEmail(validation.data, 'sender@example.com', 'owner@example.com').disableFileAccess, true);
  assert.equal(createContactEmail(validation.data, 'sender@example.com', 'owner@example.com').disableUrlAccess, true);
});

test('signed cooldown lasts five minutes and rejects tampering, wrong secrets, and expired tokens', () => {
  const now = 1793275200000;
  const secret = 'test-only-signing-secret';
  const token = createContactCooldownToken(secret, now);
  assert.equal(readContactCooldown(token, secret, now), 300);
  assert.equal(readContactCooldown(token, secret, now + 1000), 299);
  assert.equal(readContactCooldown(token, secret, now + 299001), 1);
  assert.equal(readContactCooldown(token, secret, now + 300000), 0);
  assert.equal(readContactCooldown(token, 'wrong-secret', now), 0);
  assert.equal(readContactCooldown(token.replace(/^\d/, '2'), secret, now), 0);
  assert.equal(readContactCooldown(token + 'x', secret, now), 0);
  assert.equal(readContactCooldown(undefined, secret, now), 0);
  assert.equal(formatContactCooldown(300), '5:00');
  assert.equal(formatContactCooldown(59), '0:59');
  assert.equal(formatContactCooldown(-1), '0:00');
});

test('only successful sends start five minutes; failed sends release their reservation', () => {
  const now = 1793275200000;
  const keys = ['test-address', 'test-email'];
  const failed = reserveContactSend(keys, now);
  assert.equal(failed.allowed, true);
  assert.equal(reserveContactSend(keys, now + 1).allowed, false);
  failed.release();
  const sent = reserveContactSend(keys, now + 2);
  assert.equal(sent.allowed, true);
  sent.complete(now + 1000);
  sent.release();
  assert.deepEqual(reserveContactSend(['test-address'], now + 1000), { allowed: false, retryAfter: 300 });
  assert.deepEqual(reserveContactSend(['test-email'], now + 2000), { allowed: false, retryAfter: 299 });
  assert.equal(reserveContactSend(['different-address', 'different-email'], now + 2000).allowed, true);
  assert.equal(reserveContactSend(keys, now + 301000).allowed, true);
});

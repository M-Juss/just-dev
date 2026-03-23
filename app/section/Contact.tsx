'use client';
import { ButtonDefault } from '@/components/ButtonDefault';
import {InputWithField} from '@/components/InputWithField';
import { TextAreaWithField } from '@/components/TextAreaWithField';
import {FaPhoneAlt} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {contactSchema, ContactFormData} from '@/schema/validation.schema';
import {ChangeEvent, FormEvent, ReactNode, useRef, useState} from 'react';
import {toast} from 'sonner';
import emailjs from '@emailjs/browser';

const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const COOLDOWN = 10 * 60 * 1000;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastSubmitTime');
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {id, value} = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const now = Date.now();

    if (now - lastSubmitTime < COOLDOWN) {
      const remaining = Math.ceil((COOLDOWN - (now - lastSubmitTime)) / 60000);
      toast.warning(`Please wait ${remaining} minute(s) before sending again.`);
      return;
    }

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattenedErrors = result.error.flatten().fieldErrors;
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};

      if (flattenedErrors.name?.[0]) fieldErrors.name = flattenedErrors.name[0];
      if (flattenedErrors.email?.[0])
        fieldErrors.email = flattenedErrors.email[0];
      if (flattenedErrors.subject?.[0])
        fieldErrors.subject = flattenedErrors.subject[0];
      if (flattenedErrors.message?.[0])
        fieldErrors.message = flattenedErrors.message[0];

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
        throw new Error(
          'Missing EmailJS environment variables. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env'
        );
      }

      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        emailJsPublicKey
      );

      setLastSubmitTime(now);
      localStorage.setItem('lastSubmitTime', now.toString());
      toast.success('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      id="contact"
      className="grid grid-cols-2 px-24 py-16 bg-charcoal/40 border-b border-charcoal"
    >
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Send a message</h2>
        <p className="mt-4 mb-10 text-light-gray text-4xl max-w-xl">
          Have a project in mind? Let&apos;s build something remarkable
          together.
        </p>
        <div className="flex gap-x-4 mb-4 items-center">
          <MdEmail className="text-2xl text-white" />
          <p className="text-lg">m.justinsayon@gmail.com</p>
        </div>
        <div className="flex gap-x-4 items-center">
          <FaPhoneAlt className="text-2xl text-white" />
          <p className="text-lg">0976 493 7587</p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <InputWithField
          label="Name"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name here..."
        />

        <InputWithField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@gmail.com"
        />

        <InputWithField
          label="Subject"
          id="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="Your subject here..."
        />

        <TextAreaWithField
          label="Message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Your message here..."
        />

        <ButtonDefault
          Text={loading ? 'Sending...' : 'Send Message'}
          className="mt-6"
        />
      </form>
    </section>
  );
}

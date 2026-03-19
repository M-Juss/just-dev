import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters"),

  message: z
    .string()
    .min(20, "Message must be at least 20 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
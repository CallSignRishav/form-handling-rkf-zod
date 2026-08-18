import { z } from "zod";

export const formSchemaType = z.object({
  fullname: z
    .string()
    .min(3, { message: "Min 3 required" })
    .max(25, { message: "Max 25" }),
  password: z
    .string()
    .min(8, { message: "Min 8 required" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message: "Must include uppercase, lowercase, number, and special char",
    }),
  email: z.string().email({ message: "Valid email required" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Must be 10 digits" }),
  confirm: z.boolean().refine((v) => v === true, {
    message: "You must confirm the details are correct",
  }),
});

export type FormType = z.infer<typeof formSchemaType>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Valid email required" }),
  password: z
    .string()
    .min(8, { message: "Min 8 required" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message: "Must include uppercase, lowercase, number, and special char",
    }),
});

export type LoginType = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Min 3 required" })
    .max(50, { message: "Max 50" }),
  email: z.string().email({ message: "Valid email required" }),
  phone: z.string().regex(/^\d{10}$/, { message: "Must be 10 digits" }),
  subject: z.string().min(3, { message: "Min 3 required" }),
  message: z.string().min(10, { message: "Min 10 required" }),
});

export type ContactType = z.infer<typeof contactSchema>;

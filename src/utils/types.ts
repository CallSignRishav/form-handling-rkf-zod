import { z } from "zod";

export const formSchemaType = z.object({
  username: z
    .string()
    .min(3, { message: "Min 3 required" })
    .max(25, { message: "Max 25" }),
  useremail: z.string().email({ message: "Valid email required" }),
  userage: z.coerce.number().gte(18, { message: "Must be 18+" }).lt(100, {
    message: "Must be less than 100",
  }),
});

export type FormType = z.infer<typeof formSchemaType>;

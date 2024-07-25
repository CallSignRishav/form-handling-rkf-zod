import { z } from "zod";

export const formSchemaType = z.object({
  username: z
    .string()
    .min(3, { message: "Min 3 required" })
    .max(25, { message: "Max 25" }),

  useremail: z.string().email({ message: "Valid email required" }),

  userage: z.coerce
    .number()
    .gt(0, { message: "Min age 1" })
    .lt(100, { message: "Max is 99" }),
});

export type FormType = z.infer<typeof formSchemaType>;

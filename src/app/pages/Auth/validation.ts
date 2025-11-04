import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const loginSchema = toFormikValidationSchema(
  z.object({
    email: z
      .string()
      .min(1, "Please, Enter your email")
      .email("Please, Enter a valid email"),
    password: z
      .string()
      .min(1, "Please, Enter your password")
      .min(6, "Password should be at least 6 chars."),
  })
);

export const registerSchema = toFormikValidationSchema(
  z.object({
    username: z.string().min(1, "Please, Enter your username"),
    email: z
      .string()
      .min(1, "Please, Enter your email")
      .email("Please, Enter a valid email"),
    password: z
      .string()
      .min(1, "Please, Enter your password")
      .min(6, "Password should be at least 6 chars."),
  })
);

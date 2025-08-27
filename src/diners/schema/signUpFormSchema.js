import z from "zod";
import { phoneSchema } from "../../helpers/phoneSchema.js";

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(2, "Name must be atleast 2 characters"),
    lastName: z.string().min(2, "Name must be atleast 2 characters"),
    email: z.email({ pattern: z.regexes.email }),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: phoneSchema,
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Please accept the terms and condition",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],

    // run if password & confirmPassword are valid
    when(payload) {
      return signUpFormSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

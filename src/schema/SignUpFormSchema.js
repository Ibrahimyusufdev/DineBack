import { data } from "react-router-dom";
import z from "zod";

export const signUpFormShema = z
  .object({
    firstName: z.string().min(2, "Name must be atleast 2 characters"),
    lastName: z.string().min(2, "Name must be atleast 2 characters"),
    email: z.email({ pattern: z.regexes.email }),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: z.number().max(11, "Password cannot exceed 11 digit"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

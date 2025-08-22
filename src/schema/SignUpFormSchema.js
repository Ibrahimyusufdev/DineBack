import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const signUpFormShema = z.object({
  firstName: z.string().min(2, "Name must be atleast 2 characters"),
  lastName: z.string().min(2, "Name must be atleast 2 characters"),
  email: z.email({ pattern: z.regexes.email }),
  password: z
    .string()
    .min(2, "Password must be atleast 2 characters")
    .max(16, "Password cannot be more than 16 characters"),
  confirmPassword: z
    .string()
    .min(2, "Password must be atleast 2 characters")
    .max(16, "Password cannot be more than 16 characters"),
  phoneNumber: z.number().max(11, "Password cannot exceed 11 digit"),
});

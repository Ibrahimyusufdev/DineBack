import {z} from "zod";
import { phoneSchema } from "../../helpers/phoneSchema";

export const signUpFormSchema = z.object({
    restaurantName: z.string().min(2, "Restaurant name must be atleast two characters"),
    businessEmail: z.email({ pattern: z.regexes.email }),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    contactPersonNumber: phoneSchema,
    contactPhoneNumber: phoneSchema,
    restaurantAddress: z.string().min(2, "Address must be atleat two characters"),
    cuisineTypes: z.string().min(1, "Please select atleast one"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      error: "Please accept the terms and condition",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],

    // run if password & confirmPassword are valid
    when(payload) {
      return signUpFormSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

  
  
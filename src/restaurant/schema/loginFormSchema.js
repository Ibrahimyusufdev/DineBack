import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ pattern: z.regexes.email }, "Please enter your email"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

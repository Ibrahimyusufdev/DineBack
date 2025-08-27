import { z } from "zod";

export const formatInternationalPhone = (value) => {
  // keep + at start if present
  let digits = value.replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) {
   
    const match = digits.match(/^(\+\d{1,3})(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return digits;
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ");
  } else {
  
    const match = digits.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/);
    if (!match) return digits;
    return [match[1], match[2], match[3]].filter(Boolean).join(" ");
  }
};

export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number is too long")
  .refine(
    (val) => /^\+?\d{10,15}$/.test(val),
    "Invalid phone number format"
  );







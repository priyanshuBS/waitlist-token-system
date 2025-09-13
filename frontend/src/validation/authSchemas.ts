import { z } from "zod";

export const emailSignupSchema = z.object({
  fullName: z.string().min(3, "Full name is required."),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be 6 character long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase, one lowercase, and one digit"
    ),
});

export const phoneSignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase, one lowercase, and one digit"
    ),
});

import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(3).max(50).trim(),
    email: z.email("Invalid email").trim().toLowerCase().optional(),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone must be 10 digits")
      .trim()
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
  });

export const loginSchema = z
  .object({
    email: z.email("Invalid email").trim().toLowerCase().optional(),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone must be 10 digits")
      .trim()
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
  });

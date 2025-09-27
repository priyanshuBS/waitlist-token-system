import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Full Name must have atleast 4 characters")
      .max(50, "Full Name can't exceed more than 50 characters"),

    email: z
      .email("Invalid email")
      .trim()
      .toLowerCase()
      .min(3, "Email should be minimum 3 character long")
      .max(50, "Maximum 50 characters email is allowed")
      .optional(),

    phoneNumber: z
      .string()
      .trim()
      .regex(
        /^\d{10,15}$/,
        "Phone number must be digits only, 10-15 characters"
      )
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
    path: ["email", "phoneNumber"],
  });

export const loginSchema = z
  .object({
    email: z
      .email("Invalid email")
      .trim()
      .toLowerCase()
      .min(3, "Invlid email length")
      .max(50, "Invalid email length")
      .optional(),

    phoneNumber: z
      .string()
      .trim()
      .regex(
        /^\d{10,15}$/,
        "Phone number must be digits only, 10-15 characters"
      )
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
    path: ["email", "phoneNumber"],
  });

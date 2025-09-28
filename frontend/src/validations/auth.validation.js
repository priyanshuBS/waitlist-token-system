import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Full Name must be at least 4 characters")
      .max(50, "Full Name can't exceed 50 characters")
      .nonempty("Full Name is required"),

    email: z
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase()
      .min(3, "Email should be at least 3 characters")
      .max(50, "Email can't exceed 50 characters")
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
      )
      .nonempty("Password is required"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either Email or Phone Number is required",
    path: ["email", "phoneNumber"],
  });

export const loginSchema = z
  .object({
    email: z
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase()
      .min(3, "Email should be at least 3 characters")
      .max(50, "Email can't exceed 50 characters")
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
      )
      .nonempty("Password is required"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either Email or Phone Number is required",
    path: ["email", "phoneNumber"],
  });

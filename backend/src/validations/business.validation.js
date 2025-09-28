import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z.number().nonnegative().optional(),
  durationMinutes: z.number().nonnegative().optional(),
});

const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().default("India"),
  coordinates: z.object({
    type: z.enum(["Point"]).default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must have [lng, lat] format"),
  }),
});

const openingHoursSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
});

export const createBusinessSchema = z.object({
  owner: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  name: z
    .string()
    .trim()
    .min(3, "Business name must be 3 character long")
    .max(100),
  description: z.string().max(500).optional(),
  mainCategory: z.string(),
  subCategory: z.array(z.string()),
  services: z.array(serviceSchema),
  location: locationSchema,
  openingHours: openingHoursSchema.optional(),
  dailyLimit: z.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

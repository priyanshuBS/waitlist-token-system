import { z } from "zod";
import mongoose from "mongoose";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z.coerce.number().nonnegative().optional(),
  durationMinutes: z.coerce.number().nonnegative().optional(),
});

const coordinatesSchema = z.union([
  z.array(z.coerce.number()).length(2),
  z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.coerce.number()).length(2),
  }),
]);

const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().default("India"),
  coordinates: coordinatesSchema,
});

const openingHoursSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
});

const objectIdSchema = z.union([
  z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId string",
  }),
  z.instanceof(mongoose.Types.ObjectId),
]);

export const businessSchema = z.object({
  owner: objectIdSchema,
  name: z.string().trim().min(3).max(100),
  description: z.string().max(500).optional(),
  mainCategory: z.string(),
  subCategory: z.array(z.string()),
  services: z.array(serviceSchema),
  location: locationSchema,
  openingHours: openingHoursSchema.optional(),
  isActive: z.boolean().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.union([z.url(), z.instanceof(File)])).optional(),
});

// Partial schema for updates
export const updateBusinessSchema = businessSchema
  .partial()
  .omit({ owner: true });

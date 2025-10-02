import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    mainCategory: {
      type: String,
      trim: true,
    },
    subCategory: [{ type: String }],
    services: [
      {
        _id: false,
        name: { type: String, required: true },
        price: { type: Number },
        durationMinutes: { type: Number },
      },
    ],
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true, default: "India" },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" }, // [lng, lat]
      },
    },
    openingHours: {
      start: { type: String },
      end: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    tags: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Business = mongoose.model("Business", businessSchema);

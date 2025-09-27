import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "FullName is required"],
      minLength: 4,
      maxLength: 60,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      minLength: 3,
      maxLength: 50,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      minLength: 10,
      match: [/^\d{10,15}$/, "Phone number must be digits only"],
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          index: "2dsphere",
        },
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const User = mongoose.model("User", userSchema);

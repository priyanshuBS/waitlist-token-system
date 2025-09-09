import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "user" | "admin";
  comparePassword(enteredPassword: string): Promise<boolean>;
  generateJWT(): string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      minLength: 3,
      maxLength: 50,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      minLength: 10,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log("Error while hashing password");
    next(new Error("failed to hash password"));
  }
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) throw new Error("Password not set for this user");
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJWT = function (): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("jwt secret is not defined in .env");
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    secret,
    { expiresIn: "2d" }
  );
};

export const User: Model<IUser> = mongoose.model("User", userSchema);

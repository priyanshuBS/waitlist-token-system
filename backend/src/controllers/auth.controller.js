import asyncHandler from "../utils/asyncHandler.js";
import { loginSchema, signupSchema } from "../validations/auth.validation.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 2,
};

export const Signup = asyncHandler(async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(400, "Validation error", parsed.error.format());
  }

  const { fullName, email, phoneNumber, password } = parsed.data;

  const userExist = await User.findOne({ $or: [{ email }, { phoneNumber }] });

  if (userExist) {
    throw new ApiError(409, "User already registered");
  }

  const newUser = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role: "customer",
  });

  const token = newUser.generateToken();

  res.cookie("token", token, options);

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully!"));
});

export const Login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(400, "Validation error", parsed.error.format());
  }

  const { email, phoneNumber, password } = parsed.data;

  const user = await User.findOne({ $or: [{ email }, { phoneNumber }] }).select(
    "+password"
  );

  if (!user) {
    throw new ApiError(404, "User not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const token = user.generateToken();

  res.cookie("token", token, options);

  const userData = user.toObject();
  delete userData.password;

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "Login successfully!"));
});

export const Logout = asyncHandler(async (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json(new ApiResponse(200, {}, "Logout successfully!"));
});

export const googleAuthCallback = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Authentication Failed");

    const token = user.generateToken();

    res.cookie("token", token, options);

    return res
      .status(200)
      .json(new ApiResponse(200, { user, token }, "Google login successful"));
  }
});

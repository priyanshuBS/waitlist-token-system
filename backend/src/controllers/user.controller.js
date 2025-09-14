import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema, signupSchema } from "../validations/user.validation.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 2 * 24 * 60 * 60 * 1000,
};

export const Signup = asyncHandler(async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const { fullName, email, phoneNumber, password } = parsed.data;

  const userExist = await User.findOne({ $or: [{ phoneNumber }, { email }] });

  if (userExist) {
    throw new ApiError(409, "Already registered");
  }

  const newUser = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role: "user",
  });

  const token = newUser.generateToken();

  res.cookie("token", token, options);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { token, user: newUser },
        "User created successfully!"
      )
    );
});

export const Login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const { email, phoneNumber, password } = parsed.data;

  const userExist = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  }).select("+password");

  if (!userExist) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = userExist.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

  const token = userExist.generateToken();

  const user = userExist.toObject();
  delete user.password;

  res.cookie("token", token, options);

  return res
    .status(200)
    .json(new ApiResponse(200, { token, user }, "Login successfully"));
});

export const Logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout Successfully!"));
});

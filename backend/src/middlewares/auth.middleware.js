import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    throw new ApiError(401, "Authentication token missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("+password");
  console.log(user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
});

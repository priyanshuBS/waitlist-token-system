import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const protect = asyncHandler(async (req, _, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Not authorized, token expired");
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);
  if (!user) {
    throw new ApiError(401, "Not authorized, user not found");
  }

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, _, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied. Allowed roles: ${roles.join(", ")}`)
      );
    }
    next();
  };
};

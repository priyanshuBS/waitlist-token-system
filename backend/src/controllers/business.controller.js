import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Business } from "../models/business.model.js";
import { createBusinessSchema } from "../validations/business.validation.js";

export const getOwnerBusiness = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;

  const business = await Business.find({
    owner: ownerId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, business, "Owner businesses fetched successfully")
    );
});

export const createBusiness = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;

  const parsed = createBusinessSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const businessData = { ...parsed.data, owner: ownerId };

  const existing = await Business.findOne({
    owner: ownerId,
    name: businessData.name,
  });
  if (existing) {
    throw new ApiError(400, "You already have a business with this name");
  }

  const business = await Business.create(businessData);

  return res
    .status(201)
    .json(new ApiResponse(201, business, "Business created successfully"));
});

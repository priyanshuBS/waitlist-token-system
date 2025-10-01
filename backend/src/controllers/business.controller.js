import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Business } from "../models/business.model.js";
import { businessSchema } from "../validations/business.validation.js";

export const readBusiness = asyncHandler(async (req, res) => {
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

  const parsed = businessSchema.safeParse(req.body);

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

export const updatedBusiness = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  const { businessId } = req.params;

  const allowedUpdateSchema = businessSchema.omit({ owner: true }).partial();

  const parsed = allowedUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new ApiError(400, "Validation error", errors);
  }

  const business = await Business.findOneAndUpdate(
    {
      _id: businessId,
      owner: ownerId,
    },
    { $set: parsed.data },
    { new: true }
  );

  if (!business) {
    throw new ApiError(404, "Business not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, business, "Business updated successfully"));
});

export const deleteBusiness = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  const { businessId } = req.params;

  const business = await Business.findOneAndDelete({
    _id: businessId,
    owner: ownerId,
  });

  if (!business) {
    throw new ApiError(404, "Business not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, business, "Business deleted successfully"));
});

export const getNearbyBusinesses = asyncHandler(async (req, res) => {
  const { lng, lat, distance = 5000 } = req.query;

  let businesses = [];

  if (lng && lat) {
    businesses = await Business.find({
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(distance),
        },
      },
      isActive: true,
    });
  }

  if (!businesses.length) {
    businesses = await Business.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(10);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, businesses, "Businesses fetched successfully"));
});

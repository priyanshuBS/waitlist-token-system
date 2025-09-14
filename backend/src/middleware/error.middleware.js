import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const globalErrorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err?.statusCode)
      .json(new ApiResponse(err.statusCode, err.data ?? null, err.message));
  }

  console.log("Unexpected error!", err);

  return res.status(500).json(500, null, "Internal server error");
};

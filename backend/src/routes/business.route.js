import express from "express";
import {
  createBusiness,
  readBusiness,
  updatedBusiness,
  deleteBusiness,
  getNearbyBusinesses,
  popularBusiness,
  getBusinessById,
} from "../controllers/business.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", protect, readBusiness);
router.post("/create", protect, upload.array("images", 5), createBusiness);
router.post("/update", protect, updatedBusiness);
router.post("/delete", protect, deleteBusiness);
router.get("/nearby", protect, getNearbyBusinesses);
router.get("/popular", protect, popularBusiness);
router.get("/:id", protect, getBusinessById);

export default router;

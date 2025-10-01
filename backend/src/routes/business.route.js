import express from "express";
import {
  createBusiness,
  readBusiness,
  updatedBusiness,
  deleteBusiness,
  getNearbyBusinesses,
} from "../controllers/business.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, readBusiness);
router.post("/create", protect, createBusiness);
router.post("/update", protect, updatedBusiness);
router.post("/delete", protect, deleteBusiness);
router.get("/nearby", protect, getNearbyBusinesses);

export default router;

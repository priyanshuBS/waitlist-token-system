import express from "express";
import {
  createBusiness,
  readBusiness,
  updatedBusiness,
  deleteBusiness,
} from "../controllers/business.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, readBusiness);
router.post("/create", protect, createBusiness);
router.post("/update", protect, updatedBusiness);
router.post("/delete", protect, deleteBusiness);

export default router;

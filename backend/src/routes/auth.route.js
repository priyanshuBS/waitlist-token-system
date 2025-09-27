import express from "express";
import {
  Login,
  Logout,
  Signup,
  googleAuthCallback,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", protect, Logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleAuthCallback
);

export default router;

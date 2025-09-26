import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import passport from "./config/passport.js";

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

import userRouter from "./routes/user.route.js";

app.use(passport.initialize());
app.use("/api/user", userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;

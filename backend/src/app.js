import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import ApiError from "./utils/ApiError.js";
import passport from "./config/passport.js";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(passport.initialize());

import authRouter from "./routes/auth.route.js";

app.use("/api/auth", authRouter);

// global error middleware
// app.use((err, req, res, next) => {
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       errors: err.errors,
//     });
//   }

//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

export default app;

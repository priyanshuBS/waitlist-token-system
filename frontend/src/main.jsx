import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Routes";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_client_id}>
      <RouterProvider router={appRouter} />
      <Toaster position="top-center" reverseOrder={false} />
    </GoogleOAuthProvider>
  </StrictMode>
);

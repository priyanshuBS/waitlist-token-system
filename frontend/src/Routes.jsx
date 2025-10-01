import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchUserBusiness } from "./api/business";
import BusinessDash from "./pages/dashboard/BusinessDash";
import CreateBusiness from "./pages/business/CreateBusiness";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "home",
            element: <Home />,
            loader: fetchUserBusiness,
          },
          {
            path: "business/dashboard",
            element: <BusinessDash />,
          },
          {
            path: "business/create",
            element: <CreateBusiness />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default appRouter;

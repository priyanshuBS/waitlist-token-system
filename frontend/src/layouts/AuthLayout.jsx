import { Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* left */}
      <div className="hidden sm:flex flex-col items-center justify-center gap-12 bg-pink-300 w-1/2 text-[1.4rem]">
        <h2 className="text-5xl font-bold">LineUp</h2>
        <p>waitlist management system for small shops!</p>
        <button>Demo video</button>
      </div>
      {/* right */}
      <div className="sm:w-1/2 w-full flex items-center justify-center bg-gray-100">
        <div className="p-2 w-full sm:w-1/2">
          <Outlet />
        </div>
      </div>
      <div className="fixed top-6 left-6 cursor-pointer">
        <ArrowLeft className="w-6 h-6" onClick={() => window.history.back()} />
      </div>
    </div>
  );
};

export default AuthLayout;

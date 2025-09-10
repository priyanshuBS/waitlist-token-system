import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* left side */}
      <div className="hidden md:flex flex-col items-center justify-center gap-6 w-1/2 bg-blue-400">
        <h2 className="text-5xl font-bold text-gray-800">LineUp</h2>
        <p className="text-gray-600 font-semibold text-xl">
          Manage your customer easily!
        </p>
      </div>

      {/* right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:bg-gray-200">
        <div className="w-full max-w-md  md:max-w-xl bg-white md:shadow-xl md:rounded-2xl md:p-12 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

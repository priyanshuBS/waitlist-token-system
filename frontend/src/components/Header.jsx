import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="flex items-center justify-between bg-white h-16 shadow-lg px-4 md:h-20 md:px-12 z-40">
      {/* left */}
      <div>
        <h1 className="text-2xl text-blue-700 font-bold md:text-4xl">
          <Link to="/">LineUp</Link>
        </h1>
      </div>
      {/* right */}
      <div className="hidden md:flex items-center gap-12 font-medium text-[1.4rem]">
        <Link
          to="/auth/login"
          className="hover:underline text-gray-800 hover:text-black"
        >
          Login
        </Link>
        <Link
          to="/auth/signup"
          className="px-6 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
      {/* mobile */}
      <div className="md:hidden">
        <Menu className="w-7 h-7" onClick={() => setSidebarOpen(true)} />
      </div>

      {/* sidebar */}
      {sidebarOpen && (
        <div className="inset-0 fixed z-50 flex">
          <div
            className="flex-1 backdrop-blur-[1px]"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="w-8/12 bg-white shadow-lg animate-slide-in ">
            {/* menu */}
            <div className="flex items-center justify-between h-16 border-b px-4">
              <p className="text-xl font-medium">
                <Link to="/">Menu</Link>
              </p>
              <X className="w-7 h-7" onClick={() => setSidebarOpen(false)} />
            </div>
            {/* options */}
            <div className="flex flex-col font-medium text-[1.2rem] px-4 gap-6 mt-6 text-center">
              <Link
                to="/auth/login"
                className="bg-gray-600 py-2 rounded-xl text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-gray-600 py-2 rounded-xl text-white"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 flex items-center justify-between h-16 md:h-20 bg-white shadow-2xl px-6 md:px-12">
      {/* left */}
      <div>
        <h1 className="text-2xl md:text-4xl text-purple-800 font-bold cursor-pointer">
          <Link to="/">app</Link>
        </h1>
      </div>

      {/* right (desktop) */}
      <div className="hidden md:flex items-center gap-10 text-[1.1rem] md:text-[1.3rem] font-medium">
        <Link
          to="/auth/login"
          className="hover:text-purple-800 hover:underline hover:underline-offset-2 transition-colors duration-150"
        >
          Login
        </Link>
        <Link
          to="/auth/signup"
          className="bg-purple-600 px-6 py-2 text-white rounded-lg hover:bg-purple-800 transition-colors"
        >
          Signup
        </Link>
      </div>

      {/* mobile menu icon */}
      <div className="md:hidden">
        <Menu
          className="w-7 h-7 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* overlay + sidebar */}
      {isOpen && (
        <>
          {/* backdrop overlay */}
          <div
            className="fixed inset-0 bg-opacity-100 backdrop-blur-[1px] z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col">
            {/* top bar */}
            <div className="flex items-center justify-between px-4 h-16 border-b">
              <p className="text-purple-700 text-xl font-semibold">Menu</p>
              <X
                className="w-6 h-6 cursor-pointer hover:text-purple-700"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* nav section */}
            <nav className="flex flex-col gap-4 p-6 text-base font-medium text-gray-700">
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-md hover:bg-purple-600 transition"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 bg-purple-600 text-white rounded-md text-center hover:bg-purple-700 transition"
              >
                Signup
              </Link>
            </nav>

            <div className="mt-auto border-t px-6 py-4 text-sm text-gray-500">
              <p>© 2025 YourApp</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

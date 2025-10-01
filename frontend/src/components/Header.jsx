import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.5rem]">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-extrabold text-indigo-600 tracking-tight hover:scale-105 transition-transform"
            >
              LineUp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-[1.1rem] font-medium">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/tokens"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Tokens
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Settings
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-2 text-[1rem] rounded-xl hover:bg-indigo-700 hover:scale-105 transition transform font-semibold shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none text-2xl"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4 text-lg font-medium">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/tokens"
              className="text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Tokens
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

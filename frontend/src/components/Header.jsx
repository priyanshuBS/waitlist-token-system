import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 bg-white shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-12">
        {/* Logo */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <Link to="/">LineUp</Link>
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-[1.3rem]">
          <Link
            to="/login"
            className="relative text-gray-700 hover:text-black transition-colors after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all"
          >
            Signup
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-7 h-7 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300">
            <div className="flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)}>
                <FiX className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <Sidebar setSidebarOpen={setSidebarOpen} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="flex items-center justify-between bg-white h-16 shadow-lg px-4 md:h-20 md:px-12 z-40">
      <div>
        <h1 className="text-2xl text-blue-700 font-bold md:text-4xl">
          <Link to="/">LineUp</Link>
        </h1>
      </div>
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
      {sidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen} />}
    </header>
  );
};

export default Header;

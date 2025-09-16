import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { logoutApi } from "../api/auth";
import toast from "react-hot-toast";

const Sidebar = ({ setSidebarOpen }) => {
  const handleLogout = async () => {
    try {
      await logoutApi();
      toast.success("Logout successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    // cover whole screen
    <div className="inset-0 fixed z-50 flex">
      {/* remaning part then sidebar */}
      <div
        className="flex-1 backdrop-blur-[1px]"
        onClick={() => setSidebarOpen(false)}
      ></div>
      {/* sidebar */}
      <div className="w-8/12 bg-white shadow-lg animate-slide-in ">
        <div className="flex items-center justify-between h-16 border-b px-4">
          <p className="text-xl font-medium">
            <Link to="/">Menu</Link>
          </p>
          <X className="w-7 h-7" onClick={() => setSidebarOpen(false)} />
        </div>
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
          <button
            className="bg-gray-600 py-2 rounded-xl text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

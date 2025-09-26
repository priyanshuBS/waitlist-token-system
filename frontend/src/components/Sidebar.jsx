import { Link, useLocation } from "react-router-dom";
import { FiX, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { logoutApi } from "../api/auth";
import toast from "react-hot-toast";

const Sidebar = ({ setSidebarOpen }) => {
  const location = useLocation(); // to highlight active link

  const handleLogout = async () => {
    try {
      await logoutApi();
      toast.success("Logout successful!");
      setSidebarOpen(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const links = [
    { name: "Login", to: "/login", icon: <FiLogIn className="w-5 h-5" /> },
    {
      name: "Signup",
      to: "/signup",
      icon: <FiUserPlus className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/25 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="w-8/12 max-w-xs bg-white shadow-2xl rounded-tr-3xl rounded-br-3xl transform transition-transform duration-300 ease-in-out animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b px-6">
          <p className="text-xl font-bold tracking-wide text-gray-800">Menu</p>
          <FiX
            className="w-7 h-7 cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4 mt-8 px-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-5 py-3 rounded-xl font-medium text-[1.1rem] transition-all ${
                location.pathname === link.to
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white hover:shadow-md"
              }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-3 rounded-xl font-medium text-[1.1rem] bg-red-500 text-white hover:bg-red-600 shadow-md transition-all"
          >
            <FiLogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

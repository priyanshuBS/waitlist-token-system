import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Waitlist App
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
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
          <div className="flex items-center">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

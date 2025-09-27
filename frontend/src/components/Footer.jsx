import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold text-indigo-500">
            Waitlist App
          </h2>
          <p className="text-gray-400 text-sm mt-1 hidden sm:block">
            Simplifying queue management for small shops
          </p>
        </div>

        {/* Links - show only on medium+ screens */}
        <div className="hidden sm:flex space-x-6 mt-4 sm:mt-0">
          <Link
            to="/about"
            className="text-gray-300 hover:text-white transition text-sm"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition text-sm"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-gray-300 hover:text-white transition text-sm"
          >
            Privacy
          </Link>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Waitlist App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

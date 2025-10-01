import { Link } from "react-router-dom";
import { FaTicketAlt, FaClock, FaGlobe } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Simplify Queue Management <br />
          <span className="text-indigo-600">with Digital Tokens</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Say goodbye to long lines and chaos. Customers join queues online and
          track tokens in real time, while you manage your business smoothly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
          >
            🚀 Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition transform hover:scale-105 shadow-md"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14">
            Why Choose Our Waitlist App?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-tr from-indigo-50 to-white rounded-3xl shadow hover:shadow-xl hover:scale-105 transition transform text-center">
              <div className="flex justify-center mb-6">
                <FaTicketAlt className="text-indigo-600 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Easy Token System
              </h3>
              <p className="text-gray-600">
                Generate and manage digital tokens instantly for customers with
                one click.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-tr from-indigo-50 to-white rounded-3xl shadow hover:shadow-xl hover:scale-105 transition transform text-center">
              <div className="flex justify-center mb-6">
                <FaClock className="text-indigo-600 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Customers track their token status and estimated wait time in
                real time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-tr from-indigo-50 to-white rounded-3xl shadow hover:shadow-xl hover:scale-105 transition transform text-center">
              <div className="flex justify-center mb-6">
                <FaGlobe className="text-indigo-600 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Provide services in English, Hindi, and more with a localized
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Waitlist Token System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

import { Link } from "react-router-dom";
import { FaTicketAlt, FaClock, FaGlobe } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-24 md:py-32">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Simplify Queue Management <br />
          <span className="text-indigo-600">with Digital Tokens</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl">
          Manage your shop’s waitlist effortlessly. Customers can join the queue
          online and track their token in real time. No more crowding or
          confusion!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition shadow"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Waitlist App?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-indigo-50 rounded-2xl shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <FaTicketAlt className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Token System
              </h3>
              <p className="text-gray-600">
                Generate and manage digital tokens for customers with just one
                click.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-indigo-50 rounded-2xl shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <FaClock className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Customers can track their token status and estimated wait time
                instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-indigo-50 rounded-2xl shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <FaGlobe className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Serve customers in English, Hindi, and more with localized UI
                options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

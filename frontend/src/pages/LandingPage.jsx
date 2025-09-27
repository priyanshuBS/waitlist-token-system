import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 my-32 md:my-0">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Simplify Queue Management <br />
          <span className="text-indigo-600">with Digital Tokens</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl">
          Manage your shop’s waitlist effortlessly. Customers can join the queue
          online and track their token in real time. No more crowding or
          confusion!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition text-center"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition text-center"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10 sm:mb-12">
            Why Choose Our Waitlist App?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-600">
                Easy Token System
              </h3>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
                Generate and manage digital tokens for customers with just one
                click.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-600">
                Real-Time Updates
              </h3>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
                Customers can track their token status and estimated wait time
                instantly.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-600">
                Multi-Language Support
              </h3>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
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

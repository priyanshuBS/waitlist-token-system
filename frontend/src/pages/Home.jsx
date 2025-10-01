import { useLoaderData, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const myBusiness = useLoaderData();
  const navigate = useNavigate();

  // If business exists → redirect to dashboard
  if (myBusiness?.data?.length > 0) {
    return <Navigate to="/business/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Smart <span className="text-indigo-600">Waitlist</span> & Token System
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Skip the hassle of queues. Join waitlists instantly as a customer or
          manage your shop, clinic, or business with a modern token management
          solution.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/business/create")}
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
          >
            🚀 Create Your Business
          </button>
          <button className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-2xl border-2 border-indigo-200 shadow-sm hover:border-indigo-400 hover:scale-105 transition-all">
            Explore Services
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              🙋 For Customers
            </h3>
            <p className="text-gray-600">
              Join queues remotely, check waiting times, and get notified when
              it’s your turn.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              🏪 For Businesses
            </h3>
            <p className="text-gray-600">
              Create & manage your business, generate tokens, and serve
              customers efficiently.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              📊 Real-Time Tracking
            </h3>
            <p className="text-gray-600">
              Monitor waitlists, track serving progress, and keep both staff &
              customers updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

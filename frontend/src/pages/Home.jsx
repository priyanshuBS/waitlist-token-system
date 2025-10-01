import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Home = () => {
  const myBusiness = useLoaderData(); // Your fetched business data
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for demo purposes
  const nearbyBusinesses = [
    { id: 1, name: "Coffee Corner", category: "Cafe", distance: "0.5 km" },
    { id: 2, name: "Fresh Mart", category: "Grocery", distance: "1 km" },
    { id: 3, name: "Tech Hub", category: "Electronics", distance: "1.2 km" },
  ];

  const popularBusinesses = [
    { id: 1, name: "Pizza Planet", category: "Restaurant", rating: 4.8 },
    { id: 2, name: "Glow Salon", category: "Beauty", rating: 4.6 },
    { id: 3, name: "Book Haven", category: "Bookstore", rating: 4.9 },
    { id: 4, name: "Healthy Bites", category: "Cafe", rating: 4.7 },
  ];

  // Redirect if user has a business
  if (myBusiness?.data?.length > 0) {
    navigate("/business/dashboard");
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-10">
      {/* Search Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Find Businesses Near You
        </h1>
        <p className="text-gray-600 mb-6">
          Search for your favorite businesses, join their waitlists, or create
          your own business today!
        </p>
        <div className="flex items-center max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search for business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-3 text-gray-700 focus:outline-none"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
            Search
          </button>
        </div>
      </div>

      {/* Nearby Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Nearby Businesses
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {nearbyBusinesses.map((b) => (
            <div
              key={b.id}
              className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">{b.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{b.category}</p>
              <p className="text-indigo-600 font-medium text-sm">
                {b.distance}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Popular Businesses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBusinesses.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">{b.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{b.category}</p>
              <p className="text-yellow-500 font-semibold text-sm">
                ⭐ {b.rating}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Create Your Business */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/business/create")}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 shadow-lg transition transform hover:scale-105"
        >
          + Create Your Business
        </button>
      </div>
    </div>
  );
};

export default Home;

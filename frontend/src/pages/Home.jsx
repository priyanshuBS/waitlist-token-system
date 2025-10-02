import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { nearbyBusinessApi, popularBusinessApi } from "../api/business";
import BusinessCard from "../components/business/BusinessCard";

const Home = () => {
  const myBusiness = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (myBusiness.length > 0) {
      navigate("/business/dashboard");
    }
  }, [myBusiness, navigate]);

  const { data: nearbyBusinesses = [], isLoading: nearbyLoading } = useQuery({
    queryKey: ["nearbyBusinesses"],
    queryFn: nearbyBusinessApi,
  });

  const { data: popularBusinesses = [], isLoading: popularLoading } = useQuery({
    queryKey: ["popularBusinesses"],
    queryFn: popularBusinessApi,
  });

  const loading = nearbyLoading || popularLoading;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-4 md:px-20 py-10">
      {/* Search Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Discover & Connect with Businesses
        </h1>
        <p className="text-gray-600 mb-6">
          Search nearby shops, book appointments, join waitlists, or start your
          own business today 🚀
        </p>
        <div className="flex items-center max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
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

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">Loading businesses...</p>
      )}

      {/* Nearby Businesses */}
      {!loading && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            📍 Nearby Businesses
          </h2>
          {nearbyBusinesses.length === 0 ? (
            <p className="text-gray-500">No businesses found near you.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {nearbyBusinesses.map((b) => (
                <BusinessCard
                  key={b._id}
                  business={b}
                  onClick={() => navigate(`/business/${b._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Popular Businesses */}
      {!loading && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            ⭐ Popular Businesses
          </h2>
          {popularBusinesses.length === 0 ? (
            <p className="text-gray-500">No popular businesses yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {popularBusinesses.map((b) => (
                <BusinessCard
                  key={b._id}
                  business={b}
                  onClick={() => navigate(`/business/${b._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* CTA Button */}
      <div className="text-center mt-12">
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

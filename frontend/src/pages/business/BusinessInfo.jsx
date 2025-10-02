import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBusinessByIdApi } from "../../api/business";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaHospital,
} from "react-icons/fa";

const formatTime = (time) => {
  if (!time) return "N/A";
  let [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const BusinessInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: business,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["businessInfo", id],
    queryFn: () => getBusinessByIdApi(id),
  });

  if (isLoading)
    return (
      <p className="text-center mt-20 text-gray-500">Loading business...</p>
    );
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">
        Error loading business details.
      </p>
    );
  if (!business)
    return (
      <p className="text-center mt-20 text-gray-500">Business not found</p>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          src={business.images?.[0] || "/placeholder.jpg"}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            {business.name}
          </h1>
          <p className="text-md md:text-lg mt-1">{business.mainCategory}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 mt-10 space-y-10">
        {/* Description & Tags */}
        <div className="bg-white shadow-md rounded-3xl p-6 md:p-10">
          <p className="text-gray-700 text-lg md:text-xl mb-4">
            {business.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {business.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-600 mt-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <span className="text-sm md:text-base">
                {business.location?.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-green-500 text-xl" />
              <span className="text-sm md:text-base">
                {formatTime(business.openingHours?.start)} -{" "}
                {formatTime(business.openingHours?.end)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400 text-xl" />
              <span className="text-sm md:text-base">
                {business.rating?.toFixed(1) || "0.0"} / 5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-indigo-500 text-xl" />
              <span className="text-sm md:text-base">
                {business.queue?.length || 0} people in queue
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        {business.services?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Available Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {business.services.map((s) => (
                <div
                  key={s._id}
                  className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {s.name}
                  </h3>
                  <p className="text-gray-600 mt-2">₹{s.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Duration: {s.durationMinutes} min
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {business.subCategory?.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Specialties
            </h2>
            <div className="flex flex-wrap gap-3">
              {business.subCategory.map((sub, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Queue / Booking Button */}
        <div className="text-center my-10">
          <button
            onClick={() => navigate(`/business/${id}/queue`)}
            className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg md:text-xl hover:bg-indigo-700 shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            Join Queue / Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

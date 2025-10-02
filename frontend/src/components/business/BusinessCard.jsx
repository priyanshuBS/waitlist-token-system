import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";

// Utility to convert 24-hour to 12-hour format
const formatTime = (time) => {
  if (!time) return "N/A";
  let [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 -> 12, 13 -> 1
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const BusinessCard = ({ business, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden border border-gray-100 group"
    >
      {/* Image Section */}
      <div className="relative h-44 w-full">
        <img
          src={business.images?.[0] || "/placeholder.jpg"}
          alt={business.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        {/* Category */}
        <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full shadow">
          {business.mainCategory}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {business.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {business.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100"
            >
              #{tag}
            </span>
          ))}
          {business.tags?.length > 2 && (
            <span className="text-xs text-gray-400">
              +{business.tags.length - 2}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-auto space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500" />
            <span className="truncate">
              {business.location?.city}, {business.location?.state}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-green-500" />
            <span>
              {formatTime(business.openingHours?.start)} -{" "}
              {formatTime(business.openingHours?.end)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaStar className="text-yellow-400" />
            <span>{business.rating?.toFixed(1) || "0.0"} / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;

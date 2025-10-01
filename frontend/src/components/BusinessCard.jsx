import React from "react";

// Example: you can pass a business object as props
const BusinessCard = ({ business }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* Business image */}
      {business.images && business.images.length > 0 ? (
        <img
          src={business.images[0]}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="p-4">
        {/* Business name */}
        <h2 className="font-bold text-xl mb-2">{business.name}</h2>

        {/* Category */}
        <p className="text-gray-600 mb-2">
          {business.mainCategory}{" "}
          {business.subCategory && business.subCategory.length > 0
            ? `> ${business.subCategory.join(", ")}`
            : ""}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-2">
          {business.description?.length > 100
            ? business.description.substring(0, 100) + "..."
            : business.description}
        </p>

        {/* Services */}
        {business.services && business.services.length > 0 && (
          <div className="mb-2">
            <strong>Services:</strong>{" "}
            {business.services.map((s) => s.name).join(", ")}
          </div>
        )}

        {/* Location */}
        <p className="text-gray-600 text-sm mb-2">
          📍 {business.location?.address}, {business.location?.city},{" "}
          {business.location?.state ? business.location.state + ", " : ""}
          {business.location?.country}
        </p>

        {/* Rating */}
        <p className="text-yellow-500 font-semibold mb-2">
          ⭐ {business.rating?.toFixed(1)} / 5
        </p>

        {/* Tags */}
        {business.tags && business.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {business.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;

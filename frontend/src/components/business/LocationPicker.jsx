import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Input from "../UI/Input";

function DraggableMarker({ marker, setMarker, setFormData }) {
  const map = useMap();

  useEffect(() => {
    if (marker) {
      map.flyTo(marker, 16, { duration: 1.5 }); // Smooth zoom to close view
    }
  }, [marker, map]);

  const handleDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMarker([lat, lng]);
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, coordinates: [lng, lat] },
    }));
  };

  if (!marker) return null;

  return (
    <Marker
      position={marker}
      draggable
      eventHandlers={{ dragend: handleDragEnd }}
    />
  );
}

const LocationPicker = ({ formData, setFormData }) => {
  const defaultCenter = [20.5937, 78.9629];
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) return setSuggestions([]);
      try {
        const res = await axios.get(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            query
          )}&limit=5&lang=en`
        );
        setSuggestions(res.data.features);
      } catch (err) {
        console.error(err);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place) => {
    const [lng, lat] = place.geometry.coordinates;
    setMarker([lat, lng]);

    const city = place.properties.city || place.properties.state || "";
    const state = place.properties.state || "";
    const country = place.properties.country || "India";

    setFormData({
      ...formData,
      location: {
        ...formData.location,
        address: place.properties.name + (city ? ", " + city : ""),
        city,
        state,
        country,
        coordinates: [lng, lat],
      },
    });
    setQuery(place.properties.name + (city ? ", " + city : ""));
    setSuggestions([]);
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
        <FaMapMarkerAlt className="text-indigo-500" /> Location
      </h4>

      {/* Search Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter Address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
        />

        {/* Suggestions Box */}
        {suggestions.length > 0 && (
          <div className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="p-3 cursor-pointer hover:bg-indigo-50 transition flex flex-col"
                onClick={() => handleSelect(s)}
              >
                <span className="font-medium text-gray-800">
                  {s.properties.name}
                </span>
                <span className="text-sm text-gray-500">
                  {s.properties.city || s.properties.state},{" "}
                  {s.properties.country || "India"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={marker || defaultCenter}
          zoom={5}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DraggableMarker
            marker={marker}
            setMarker={setMarker}
            setFormData={setFormData}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;

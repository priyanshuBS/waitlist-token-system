import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaPlus, FaMapMarkerAlt, FaTag } from "react-icons/fa";

function DraggableMarker({ marker, setMarker, setFormData }) {
  useMapEvents({
    dragend() {
      if (marker) {
        const mapMarker = marker;
        setMarker([mapMarker[0], mapMarker[1]]);
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [mapMarker[1], mapMarker[0]],
          },
        }));
      }
    },
  });
  return null;
}

function CreateBusiness({ ownerId }) {
  const defaultCenter = [20.5937, 78.9629]; // India center
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mainCategory: "",
    subCategory: [],
    services: [{ name: "", price: "", durationMinutes: "" }],
    location: {
      address: "",
      city: "",
      state: "",
      country: "India",
      coordinates: null,
    },
    openingHours: { start: "", end: "" },
    dailyLimit: 0,
    tags: [],
    images: [],
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [marker, setMarker] = useState(null);

  // Photon API suggestions
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

  const handleSelectSuggestion = (place) => {
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

  const handleServiceChange = (index, key, value) => {
    const newServices = [...formData.services];
    newServices[index][key] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { name: "", price: "", durationMinutes: "" },
      ],
    });
  };

  const handleTagsChange = (e) => {
    setFormData({ ...formData, tags: e.target.value.split(",") });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files.map((f) => f.name) }); // store names or upload to backend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/business", {
        owner: ownerId,
        ...formData,
      });
      alert("Business registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Error registering business");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Register Your Business
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Info */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Business Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Main Category"
                value={formData.mainCategory}
                onChange={(e) =>
                  setFormData({ ...formData, mainCategory: e.target.value })
                }
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Sub Categories (comma separated)"
                value={formData.subCategory.join(",")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subCategory: e.target.value.split(","),
                  })
                }
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
              <FaPlus /> Services
            </h4>
            {formData.services.map((service, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service.name}
                  onChange={(e) =>
                    handleServiceChange(idx, "name", e.target.value)
                  }
                  required
                  className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={service.price}
                  onChange={(e) =>
                    handleServiceChange(idx, "price", e.target.value)
                  }
                  className="w-24 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  placeholder="Duration (min)"
                  value={service.durationMinutes}
                  onChange={(e) =>
                    handleServiceChange(idx, "durationMinutes", e.target.value)
                  }
                  className="w-28 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Add Service
            </button>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Location
            </h4>
            <input
              type="text"
              placeholder="Enter Address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="border rounded-xl max-h-40 overflow-y-auto mt-1">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="p-2 cursor-pointer hover:bg-indigo-100"
                  onClick={() => handleSelectSuggestion(s)}
                >
                  {s.properties.name}, {s.properties.city || s.properties.state}
                </div>
              ))}
            </div>
            <MapContainer
              center={marker || defaultCenter}
              zoom={5}
              style={{
                height: "300px",
                borderRadius: "1rem",
                marginTop: "10px",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {marker && <Marker position={marker} draggable />}
              <DraggableMarker
                marker={marker}
                setMarker={setMarker}
                setFormData={setFormData}
              />
            </MapContainer>
          </div>

          {/* Opening Hours & Daily Limit */}
          <div className="flex gap-3">
            <input
              type="time"
              placeholder="Start"
              value={formData.openingHours.start}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  openingHours: {
                    ...formData.openingHours,
                    start: e.target.value,
                  },
                })
              }
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="time"
              placeholder="End"
              value={formData.openingHours.end}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  openingHours: {
                    ...formData.openingHours,
                    end: e.target.value,
                  },
                })
              }
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              placeholder="Daily Limit"
              value={formData.dailyLimit}
              onChange={(e) =>
                setFormData({ ...formData, dailyLimit: e.target.value })
              }
              className="w-32 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags.join(",")}
            onChange={handleTagsChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Images */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition"
          >
            Register Business
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBusiness;

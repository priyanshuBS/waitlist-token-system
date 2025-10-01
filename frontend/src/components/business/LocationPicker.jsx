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
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700 flex items-center gap-2">
        <FaMapMarkerAlt /> Location
      </h4>
      <Input
        type="text"
        placeholder="Enter Address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="border rounded-xl max-h-40 overflow-y-auto mt-1">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="p-2 cursor-pointer hover:bg-indigo-100"
            onClick={() => handleSelect(s)}
          >
            {s.properties.name}, {s.properties.city || s.properties.state}
          </div>
        ))}
      </div>
      <MapContainer
        center={marker || defaultCenter}
        zoom={5}
        style={{ height: "350px", borderRadius: "1rem", marginTop: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DraggableMarker
          marker={marker}
          setMarker={setMarker}
          setFormData={setFormData}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;

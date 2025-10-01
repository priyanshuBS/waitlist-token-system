import { useState } from "react";
import Input from "../../components/UI/Input";
import ServiceInput from "../../components/business/ServicesInput";
import LocationPicker from "../../components/business/LocationPicker";
import ImagesUpload from "../../components/business/ImagesUpload";

const CreateBusiness = () => {
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
    tags: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Register Your Business
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
          />
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description..."
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-0 transition`}
          ></textarea>
          <div className="flex gap-4">
            <Input
              name="mainCategory"
              type="text"
              value={formData.mainCategory}
              onChange={handleChange}
              placeholder="Main Category"
            />
            <Input
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Sub Category"
            />
          </div>
          <ServiceInput formData={formData} setFormData={setFormData} />
          <LocationPicker formData={formData} setFormData={setFormData} />
          <div className="flex gap-4">
            <Input
              type="time"
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
            />
            <Input
              type="time"
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
            />
          </div>
          <Input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags.join(" ")}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value.split(" ") })
            }
          />
          <ImagesUpload formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition cursor-pointer"
          >
            Register Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;

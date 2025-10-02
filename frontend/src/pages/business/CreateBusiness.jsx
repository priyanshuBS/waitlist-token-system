import { useState } from "react";
import Input from "../../components/UI/Input";
import ServiceInput from "../../components/business/ServicesInput";
import LocationPicker from "../../components/business/LocationPicker";
import ImagesUpload from "../../components/business/ImagesUpload";
import { useMutation } from "@tanstack/react-query";
import { createBusinessApi } from "../../api/business";
import toast from "react-hot-toast";

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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createBusinessApi,
    onSuccess: () => {
      toast.success("Business created successfully!");
      setFormData({
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
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("mainCategory", formData.mainCategory);
    form.append("subCategory", JSON.stringify(formData.subCategory));
    form.append("services", JSON.stringify(formData.services));
    form.append("location", JSON.stringify(formData.location));
    form.append("openingHours", JSON.stringify(formData.openingHours));
    form.append("tags", JSON.stringify(formData.tags));

    formData.images.forEach((file) => {
      form.append("images", file);
    });
    mutate(form);
    console.log(form);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
          Register Your Business
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <Input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
          />

          {/* Description */}
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your business..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-0 shadow-sm transition"
          ></textarea>

          {/* Categories */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              name="mainCategory"
              type="text"
              value={formData.mainCategory}
              onChange={handleChange}
              placeholder="Main Category"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
            />
            <Input
              name="subCategory"
              type="text"
              value={formData.subCategory.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subCategory: e.target.value.split(", "),
                })
              }
              placeholder="Sub Category (comma separated)"
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
            />
          </div>

          {/* Services */}
          <ServiceInput formData={formData} setFormData={setFormData} />

          {/* Location Picker */}
          <LocationPicker formData={formData} setFormData={setFormData} />

          {/* Opening Hours */}
          <div className="flex flex-col sm:flex-row gap-8">
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
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
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
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
            />
          </div>

          {/* Tags */}
          <Input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value.split(", ") })
            }
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl"
          />

          {/* Images Upload */}
          <ImagesUpload formData={formData} setFormData={setFormData} />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl hover:scale-105 transform transition-all shadow-lg cursor-pointer"
          >
            {isPending ? "Submitting..." : "Register Business"}
          </button>
        </form>
        {isError && (
          <p className="text-red-500 mt-2">
            {error?.message || "Something went wrong!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateBusiness;

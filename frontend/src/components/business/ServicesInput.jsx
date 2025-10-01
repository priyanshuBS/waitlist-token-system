import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "../UI/Input";

const ServiceInput = ({ formData, setFormData }) => {
  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { name: "", price: "", durationMinutes: "" },
      ],
    });
  };

  const removeService = (index) => {
    const newServices = [...formData.services];
    newServices.splice(index, 1);
    setFormData({ ...formData, services: newServices });
  };

  const handleChange = (index, key, value) => {
    const newServices = [...formData.services];
    newServices[index][key] = value;
    setFormData({ ...formData, services: newServices });
  };
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-700 flex items-center gap-2 text-[1.2rem]">
        <FaPlus /> Services
      </h4>
      {formData.services.map((service, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Service Name"
            onChange={(e) => handleChange(idx, "name", e.target.value)}
            value={service.name}
          />
          <Input
            type="number"
            placeholder="Price"
            onChange={(e) => handleChange(idx, "price", e.target.value)}
            value={service.price}
          />
          <Input
            type="number"
            placeholder="Duration (min)"
            onChange={(e) =>
              handleChange(idx, "durationMinutes", e.target.value)
            }
            value={service.durationMinutes}
          />
          {formData.services.length > 1 && (
            <button
              type="button"
              onClick={() => removeService(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addService}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        <FaPlus /> Add Service
      </button>
    </div>
  );
};

export default ServiceInput;

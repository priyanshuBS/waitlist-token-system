import { FaTimes, FaImage } from "react-icons/fa";

const ImagesUpload = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };
  const removeImage = (idx) => {
    const newImages = [...formData.images];
    newImages.splice(idx, 1);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold flex items-center gap-2 text-gray-700">
        <FaImage /> Images
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="flex flex-wrap gap-3 mt-2">
        {formData.images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-24 h-24 object-cover rounded-xl shadow"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesUpload;

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
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
        <FaImage className="text-indigo-500" /> Upload Images
      </label>

      {/* File Input */}
      <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
        <span className="text-gray-400">Click or drag images here</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Preview Images */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {formData.images.map((img, idx) => (
            <div
              key={idx}
              className="relative group w-full h-32 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-80 hover:opacity-100 hover:scale-110 transition"
              >
                <FaTimes size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesUpload;

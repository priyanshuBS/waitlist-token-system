const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  extra,
}) => {
  return (
    <div className="mb-4 w-full relative">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-600 text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-0 transition
          ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}`}
      />

      {/* Extra element */}
      {extra && <div className="absolute right-3 top-3">{extra}</div>}

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

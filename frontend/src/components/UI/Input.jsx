const Input = ({ label, error, type, name, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-md font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={onChange}
        className="px-4 py-2.5 w-full text-[1.rem] border focus:border-none focus:ring-2 focus:ring-blue-600 focus:outline-none rounded-md text-[1.1rem]"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;

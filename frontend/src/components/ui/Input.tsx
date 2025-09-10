import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 text-left w-full">
      {label && (
        <label htmlFor={props?.name} className="font-medium text-gray-600">
          {label}
        </label>
      )}
      <input
        {...props}
        id={props?.name}
        className={`px-4 py-4 rounded-xl outline-none w-full border text-[1.3rem] ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-400 focus:border-0"
            : "border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-0"
        } ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

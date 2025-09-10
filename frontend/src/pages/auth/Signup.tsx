import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="space-y-10">
      <h2 className="text-4xl text-gray-700 font-bold text-center">
        Create Account
      </h2>
      {/* toogle */}
      <div className="flex gap-4 text-[1rem]">
        <button
          onClick={() => setMode("email")}
          className={`px-4 py-4 rounded-2xl w-full ${
            mode === "email" ? "bg-blue-600 text-white" : "bg-gray-200"
          } cursor-pointer`}
        >
          Use Email
        </button>
        <button
          onClick={() => setMode("phone")}
          className={`px-4 py-4 rounded-2xl w-full ${
            mode === "phone" ? "bg-blue-600 text-white" : "bg-gray-200"
          } cursor-pointer`}
        >
          Use Phone
        </button>
      </div>

      <form className="space-y-8">
        <Input
          type="text"
          name="fullName"
          placeholder="Enter you name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {mode === "email" ? (
          <Input
            type="email"
            name="email"
            placeholder="Enter you email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        ) : (
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        )}
        <Input
          type="password"
          name="password"
          placeholder="******"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 p-4 rounded-xl text-white text-[1.3rem] hover:bg-blue-500 cursor-pointer">
          Signup
        </button>
      </form>
      <p className="text-gray-700 text-center text-[1rem]">
        Already account have{" "}
        <Link to="/auth/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;

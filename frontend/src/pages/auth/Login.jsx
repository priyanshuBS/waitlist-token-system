import { useState } from "react";
import Input from "../../components/UI/Input";
import { Link } from "react-router-dom";
import { loginApi } from "../../api/auth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [mode, setMode] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      mode === "email"
        ? { email: formData.email, password: formData.password }
        : { phoneNumber: formData.phoneNumber, password: formData.password };

    try {
      const { data } = await loginApi(payload);
      toast.success("Login successful!");
      setFormData({ email: "", phoneNumber: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2 sm:p-4">
      <div className="w-full max-w-md p-4 sm:p-8 bg-white rounded-3xl shadow-2xl">
        <h3 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Welcome Back!
        </h3>

        {/* Mode Selection */}
        <div className="flex gap-4 mb-6 text-[1rem]">
          <button
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === "email"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setMode("email")}
          >
            Use Email
          </button>
          <button
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              mode === "phone"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setMode("phone")}
          >
            Use Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "email" ? (
            <Input
              type="email"
              name="email"
              placeholder="john-doe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition w-full"
            />
          ) : (
            <Input
              type="text"
              name="phoneNumber"
              placeholder="6203969000"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition w-full"
            />
          )}

          <Input
            type="password"
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition w-full"
          />

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 rounded-lg font-medium text-[1.1rem] hover:bg-blue-700 transition-shadow shadow-md"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() =>
              (window.location.href = "http://localhost:8000/api/user/google")
            }
            className="w-full py-2.5 text-white bg-red-500 rounded-lg font-medium text-[1.1rem] hover:bg-red-600 flex items-center justify-center gap-2 shadow-md transition-shadow"
          >
            <FaGoogle className="w-5 h-5" />
            Login with Google
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

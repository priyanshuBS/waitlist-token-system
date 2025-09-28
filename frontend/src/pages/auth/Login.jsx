import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input";
import toast from "react-hot-toast";
import { loginSchema } from "../../validations/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";

const Login = () => {
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    const singleSchema = loginSchema.shape[name];
    if (!value) return "";
    if (!singleSchema) return "";

    const result = loginSchema.safeParse(value);
    if (!result.success) {
      return result.error.issues[0].message;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Login data: ", data);
      toast.success("Login successfull");
    },
    onError: () => {
      toast.error("Login failed. Try again");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginSchema.safeParse();
    setErrors({});
    mutate(form);
    setForm({ email: "", phoneNumber: "", password: "" });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-50 px-4"
      style={{ minHeight: "calc(100vh - 4.8rem)" }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Email / Phone Toggle */}
        <div className="flex justify-center mb-7 bg-gray-100 rounded-full">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 py-2.5 rounded-full font-medium transition cursor-pointer ${
              method === "email"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod("phone")}
            className={`flex-1 py-2.5 rounded-full font-medium transition cursor-pointer ${
              method === "phone"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleLogin}>
          {method === "email" ? (
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              error={errors.email}
            />
          ) : (
            <Input
              name="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="9256870000"
              error={errors.phoneNumber}
            />
          )}

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password}
            extra={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 font-medium cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 shadow-md transition mt-2 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <div className="my-4 text-center text-gray-400 font-medium">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center font-medium hover:bg-gray-100 transition shadow-sm cursor-pointer"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

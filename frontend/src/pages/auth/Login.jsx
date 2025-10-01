import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input";
import { loginSchema } from "../../validations/auth.validation";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, loginStatus } = useAuth();
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const singleSchema = loginSchema.shape[name];
    if (!value) return "";
    if (!singleSchema) return "";

    const result = singleSchema.safeParse(value);
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

  const handleLogin = (e) => {
    e.preventDefault();
    loginSchema.safeParse();
    setErrors({});
    login(form, {
      onSuccess: () => {
        navigate("/home");
      },
    });
    setForm({ email: "", phoneNumber: "", password: "" });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  return (
    <div
      className="flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      style={{ minHeight: "calc(100vh - 4.8rem)" }}
    >
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl">
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {/* Email / Phone Toggle */}
        <div className="flex justify-center mb-7 bg-gray-100 rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 py-2.5 font-medium transition cursor-pointer ${
              method === "email"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod("phone")}
            className={`flex-1 py-2.5 font-medium transition cursor-pointer ${
              method === "phone"
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
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
                className="text-sm text-indigo-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-md cursor-pointer"
          >
            {loginStatus.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 font-medium text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 font-medium hover:bg-gray-50 transition shadow-sm cursor-pointer"
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

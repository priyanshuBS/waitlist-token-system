import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input";

const Signup = () => {
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    //
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-50 px-4"
      style={{ minHeight: "calc(100vh - 4.8rem)" }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Create Your Account
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

        <form onSubmit={handleSignup}>
          <Input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Jhon Doe"
            error={errors.fullName}
          />

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
            Sign Up
          </button>
        </form>
        {/* Already have account */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="my-4 text-center text-gray-400 font-medium">or</div>
        <button
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center font-medium hover:bg-gray-100 transition shadow-sm cursor-pointer"
        >
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;

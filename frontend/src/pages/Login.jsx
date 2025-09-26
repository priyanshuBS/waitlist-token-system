import { useState } from "react";
import Input from "../components/UI/Input";
import { Link } from "react-router-dom";
import { loginApi, googleApi } from "../api/auth";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

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
      console.log(formData);
      const { data } = await loginApi(payload);
      console.log(data.data.user);
      toast.success("Login successfull!");
      setFormData({
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await googleApi(credentialResponse.credential);
      console.log(res);
      toast.success("Login successfull");
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  const handleError = () => {
    toast.error("Google login failed.");
  };
  return (
    <div className="p-6 shadow-2xl bg-white text-center rounded-2xl">
      <h3 className="text-4xl font-bold text-red-400 py-6">Welcome Back!</h3>

      {/* select mode */}
      <div className="flex items-center gap-4 mb-6 mt-4 w-full text-[1.1rem] ">
        <button
          className={`w-full py-2.5 rounded-md ${
            mode === "email"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
          } cursor-pointer`}
          onClick={() => setMode("email")}
        >
          Use Email
        </button>
        <button
          className={`w-full py-2.5 rounded-md ${
            mode === "phone"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
          } cursor-pointer`}
          onClick={() => setMode("phone")}
        >
          Use Phone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 py-4">
        {mode === "email" ? (
          <Input
            type="text"
            name="email"
            placeholder="jhon-doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        ) : (
          <Input
            type="text"
            name="phoneNumber"
            placeholder="6203969000"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        )}
        <Input
          type="password"
          name="password"
          placeholder="******"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2.5 text-white rounded-md font-medium cursor-pointer text-[1.2rem]"
        >
          Login
        </button>
        <div>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </form>
      <p className="text-[0.98rem] text-gray-600 pt-2">
        Account doesn't exist{" "}
        <Link
          to="/auth/signup"
          className="text-blue-600 hover:text-blue-800 text-md font-medium"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

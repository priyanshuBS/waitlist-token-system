import { useState } from "react";
import Input from "../components/UI/Input";
import toast from "react-hot-toast";
import { signupApi } from "../api/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [mode, setMode] = useState("email");
  const [formData, setFormData] = useState({
    fullName: "",
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
        ? {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }
        : {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          };
    try {
      const { data } = await signupApi(payload);
      console.log(data.data.user);
      toast.success("Signup successfull!");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      console.log("Signup failed");
    }
  };
  return (
    <div className="p-6 shadow-2xl bg-white text-center rounded-2xl">
      <h3 className="text-4xl font-bold text-red-400 py-6">
        Create your account!
      </h3>
      {/* option */}
      <div className="flex items-center gap-4 mb-6 mt-4 w-full text-[1.1rem]">
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
        <Input
          type="text"
          name="fullName"
          placeholder="Jhon Doe"
          value={formData.fullName}
          onChange={handleChange}
        />
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
          className="w-full bg-blue-600 py-2.5 text-white rounded-md cursor-pointer text-[1.1rem] font-medium"
        >
          Signup
        </button>
      </form>
      <p className="text-[0.98rem] text-gray-600 pt-2">
        Account already exist{" "}
        <Link
          to="/auth/login"
          className="text-blue-600 hover:text-blue-800 text-md font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import { signup } from "../../api/auth";
import toast from "react-hot-toast";
import {
  emailSignupSchema,
  phoneSignupSchema,
} from "../../validation/authSchemas";
import { ZodError } from "zod";

const validateField = (
  field: string,
  value: string,
  mode: "email" | "phone"
): string => {
  try {
    const schema =
      mode === "email"
        ? emailSignupSchema.pick({ [field]: true })
        : phoneSignupSchema.pick({ [field]: true });

    schema.parse({ [field]: value });
    return "";
  } catch (err) {
    if (err instanceof ZodError) {
      return err.issues[0].message;
    }
    return "";
  }
};

const Signup: React.FC = () => {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const errorMsg = validateField(name, value, mode);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      if (mode === "email") {
        emailSignupSchema.parse(formData);
      } else {
        phoneSignupSchema.parse(formData);
      }

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

      setLoading(true);
      await signup(payload);
      toast.success("Signup successful!");

      setFormData({ fullName: "", email: "", phoneNumber: "", password: "" });
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Failed to signup!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-4xl text-gray-700 font-bold text-center">
        Create Account
      </h2>

      <div className="flex gap-4 text-[1rem]">
        <button
          type="button"
          onClick={() => setMode("email")}
          className={`px-4 py-4 rounded-2xl w-full ${
            mode === "email" ? "bg-blue-600 text-white" : "bg-gray-200"
          } cursor-pointer`}
          disabled={loading}
        >
          Use Email
        </button>
        <button
          type="button"
          onClick={() => setMode("phone")}
          className={`px-4 py-4 rounded-2xl w-full ${
            mode === "phone" ? "bg-blue-600 text-white" : "bg-gray-200"
          } cursor-pointer`}
          disabled={loading}
        >
          Use Phone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
          disabled={loading}
        />
        {mode === "email" ? (
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            disabled={loading}
          />
        ) : (
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            required
            disabled={loading}
          />
        )}

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 p-4 rounded-xl text-white text-[1.3rem] hover:bg-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p className="text-gray-700 text-center text-[1.2rem]">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;

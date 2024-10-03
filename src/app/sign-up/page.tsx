"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userSignup } from "@/app/utils/postUsers";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface SignUpFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}
const signUpSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const customStyles = {
  signUpButton: {
    backgroundColor: "#883418",
    "&:hover": {
      backgroundColor: "#6B3E11",
    },
  },
  brownText: {
    color: "#883418",
    "&:hover": {
      color: "#6B3E11",
    },
  },
};
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: SignUpFormData) => {
    const response = await userSignup(data);
    if (response.error) {
      setErrorMessage(response.error);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Account created successfully!");
      setErrorMessage("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8 ml-32">
      <Image
        src="/images/login-illustration.png"
        alt="Sign Up Illustration"
        width={500}
        height={300}
        className="w-2/5 h-auto object-cover"
      />
      <div className="w-full max-w-5xl flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 md:pl-20 mb-20">
          <h1 className="text-[40px] text-center font-bold text-[#883418] mb-8">
            Sign Up
          </h1>
          <p className="text-black text-center mt-4 text-[20px] mb-8">
            Welcome to DishHub
          </p>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                {...register("first_name")}
                className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {errors.first_name && (
                <p className="text-red-500 mt-2">{errors.first_name.message}</p>
              )}
            </div>
         
            <div className="mb-8">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                {...register("last_name")}
                className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {errors.last_name && (
                <p className="text-red-500 mt-2">{errors.last_name.message}</p>
              )}
            </div>
            {/* Username Field */}
            <div className="mb-8">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {errors.username && (
                <p className="text-red-500 mt-2">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {errors.email && (
                <p className="text-red-500 mt-2">{errors.email.message}</p>
              )}
            </div>
          
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full max-w-[600px] text-[#F8A11B] font-extrabold text-[25px] py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-opacity-50 mt-6 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={customStyles.signUpButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-[20px] text-black mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              style={customStyles.brownText}
              className="hover:underline text-[#883418] font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
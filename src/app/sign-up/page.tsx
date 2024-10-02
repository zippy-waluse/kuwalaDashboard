"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userSignup } from "@/app/utils/postUsers";
import { useRouter } from "next/navigation";

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

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setPasswordVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("SignUp submitted", data);
    setApiError(null);
    setSuccessMessage(null);

    const response = await userSignup(data);

    if (response.error) {
      setApiError(response.error);
      console.log("Registration failed:", response.error);
    } else {
      setSuccessMessage("Account created successfully!");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#F5F5F5] w-full h-screen flex flex-col md:flex-row">
        <div className="flex items-center justify-center p-8">
          <Image 
            src="/images/form.png" 
            alt="Sign Up Illustration" 
            width={900}  
            height={700}
            className="  "
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold text-[#883418] mb-6 text-center">Sign Up</h1>
            <p className="text-black text-center mb-6 text-2xl">Welcome to DishHub</p>

            {successMessage && (
              <p className="text-green-500 text-sm mt-2 mb-4">{successMessage}</p>
            )}
            {apiError && (
              <p className="text-red-500 text-sm mt-2 mb-4">{apiError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register("first_name")}
                  placeholder="First Name"
                  className="w-[149%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("last_name")}
                  placeholder="Last Name"
                  className="w-[149%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900 "
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Username"
                  className="w-[149%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1 ">{errors.username.message}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-[148%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="relative w-[165%]">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-[90%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-[150%] bg-[#883418] text-[#F8A11B] font-extrabold text-3xl py-5 mt-7 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] hover:bg-[#6B3E11] transition-colors"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-2xl text-black mt-8 ml-24">
              Already have an account? <a href="/login" className="text-[#883418] font-bold hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

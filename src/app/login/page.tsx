"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLogin } from "../utils/userLogin";
import router from "next/router";
import Link from "next/link";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setPasswordVisible] = useState(false);

  const onSubmit = async (loginData: {
    username: string;
    password: string;
  }) => {
    const { error } = await userLogin(loginData);
    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      setTimeout(() => router.push("/signup"), 2000);
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
            alt="Login Illustration"
            width={1000}
            height={700}
            className="" 
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold text-[#883418] mb-6 text-center">
              Login
            </h1>
            <p className="text-black text-center mb-6 text-2xl">
              Welcome back! To DishHub
            </p>

            {errorMessage && (
              <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mb-4 text-center">
                {successMessage}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Username"
                  className="w-[149%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900"
                />
                {errors.username && (
                  <p className="text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-[149%] h-16 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] placeholder-gray-400 text-gray-900 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
              
                </button>
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
              <Link href="/dashboard">

              <button
                type="submit"
                className={`w-[150%] bg-[#883418] text-[#F8A11B] font-extrabold text-3xl py-5 mt-7 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] hover:bg-[#6B3E11] transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              </Link>
            </form>

            <p className="text-center text-2xl text-black mt-8 ml-20">
              Do not have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#883418] font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

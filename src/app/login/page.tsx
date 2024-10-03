
"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLogin } from "../utils/userLogin";
import Link from "next/link";
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const customStyles = {
  loginButton: {
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
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8 ml-32">
      <Image
        src="/images/login-illustration.png"
        alt="Login Illustration"
        width={500}
        height={300}
        className="w-2/5 h-auto object-cover"
      />
      <div className="w-full max-w-5xl flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 md:pl-20 mb-20">
          <h1 className="text-[40px] text-center font-bold text-[#883418] mb-8">
            Login
          </h1>
          <p className="text-black text-center mt-4 text-[20px] mb-8">
            Welcome back! To DishHub
          </p>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-16">
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
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-black text-[16px]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full max-w-[600px] h-[50px] pl-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              {errors.password && (
                <p className="text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>
            <Link href="/dashboard">
              <button
                type="submit"
                className={`w-full max-w-[600px] text-[#F8A11B] font-extrabold text-[25px] py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-opacity-50 mt-6 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={customStyles.loginButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Link>
          </form>
          <p className="text-center text-[20px] text-black mt-8">
            Do not have an account?{" "}
            <Link
              href="/sign-up"
              style={customStyles.brownText}
              className="hover:underline text-[#883418] font-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
